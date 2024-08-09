import express from "express";
import { getRandomAd } from "../controllers/ad.js";

const router = express.Router();

/* READ */
router.get("/random", getRandomAd);

export default router;