import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import Navbar from "scenes/navbar";
import WidgetWrapper from "components/WidgetWrapper";

const AboutPage = () => {
    const theme = useTheme();
    return (
        <Box>
            <Navbar />
            <Box
                width="100%"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
            >
                <Box
                    width="100%"
                    padding="2rem 6%"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Typography
                        color={theme.palette.primary.main}
                        variant="h1"
                        fontWeight="600"
                        sx={{ mb: "0.5rem" }}
                    >
                        About Buzz
                    </Typography>
                </Box>
                <WidgetWrapper 
                    width="90%"
                >
                    <Typography
                        color={theme.palette.neutral.main}
                        variant="h4"
                        fontWeight="400"
                        sx={{ mb: "1.5rem" }}
                    >
                        Project Overview and Origin
                    </Typography>
                    <Typography
                        color={theme.palette.neutral.main}
                        variant="body1"
                        sx={{ mb: "1.5rem" }}
                    >
                        Buzz is a social media-inspired web application that I developed during my free time to sharpen my skills with the MERN stack. The project began as an educational exercise, where I followed a comprehensive YouTube tutorial to build a basic social media platform. This tutorial provided me with a solid foundation, covering essential functionalities such as user authentication, post creation, and a simple user interface.
                    </Typography>
                    <Typography
                        color={theme.palette.neutral.main}
                        variant="body1"
                        sx={{ mb: "1.5rem" }}
                    >
                        However, I wanted to not just replicate what I had learned, but to take the project further by making it uniquely my own. After completing the tutorial, I began adding custom features and refining the application. The process of expanding on the tutorial was both challenging and rewarding, allowing me to experiment with new ideas and incorporate advanced functionalities. These enhancements transformed the project from a simple clone into a robust platform with dynamic features and a polished user experience.
                    </Typography>

                    <Typography
                        color={theme.palette.neutral.main}
                        variant="h4"
                        fontWeight="400"
                        sx={{ mb: "1.5rem" }}
                    >
                        Enhancements and Custom Features
                    </Typography>
                    <Typography
                        color={theme.palette.neutral.main}
                        variant="body1"
                        sx={{ mb: "1rem" }} 
                    >
                        After the initial build, I focused on adding several key features to enhance the user experience and functionality of the application:
                    </Typography>
                    <Box component="ul" sx={{ pl: 2, mb: "1.5rem" }}>  
                        <li><Typography color={theme.palette.neutral.main} variant="body1">User Info Editing: Implemented a feature that allows users to easily edit their profile information, ensuring that their personal details can be updated in real-time.</Typography></li>
                        <li><Typography color={theme.palette.neutral.main} variant="body1">Random Selection of Ads: Developed an ad system that dynamically displays different ads to users, making the browsing experience more varied and engaging.</Typography></li>
                        <li><Typography color={theme.palette.neutral.main} variant="body1">Functional Links: Enhanced the interactivity of the application by enabling clickable links in the profile widget, posts, ads, and navbar, allowing for seamless navigation and user interaction.</Typography></li>
                        <li><Typography color={theme.palette.neutral.main} variant="body1">Enhanced User Interface: Refined the overall user interface by leveraging Material-UI components, resulting in a more intuitive and visually appealing design.</Typography></li>
                    </Box>

                    <Typography
                        color={theme.palette.neutral.main}
                        variant="h4"
                        fontWeight="400"
                        sx={{ mb: "1.5rem" }}
                    >
                        Technologies Used
                    </Typography>
                    <Typography
                        color={theme.palette.neutral.main}
                        variant="body1"
                        sx={{ mb: "1.5rem" }}
                    >
                        The Buzz project is built using the MERN stack, which consists of MongoDB for the database, Express.js for the backend, React.js for the frontend, and Node.js for the server. This technology stack was chosen for its flexibility, scalability, and efficiency in handling both frontend and backend development within a single project. Additionally, I utilized Material-UI to design the user interface, ensuring that the application has a modern and responsive design.
                    </Typography>
                    <Typography
                        color={theme.palette.neutral.main}
                        variant="h4"
                        fontWeight="400"
                        sx={{ mb: "1.5rem" }}
                    >
                        Future Plans
                    </Typography>
                    <Typography
                        color={theme.palette.neutral.main}
                        variant="body1"
                        sx={{ mb: "1rem" }}  
                    >
                        As I continue to develop Buzz, I have several additional features planned to enhance the application's functionality and user experience:
                    </Typography>
                    <Box component="ul" sx={{ pl: 2, mb: "1.5rem" }}>  
                        <li><Typography color={theme.palette.neutral.main} variant="body1">Commenting Functionality: I plan to implement a commenting system where users can leave comments on posts, allowing for more interaction and engagement. This feature will store comments in a structured format in the database and also allow users to delete their comments.</Typography></li>
                        <li><Typography color={theme.palette.neutral.main} variant="body1">Search Bar: I intend to add functionality to the search bar to enable users to easily find posts, users, or specific content within the platform. This will improve navigation and make the application more user-friendly.</Typography></li>
                        <li><Typography color={theme.palette.neutral.main} variant="body1">Google Login: I plan to integrate Google OAuth to allow users to log in using their Google accounts, providing a faster and more secure authentication method.</Typography></li>
                        <li><Typography color={theme.palette.neutral.main} variant="body1">Two-Factor Authentication: To enhance security, I also plan to implement two-factor authentication (2FA), adding an extra layer of protection for user accounts.</Typography></li>
                        <li><Typography color={theme.palette.neutral.main} variant="body1">Real-Time Notifications: Another planned feature is the integration of real-time notifications, allowing users to stay updated on interactions such as comments, likes, and new followers.</Typography></li>
                    </Box>
                    <Typography
                        color={theme.palette.neutral.main}
                        variant="body1"
                        sx={{ mb: "1.5rem" }}
                    >
                        This project has been an invaluable learning experience, allowing me to explore various aspects of full-stack development and apply my knowledge in a practical setting. I look forward to seeing how Buzz evolves over time.
                    </Typography>

                    <Typography
                        color={theme.palette.neutral.main}
                        variant="h4"
                        fontWeight="400"
                        sx={{ mb: "1.5rem" }}
                    >
                        Conclusion
                    </Typography>
                    <Typography
                        color={theme.palette.neutral.main}
                        variant="body1"
                        sx={{ mb: "1.5rem" }}
                    >
                        I invite you to explore Buzz and see the features it offers. The source code is available on my GitHub, and I'm always open to feedback, suggestions, or collaboration opportunities. Thank you for taking the time to learn about this project!
                    </Typography>
                </WidgetWrapper>
            </Box>
        </Box>
    );
};

export default AboutPage;
