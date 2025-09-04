import express from "express";
import * as questionController from "../controllers/questionController.mjs";

const router = express.Router();

/**
 * @openapi
 * /api/question/create:
 *   post:
 *     summary: สร้างคำถามใหม่
 *     tags: [Question]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "What is Node.js?"
 *               body:
 *                 type: string
 *                 example: "Please explain Node.js in simple terms."
 *     responses:
 *       201:
 *         description: Question created successfully
 */
router.post("/create", questionController.createQuestion);

/**
 * @openapi
 * /api/question:
 *   get:
 *     summary: ดึงคำถามทั้งหมด
 *     tags: [Question]
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/", questionController.getQuestion);

/**
 * @openapi
 * /api/question/{id}:
 *   get:
 *     summary: ดึงคำถามตาม ID
 *     tags: [Question]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Question not found
 */
router.get("/:id", questionController.getQuestionById);

/**
 * @openapi
 * /api/question/update/{id}:
 *   put:
 *     summary: อัปเดตคำถาม
 *     tags: [Question]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               body:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated successfully
 */
router.put("/update/:id", questionController.updateQuestion);

/**
 * @openapi
 * /api/question/delete/{id}:
 *   delete:
 *     summary: ลบคำถาม
 *     tags: [Question]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Deleted successfully
 */
router.delete("/delete/:id", questionController.deleteQuestion);

/**
 * @openapi
 * /api/question/{id}/vote:
 *   get:
 *     summary: ดูจำนวนโหวตของคำถาม
 *     tags: [Question]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Success
 *   post:
 *     summary: โหวตให้คำถาม
 *     tags: [Question]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       201:
 *         description: Vote added
 */
router.get("/:id/vote", questionController.getVoteQuestion);
router.post("/:id/vote", questionController.voteQuestion);

export default router;
