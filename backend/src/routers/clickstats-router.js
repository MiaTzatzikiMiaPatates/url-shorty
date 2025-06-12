import express from "express";
import * as clickstatsController from "../controllers/clickstats-controller.js";

const router = express.Router();


router.get("/", clickstatsController.getClickStats);

router.put("/", clickstatsController.incrementClickStats())

export default router;