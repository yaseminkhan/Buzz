import mongoose from "mongoose";

const adSchema = mongoose.Schema(
    {
        adId: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        URL: String,
        URL_name: String,
        description: {
            type: String,
            required: true,
        },
        picturePath:{
            type: String,
            required: true,
        },
    },
    {timestamps: true}
);

const Ad = mongoose.model("Ad", adSchema);

export default Ad;