import express from "express";
import * as urlsController from '../controllers/urls-controller.js'

const router = express.Router();


router.get("/", urlsController.getAllUrls);

router.post("/", urlsController.addUrl);



export default router;