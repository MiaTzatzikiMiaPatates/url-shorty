import express from "express";
import * as urlsController from '../controllers/urls-controller.js'

const router = express.Router();

router.get("/", urlsController.getAllUrls);
router.post("/", urlsController.addUrl);
router.put("/:id", urlsController.updateUrl);
router.delete("/:id", urlsController.deleteUrl);
router.get("/groups-count", urlsController.getCountUrlsPerGroup);

export default router;