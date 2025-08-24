import express from "express";
import {redirectShortUrl} from "../controllers/short-url-controller.js";

const router = express.Router();

router.get("/:shortUrl", redirectShortUrl);

export default router;