import * as groupsController from '../controllers/groups-controller.js'
import express from "express";

const router = express.Router();

router.get("/", groupsController.getAllGroups);
router.post("/", groupsController.addGroup);
router.put("/:id", groupsController.renameGroup);
router.delete("/:id", groupsController.deleteGroup);

export default router;