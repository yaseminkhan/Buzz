import {
    ManageAccountsOutlined,
    LocationOnOutlined,
    WorkOutlineOutlined
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SocialIcon } from 'react-social-icons';

const UserWidget = ({ userId, picturePath }) => {
    const [user, setUser] = useState(null);
    const { palette } = useTheme();
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;
    const { _id } = useSelector((state) => state.user);

    const getUser = async () => {
        const response = await fetch(`http://localhost:3001/users/${userId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();
        setUser(data);
    };

    useEffect(() => {
        getUser();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    if (!user) {
        return null;
    }

    const renderSocialMediaWidget = (platform, url) => {
        let network = "";

        switch (platform) {
            case "Facebook":
                network = "facebook";
                break;
            case "Instagram":
                network = "instagram";
                break;
            case "LinkedIn":
                network = "linkedin";
                break;
            case "Snapchat":
                network = "snapchat";
                break;
            case "TikTok":
                network = "tiktok";
                break;
            case "GitHub":
                network = "github";
                break;
            case "Pinterest":
                network = "pinterest";
                break;
            default:
                return null;
        }

        return (
            <FlexBetween gap="1rem" mb={(user.networkingURL && url === user.socialMediaURL) ? "0.6rem" : 0}>
                <FlexBetween gap="1rem" onClick={() => window.open(url, '_blank')}>
                    <SocialIcon network={network} style={{ width: '32px', height: '32px' }} />
                    <Box>
                        <Typography
                            fontSize="0.9rem"
                            color={main}
                            fontWeight="500"
                            sx={{
                                "&:hover": {
                                    color: medium,
                                    cursor: "pointer"
                                }
                            }}
                        >
                            {platform}
                        </Typography>
                    </Box>
                </FlexBetween>
            </FlexBetween>
        );
    };

    const {
        firstName,
        lastName,
        location,
        occupation,
        bio,
        socialMediaURL,
        socialMediaPlatform,
        networkingURL,
        networkingPlatform,
        friends
    } = user;

    return (
        <WidgetWrapper>
            {/* FIRST ROW */}
            <FlexBetween gap="0.5rem" pb="1.1rem">
                <FlexBetween gap="1rem" onClick={() => navigate(`/profile/${userId}`)}>
                    <UserImage image={picturePath} />
                    <Box>
                        <Typography
                            variant="h4"
                            color={dark}
                            fontWeight="500"
                            sx={{
                                "&:hover": {
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

            {/* SECOND ROW */}
            {(location || occupation) && (
                <>
                    <Divider />

                    <Box p="0.9rem 0">
                        {location && (
                            <Box display="flex" alignItems="center" gap="1rem" mb={occupation ? "0.5rem" : 0}>
                                <LocationOnOutlined fontSize="large" sx={{ color: main }} />
                                <Typography color={medium}>{location}</Typography>
                            </Box>
                        )}
                        {occupation && (
                            <Box display="flex" alignItems="center" gap="1rem">
                                <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
                                <Typography color={medium}>{occupation}</Typography>
                            </Box>
                        )}
                    </Box>
                </>
            )}

            {/* THIRD ROW */}
            {bio && (
                <>
                    <Divider />

                    <Box p="0.9rem 0" alignItems="center">
                        <Typography color={main}>{bio}</Typography>
                    </Box>
                </>
            )}

            {/* FOURTH ROW */}
            {((socialMediaURL && socialMediaPlatform) || (networkingURL && networkingPlatform)) && (
                <>
                    <Divider />

                    <Box mt="0.9rem" mb="0.5rem">
                        <Typography fontSize="1.05rem" color={main} fontWeight="500" mb="0.75rem">
                            Social Profiles
                        </Typography>

                        {socialMediaURL && renderSocialMediaWidget(socialMediaPlatform, socialMediaURL)}
                        {networkingURL && renderSocialMediaWidget(networkingPlatform, networkingURL)}
                    </Box>
                </>
            )}
        </WidgetWrapper>
    );
};

export default UserWidget;