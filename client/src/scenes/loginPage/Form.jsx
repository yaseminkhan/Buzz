import { useState, useEffect } from "react";
import { Box, Button, TextField, useMediaQuery, Typography, useTheme, FormControl, Select, MenuItem, InputLabel } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";

const registerSchema = yup.object().shape({
    firstName: yup.string().required("required").min(2, "First Name must be at least 2 characters").max(50, "First Name must be less than  50 characters"),
    lastName: yup.string().required("required").min(2, "Last Name must be at least 2 characters").max(50, "Last Name must be less than  50 characters"),
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
    location: yup.string().max(100, "Location must be less than  100 characters"),
    occupation: yup.string().max(100, "Occupation must be less than 100 characters"),
    picture: yup.string(),
});

const loginSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
});

const editSchema = yup.object().shape({
    firstName: yup.string().required("required").min(2, "First Name must be at least 2 characters").max(50, "First Name must be less than  50 characters"),
    lastName: yup.string().required("required").min(2, "Last Name must be at least 2 characters").max(50, "Last Name must be less than  50 characters"),
    location: yup.string().max(100, "Location must be less than  100 characters"),
    occupation: yup.string().max(100, "Occupation must be less than 100 characters"),
    picture: yup.string(),
    bio: yup.string().max(100, "Bio must be less than 100 characters"),
    socialMediaURL: yup.string(),
    socialMediaPlatform: yup.string(),
    networkingURL: yup.string(),
    networkingPlatform: yup.string()
});

const initialValuesRegister = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    occupation: "",
    picture: ""
};

const initialValuesLogin = {
    email: "",
    password: ""
};

const initialValuesEdit = {
    firstName: '',
    lastName: '',
    location: '',
    occupation: '',
    picture: '',
    bio: '',
    socialMediaURL: '',
    socialMediaPlatform: '',
    networkingURL: '',
    networkingPlatform: ''
};

