import { format } from 'date-fns';
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
  DeleteOutline
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme, Snackbar } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost, removePost } from "state";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  createdAt,
  likes = {},
  comments = [],
  isProfilePage = false,
  isFirstPost = false,
}) => {
  const [isComments, setIsComments] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State for snackbar
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;
  const { _id } = useSelector((state) => state.user);

  const { palette } = useTheme();
  const main = palette.neutral.main;

  const patchLike = async () => {
    const response = await fetch(
      `http://localhost:3001/posts/${postId}/like`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      }
    );
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  const deletePost = async () => {
    try {
      const response = await fetch(`http://localhost:3001/posts/${postId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        dispatch(removePost({ postId }));
      } else {
        const errorData = await response.json();
        console.error("Failed to delete post", errorData.message);
      }
    } catch (err) {
      console.error("Failed to delete post", err);
    }
  };

  const copyLinkToClipboard = () => {
    const link = `http://localhost:3000/profile/${postUserId}`;
    navigator.clipboard.writeText(link).then(() => {
      setSnackbarOpen(true);
    }).catch(err => {
      console.error('Failed to copy the link: ', err);
    });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const formattedDate = createdAt ? format(new Date(createdAt), 'PP p') : 'Date not available';

  return (
    <WidgetWrapper m={isProfilePage && isFirstPost ? "0" : "1.5rem 0"}>
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={`${location} • ${formattedDate}`}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:3001/assets/${picturePath}`}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: "red" }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <FlexBetween gap="0.3rem">
          <IconButton onClick={copyLinkToClipboard}>
            <ShareOutlined />
          </IconButton>
          {_id === postUserId && (
            <IconButton onClick={deletePost}>
              <DeleteOutline />
            </IconButton>
          )}
        </FlexBetween>
      </FlexBetween>
      {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message="Link copied to clipboard"
      />
    </WidgetWrapper>
  );
};

export default PostWidget;
