import * as answerModel from "../models/answerModel.mjs";

// answer Create
export const createAnswer = async (req, res) => {
  try {
    const answer = await answerModel.createAnswer(req.body);
    return res.status(201).json(answer);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// answer Get all by question id
export const getAnswer = async (req, res) => {
  try {
    const answer = await answerModel.getAnswer(req.params.questionId);
    if (!answer) {
      return res.status(404).json({ message: "Question not found" });
    }
    return res.status(200).json(answer);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//  answer Delete
export const deleteAnswer = async (req, res) => {
  try {
    const answer = await answerModel.deleteAnswer(req.params.answerId);
    if (!answer) {
      return res.status(404).json({ message: "Answer not found" });
    }
    return res.status(200).json({ message: "Delete Answer complete" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// vote answer
export const voteAnswer = async (req, res) => {
  try {
    const { value } = req.body;
    const { id } = req.params;
    if (![1, -1].includes(value)) {
      return res.status(400).json({ message: "Vote value must be 1 or -1" });
    }
    const result = await answerModel.voteAnswer(id, value);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// // get vote answer
export const getVoteAnswer = async (req, res) => {
  try {
    const { id } = req.params;
    const vote = await answerModel.getVoteAnswer(id);
    return res.status(200).json(vote);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
