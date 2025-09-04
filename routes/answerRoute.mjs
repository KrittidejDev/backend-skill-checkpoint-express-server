import express from "express";
import * as answerController from "../controllers/answerController.mjs";
import * as validateAnswer from "../middlewares/validateAnswer.mjs";

const router = express.Router();

/**
 * @openapi
 * /api/answer/create:
 *   post:
 *     summary: สร้างคำตอบใหม่
 *     tags: [Answer]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               questionId:
 *                 type: integer
 *                 example: 1
 *               body:
 *                 type: string
 *                 example: "You can use Node.js with Express framework"
 *     responses:
 *       201:
 *         description: Answer created successfully
 */
router.post(
  "/create",
  validateAnswer.validateAnswer,
  answerController.createAnswer
);

/**
 * @openapi
 * /api/answer/{questionId}:
 *   get:
 *     summary: ดึงคำตอบทั้งหมดของคำถามหนึ่ง ๆ
 *     tags: [Answer]
 *     parameters:
 *       - name: questionId
 *         in: path
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/:questionId", answerController.getAnswer);

/**
 * @openapi
 * /api/answer/delete/{answerId}:
 *   delete:
 *     summary: ลบคำตอบ
 *     tags: [Answer]
 *     parameters:
 *       - name: answerId
 *         in: path
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Deleted successfully
 */
router.delete("/delete/:answerId", answerController.deleteAnswer);

/**
 * @openapi
 * /api/answer/{id}/vote:
 *   get:
 *     summary: ดูจำนวนโหวตของคำตอบ
 *     tags: [Answer]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Success
 *   post:
 *     summary: โหวตให้คำตอบ
 *     tags: [Answer]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       201:
 *         description: Vote added
 */
router.get("/:id/vote", answerController.getVoteAnswer);
router.post("/:id/vote", answerController.voteAnswer);

export default router;
