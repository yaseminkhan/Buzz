import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "scenes/loginPage/Form";
import { useParams } from "react-router-dom";

const EditPage = () => {
    const theme = useTheme();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const { id: userId } = useParams(); 

    return (
        <Box>
            <Box 
                width="100%" 
                backgroundColor={theme.palette.background.alt} 
                p="1rem 6%" 
                textAlign="center"
            >
                <Typography
                    fontWeight="bold"
                    fontSize="32px"
                    color="primary"
                >
                    Buzz
                </Typography>
            </Box>

            <Box 
                width={isNonMobileScreens ? "50%" : "93%"}
                p="2rem"
                m="2rem auto"
                borderRadius="1.5rem"
                backgroundColor={theme.palette.background.alt}
            >
                <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
                    Edit Profile
                </Typography>
                <Form pageType="edit" userId={userId} />
            </Box>
        </Box>
    );
};

export default EditPage;
