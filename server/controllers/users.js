import User from "../models/User.js";
import Post from "../models/Post.js"; 

/* READ*/
export const getUser = async (req, res) =>{
    try{
        const {id} = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch(err){
        res.status(404).json({message: error.message});
    };
};

export const getUserFriends = async (req, res) => {
    try{
        const {id} = req.params;
        const user = await User.findById(id);

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );
        const formattedFriends = friends.map(
            ({_id, firstName, lastName, occupation, location, picturePath}) => {
                return {_id, firstName, lastName, occupation, location, picturePath};
            }
        );
        res.status(200).json(formattedFriends);
    } catch (err){
        res.status(404).json({message: err.message});
    };
};

/* UPDATE */
export const addRemoveFriend = async(req, res) => {
    try{
        const{id, friendId} = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        if(user.friends.includes(friendId)){
            user.friends = user.friends.filter((id)=> id !== friendId);
            friend.friends = friend.friends.filter((id)=> id !== id);
        } else {
            user.friends.push(friendId);
            friend.friends.push(id);
        }
        await user.save();
        await friend.save();

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );
        const formattedFriends = friends.map(
            ({_id, firstName, lastName, occupation, location, picturePath}) => {
                return {_id, firstName, lastName, occupation, location, picturePath};
            }
        );

        res.status(200).json(formattedFriends);
    } catch (err){
        res.status(404).json({message: err.message});
    };
};

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, location, occupation, bio, socialMediaURL, socialMediaPlatform, networkingURL, networkingPlatform } = req.body;
        const picturePath = req.file ? req.file.filename : '';

        if (req.user.id !== id) {
            return res.status(403).json({ message: "You do not have permission to update this user" });
        }

        const user = await User.findById(id);

        if (!user) return res.status(404).json({ message: "User not found" });

        // Update user info
        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        user.location = location;
        user.occupation = occupation;
        user.picturePath = picturePath || 'profile.jpeg'; 
        user.bio = bio;
        user.socialMediaURL = socialMediaURL;
        user.socialMediaPlatform = socialMediaPlatform;
        user.networkingURL = networkingURL;
        user.networkingPlatform = networkingPlatform;

        await user.save();

        const updateFields = {
            ...(picturePath && { userPicturePath: picturePath }),
            ...(firstName && { firstName }),
            ...(lastName && { lastName }),
        };

        if (Object.keys(updateFields).length > 0) {
            await Post.updateMany(
                { userId: id },
                { $set: updateFields }
            );
        };

        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};
