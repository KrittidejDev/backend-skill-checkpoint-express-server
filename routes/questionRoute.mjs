import express from "express";
import * as questionController from "../controllers/questionController.mjs";

const router = express.Router();

router.post("/create", questionController.createQuestion);
router.get("/", questionController.getQuestion);
router.get("/:id", questionController.getQuestionById);
router.put("/update/:id", questionController.updateQuestion);
router.delete("/delete/:id", questionController.deleteQuestion);
router.get("/:id/vote", questionController.getVoteQuestion);
router.post("/:id/vote", questionController.voteQuestion);

export default router;
