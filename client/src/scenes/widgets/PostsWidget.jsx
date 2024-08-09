import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    const response = await fetch("http://localhost:3001/posts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  const getUserPosts = async () => {
    const response = await fetch(`http://localhost:3001/posts/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, [isProfile, userId, dispatch, token]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {Array.isArray(posts) && posts.length > 0 ? (
        posts.map(
          (
            {
              _id,
              userId,
              firstName,
              lastName,
              description,
              location,
              picturePath,
              userPicturePath,
              likes,
              comments,
              createdAt,
            },
            index
          ) => (
            <PostWidget
              key={_id}
              postId={_id}
              postUserId={userId}
              name={`${firstName} ${lastName}`}
              description={description}
              location={location}
              picturePath={picturePath}
              userPicturePath={userPicturePath}
              likes={likes}
              comments={comments}
              isProfilePage={isProfile}
              isFirstPost={index === 0}
              createdAt={createdAt}
            />
          )
        )
      ) : (
        <p>No posts available</p>
      )}
    </>
  );
};

export default PostsWidget;
