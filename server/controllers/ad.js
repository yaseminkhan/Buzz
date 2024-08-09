import Ad from "../models/Ad.js";

export const getRandomAd = async (req, res)=> {
    try{
        const ads = await Ad.aggregate([{$sample: {size: 1}}]);
        if (ads.length > 0){
            res.status(200).json(ads[0]);
        } else {
            res.status(404).json({ message: "No ads found."});
        }
    }catch (err){
        res.status(500).json({error: err.message});
    }
};