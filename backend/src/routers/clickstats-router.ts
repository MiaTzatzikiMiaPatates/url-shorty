import express from "express";
import * as clickStatsController from "../controllers/clickstats-controller.js";

const router = express.Router();

router.get("/", clickStatsController.getClickStats);
router.put("/:id", clickStatsController.incrementClickStats)

export default router;