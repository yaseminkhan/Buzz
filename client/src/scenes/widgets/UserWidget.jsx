import {
    ManageAccountsOutlined,
    LocationOnOutlined,
    WorkOutlineOutlined
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import {useSelector} from "react-redux";
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";


const UserWidget = ({userId, picturePath}) =>{
    const [user, setUser] = useState(null);
    const { palette } = useTheme();
    const navigate = useNavigate();
    const token = useSelector((state)=> state.token);
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;
    const { _id } = useSelector((state) => state.user);

    const getUser = async () => {
        const response = await fetch(`http://localhost:3001/users/${userId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}`}
        });
        const data = await response.json();
        setUser(data);
    };

    useEffect(()=>{
        getUser();
    }, []) //eslint-disable-line react-hooks/exhaustive-deps

    if(!user){
        return null;
    }

    const {
        firstName,
        lastName,
        location,
        occupation,
        bio,
        socialMediaURL,
        networkingURL,
        friends
    } = user;


    return (
        <WidgetWrapper>
            {/* FIRST ROW  */}
            <FlexBetween
                gap="0.5rem"
                pb="1.1rem"
            >
                <FlexBetween gap="1rem" onClick={() => navigate(`/profile/${userId}`)}>
                    <UserImage image={picturePath} />
                    <Box>
                        <Typography
                            variant = "h4"
                            color = {dark}
                            fontWeight="500"
                            sx={{
                                "&:hover" : {
                                    color: medium,
                                    cursor: "pointer"
                                }
                            }}
                        >
                            {firstName} {lastName}
                        </Typography>
                        <Typography color={medium}>{friends.length} friends</Typography>
                    </Box>
                </FlexBetween>
               {userId === _id && (
                <ManageAccountsOutlined 
                        sx={{
                            "&:hover": {
                                cursor: "pointer",
                                color: medium
                            }
                        }}
                        onClick={() => navigate(`/edit-profile/${userId}`)}
                    />
                )}
            </FlexBetween>
            
                <Divider />

                {/* SECOND ROW */}
                <Box p="1rem 0">
                    <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
                        <LocationOnOutlined fontSize="large" sx={{ color : main}} />
                        <Typography color={medium}>{location}</Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap="1rem">
                        <WorkOutlineOutlined fontSize="large" sx={{ color : main}} />
                        <Typography color={medium}>{occupation}</Typography>
                    </Box>
                </Box>


                {/* THIRD ROW */}
                {bio &&(
                    <>
                        <Divider />
                        
                        <Box p="1rem 0" alignItems="center">
                            <Typography color={main}>{bio}</Typography>
                        </Box>

                    </>
                )}

                {/* FOURTH ROW */}
                {(socialMediaURL || networkingURL) && (
                    <>
                        <Divider />

                        <Box p="1rem 0">
                            <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
                                Social Profiles
                            </Typography>
                            
                            <FlexBetween gap="1rem" mb="0.5rem">
                                <FlexBetween gap="1rem" onClick={() => window.open(socialMediaURL, '_blank')}>
                                    <img src="../assets/insta.png" alt="instagram" style={{ width: '30px', height: '30px' }}/>
                                    <Box>
                                        <Typography 
                                        color={main} 
                                        fontWeight="500"
                                        sx={{
                                            "&:hover" : {
                                                color: medium,
                                                cursor: "pointer"
                                            }
                                        }}
                                        >
                                        Instagram 
                                        </Typography>
                                        <Typography color={medium}>Social Media</Typography>
                                    </Box>
                                </FlexBetween>
                            </FlexBetween>


                            <FlexBetween gap="1rem">
                                <FlexBetween gap="1rem" onClick={() => window.open(networkingURL, '_blank')}>
                                    <img src="../assets/linkedIn-color.png" alt="linkedin" style={{ width: '30px', height: '30px' }}/>
                                    <Box>
                                        <Typography color={main} 
                                        fontWeight="500"
                                        sx={{
                                            "&:hover" : {
                                                color: medium,
                                                cursor: "pointer"
                                            }
                                        }}
                                        >
                                        LinkedIn  
                                        </Typography>
                                        <Typography color={medium}>Networking Platform</Typography>
                                    </Box>
                                </FlexBetween>
                            </FlexBetween>
                        </Box>
                    </>
                )}
        </WidgetWrapper>
    );
};


export default UserWidget;