import * as questionModel from "../models/questionModel.mjs";

// create /question
export const createQuestion = async (req, res) => {
  try {
    const question = await questionModel.createQuestion(req.body);
    return res.status(201).json(question);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// get /question
export const getQuestion = async (req, res) => {
  try {
    const question = await questionModel.getQuestion(req.query);
    return res.status(200).json(question);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// get /question/:id
export const getQuestionById = async (req, res) => {
  try {
    const question = await questionModel.getQuestionById(req.params.id);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    return res.status(200).json(question);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// update /question
export const updateQuestion = async (req, res) => {
  try {
    const question = await questionModel.updateQuestion(
      req.params.id,
      req.body
    );
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    return res.status(200).json(question);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// delete /question
export const deleteQuestion = async (req, res) => {
  try {
    const question = await questionModel.deleteQuestion(req.params.id);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    return res.status(200).json(question);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// vote question
export const voteQuestion = async (req, res) => {
  try {
    const { value } = req.body;
    const { id } = req.params;
    if (![1, -1].includes(value)) {
      return res.status(400).json({ message: "Vote value must be 1 or -1" });
    }
    const result = await questionModel.voteQuestion(id, value);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// // get vote question
export const getVoteQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const vote = await questionModel.getVoteQuestion(id);
    return res.status(200).json(vote);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
