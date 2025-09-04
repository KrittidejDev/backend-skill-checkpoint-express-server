import express from "express";
import * as answerController from "../controllers/answerController.mjs";
import * as validateAnswer from "../middlewares/validateAnswer.mjs";

const router = express.Router();

router.post(
  "/create",
  validateAnswer.validateAnswer,
  answerController.createAnswer
);
router.get("/:questionId", answerController.getAnswer);
router.delete("/delete/:answerId", answerController.deleteAnswer);
router.get("/:id/vote", answerController.getVoteAnswer);
router.post("/:id/vote", answerController.voteAnswer);

export default router;
