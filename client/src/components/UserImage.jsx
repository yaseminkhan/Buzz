import { Box } from "@mui/material";

const UserImage = ({ image, size = "60px" }) => {
    const imageUrl = image && image.trim() !== "" ? `http://localhost:3001/assets/${image}` : `http://localhost:3001/assets/profile.jpeg`;

    return (
        <Box width={size} height={size}>
            <img
                style={{ objectFit: "cover", borderRadius: "50%" }}
                width={size}
                height={size}
                alt="user"
                src={imageUrl}
                onError={(e) => { e.target.src = `${process.env.PUBLIC_URL}/profile.jpeg`; }} // Fallback if image fails to load
            />
        </Box>
    );
};

export default UserImage;