const Form = ({ userId, pageType: initialPageType }) => {
    const [pageType, setPageType] = useState(initialPageType);
    const [initialValuesEditState, setInitialValuesEditState] = useState(initialValuesEdit);
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width: 600px)");
    const isLogin = pageType === "login";
    const isRegister = pageType === "register";
    const isEdit = pageType === "edit";
    const token = useSelector((state) => state.token);
    const user = useSelector((state) => state.user);

    useEffect(() => {
        if (isLogin) {
            document.title = 'Buzz - Login';
        } else if (isRegister) {
            document.title = 'Buzz - Register';
        } else if (isEdit) {
            document.title = 'Buzz - Edit';
        }

        // Set the favicon
        const link = document.createElement('link');
        link.rel = 'icon';
        link.href = `/favicon.png`; 
        document.head.appendChild(link);

    }, [isLogin, isRegister, isEdit]);

    useEffect(() => {
        const fetchUserData = async () => {
            if (isEdit) {
                const response = await fetch(`http://localhost:3001/users/${userId}`, {
                    method: 'GET',
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = await response.json();
                setInitialValuesEditState({
                    firstName: data.firstName || '',
                    lastName: data.lastName || '',
                    location: data.location || '',
                    occupation: data.occupation || '',
                    picture: data.picturePath || '',
                    bio: data.bio || '',
                    socialMediaURL: data.socialMediaURL || '',
                    socialMediaPlatform: data.socialMediaPlatform || '',
                    networkingURL: data.networkingURL || '',
                    networkingPlatform: data.networkingPlatform || ''
                });
            }
        };
  
        fetchUserData();
    }, [isEdit, userId, token]);

    const register = async (values, onSubmitProps) => {
        const formData = new FormData();
        for (let value in values) {
            formData.append(value, values[value]);
        }
        if (values.picture) {
            formData.append("picturePath", values.picture.name);
        } else {
            formData.append("picturePath", "profile.jpeg");
        }

        const savedUserResponse = await fetch(
            "http://localhost:3001/auth/register",
            {
                method: "POST",
                body: formData,
            }
        );
        const savedUser = await savedUserResponse.json();
        onSubmitProps.resetForm();

        if (savedUser) {
            setPageType("login");
        }
    };

    const login = async (values, onSubmitProps) => {
        const loggedInResponse = await fetch("http://localhost:3001/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
        });
        const loggedIn = await loggedInResponse.json();
        onSubmitProps.resetForm();
        if (loggedIn) {
            dispatch(
                setLogin({
                    user: loggedIn.user,
                    token: loggedIn.token
                })
            );
            navigate("/home");
        }
    }

    const editProfile = async (values, onSubmitProps) => {
        const formData = new FormData();
        for (let value in values) {
            if (values[value] !== undefined) {
                formData.append(value, values[value] === "" ? "" : values[value]);
            }
        }
        if (values.picture instanceof File) {
            formData.append('picturePath', values.picture.name);
        } else {
            formData.append('picturePath', values.picture);
        }

        try {
            const response = await fetch(`http://localhost:3001/users/${userId}`, {
                method: 'PUT',
                headers: { Authorization: `Bearer ${token}` },
                body: formData
            });

            if (!response.ok) {
                const error = await response.json();
                console.error('Error:', error);
                return;
            }

            const updatedUser = await response.json();
            onSubmitProps.resetForm();

            if (updatedUser) {
                //Update the Redux state with the new user data
                dispatch(setLogin({
                    user: updatedUser,
                    token
                }));
                navigate(`/profile/${userId}`);
            }
        } catch (err) {
            console.error('Error:', err);
        }
    };

    const handleFormSubmit = async (values, onSubmitProps) => {
        if (isLogin) await login(values, onSubmitProps);
        if (isRegister) await register(values, onSubmitProps);
        if (isEdit) await editProfile(values, onSubmitProps);
    };

    if (isEdit && user._id !== userId) {
        return <div>You must be logged in to update your profile.</div>;
    }

    return (
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={isLogin ? initialValuesLogin : isRegister ? initialValuesRegister : initialValuesEditState}
            validationSchema={isLogin ? loginSchema : isRegister ? registerSchema : editSchema}
            enableReinitialize
        >
            {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                resetForm
            }) => (
                <form onSubmit={handleSubmit}>
                    <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        sx={{
                            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                        }}
                    >
                        {(isRegister || isEdit) && (
                            <>
                                <TextField
                                    label="First Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.firstName}
                                    name="firstName"
                                    error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                                    helperText={touched.firstName && errors.firstName}
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                    label="Last Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.lastName}
                                    name="lastName"
                                    error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                                    helperText={touched.lastName && errors.lastName}
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                    label="Location"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.location}
                                    name="location"
                                    error={Boolean(touched.location) && Boolean(errors.location)}
                                    helperText={touched.location && errors.location}
                                    sx={{ gridColumn: "span 4" }}
                                />
                                <TextField
                                    label="Occupation"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.occupation}
                                    name="occupation"
                                    error={Boolean(touched.occupation) && Boolean(errors.occupation)}
                                    helperText={touched.occupation && errors.occupation}
                                    sx={{ gridColumn: "span 4" }}
                                />
                                <Box
                                    gridColumn="span 4"
                                    border={`1px solid ${palette.neutral.medium}`}
                                    borderRadius="5px"
                                    p="1rem"
                                >
                                    <Dropzone
                                        acceptedFiles=".jpg, .jpeg, .png"
                                        multiple={false}
                                        onDrop={(acceptedFiles) => setFieldValue("picture", acceptedFiles[0])}
                                    >
                                        {({ getRootProps, getInputProps }) => (
                                            <Box
                                                {...getRootProps()}
                                                border={`2px dashed ${palette.primary.main}`}
                                                p="1rem"
                                                sx={{ '&:hover': { cursor: 'pointer' } }}
                                            >
                                                <input {...getInputProps()} />
                                                {!values.picture ? (
                                                    <p>Add Profile Picture Here</p>
                                                ) : (
                                                    <FlexBetween>
                                                        <Typography>
                                                            {values.picture.name ? values.picture.name : values.picture}
                                                        </Typography>
                                                        <EditOutlinedIcon />
                                                    </FlexBetween>
                                                )}
                                            </Box>
                                        )}
                                    </Dropzone>
                                </Box>
                            </>
                        )}

                        {isEdit && (
                            <>
                                <TextField
                                    label="Bio"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.bio}
                                    name="bio"
                                    error={Boolean(touched.bio) && Boolean(errors.bio)}
                                    helperText={touched.bio && errors.bio}
                                    sx={{ gridColumn: 'span 4' }}
                                />
                                <Box sx={{ display: 'flex', alignItems: 'center', gridColumn: 'span 4', gap: '1rem' }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="social-media-select-label" shrink>Social Media</InputLabel>
                                        <Select
                                            labelId="social-media-select-label"
                                            id="social-media-select"
                                            name="socialMediaPlatform"
                                            value={values.socialMediaPlatform}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            displayEmpty
                                            label="Social Media"
                                        >
                                            <MenuItem value="">Select Social Media Platform</MenuItem>
                                            <MenuItem value="Facebook">Facebook</MenuItem>
                                            <MenuItem value="Instagram">Instagram</MenuItem>
                                            <MenuItem value="LinkedIn">LinkedIn</MenuItem>
                                            <MenuItem value="Snapchat">Snapchat</MenuItem>
                                            <MenuItem value="TikTok">TikTok</MenuItem>
                                            <MenuItem value="GitHub">GitHub</MenuItem>
                                            <MenuItem value="Pinterest">Pinterest</MenuItem>
                                        </Select>
                                        {touched.socialMediaPlatform && errors.socialMediaPlatform && (
                                            <Typography color="error">{errors.socialMediaPlatform}</Typography>
                                        )}
                                    </FormControl>
                                    <TextField
                                        label="Social Media URL"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.socialMediaURL}
                                        name="socialMediaURL"
                                        error={Boolean(touched.socialMediaURL) && Boolean(errors.socialMediaURL)}
                                        helperText={touched.socialMediaURL && errors.socialMediaURL}
                                        fullWidth
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gridColumn: 'span 4', gap: '1rem' }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="networking-select-label" shrink>Networking</InputLabel>
                                        <Select
                                            labelId="networking-select-label"
                                            id="networking-select"
                                            name="networkingPlatform"
                                            value={values.networkingPlatform}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            displayEmpty
                                            label="Networking"
                                        >
                                            <MenuItem value="">Select Networking Platform</MenuItem>
                                            <MenuItem value="Facebook">Facebook</MenuItem>
                                            <MenuItem value="Instagram">Instagram</MenuItem>
                                            <MenuItem value="LinkedIn">LinkedIn</MenuItem>
                                            <MenuItem value="Snapchat">Snapchat</MenuItem>
                                            <MenuItem value="TikTok">TikTok</MenuItem>
                                            <MenuItem value="GitHub">GitHub</MenuItem>
                                            <MenuItem value="Pinterest">Pinterest</MenuItem>
                                        </Select>
                                        {touched.networkingPlatform && errors.networkingPlatform && (
                                            <Typography color="error">{errors.networkingPlatform}</Typography>
                                        )}
                                    </FormControl>
                                    <TextField
                                        label="Networking URL"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.networkingURL}
                                        name="networkingURL"
                                        error={Boolean(touched.networkingURL) && Boolean(errors.networkingURL)}
                                        helperText={touched.networkingURL && errors.networkingURL}
                                        fullWidth
                                    />
                                </Box>
                            </>
                        )}

                        {(isLogin || isRegister) && (
                            <>
                                <TextField
                                    label="Email"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.email}
                                    name="email"
                                    error={Boolean(touched.email) && Boolean(errors.email)}
                                    helperText={touched.email && errors.email}
                                    sx={{ gridColumn: 'span 4' }}
                                />
                                <TextField
                                    label="Password"
                                    type="password"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.password}
                                    name="password"
                                    error={Boolean(touched.password) && Boolean(errors.password)}
                                    helperText={touched.password && errors.password}
                                    sx={{ gridColumn: 'span 4' }}
                                />
                            </>
                        )}
                    </Box>

                    {/* BUTTONS */}
                    <Box>
                        <Button
                            fullWidth
                            type="submit"
                            sx={{
                                m: "2rem 0",
                                p: "1rem",
                                backgroundColor: palette.primary.main,
                                color: palette.background.alt,
                                "&:hover": { color: palette.primary.main }
                            }}
                        >
                            {isLogin ? 'LOGIN' : isRegister ? 'REGISTER' : 'UPDATE'}
                        </Button>
                        <Typography
                            onClick={() => {
                                if (isLogin) {
                                    setPageType('register');
                                } else if (isRegister) {
                                    setPageType('login');
                                } else if (isEdit){
                                    navigate(`/profile/${userId}`);
                                } else {
                                    resetForm();
                                }
                            }}
                            sx={{
                                textDecoration: "underline",
                                color: palette.primary.main,
                                "&:hover": {
                                    cursor: "pointer",
                                    color: palette.primary.light
                                }
                            }}
                        >
                            {isLogin 
                                ? "Don't have an account? Sign Up" 
                                : isRegister 
                                ? "Have an account? Login" 
                                : "Back"}
                        </Typography>
                    </Box>
                </form>
            )}
        </Formik>
    );
};

export default Form;
