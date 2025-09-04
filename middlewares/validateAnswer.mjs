export const validateAnswer = (req, res, next) => {
  const { question_id, content } = req.body;

  if (!content) {
    return res.status(400).json({ message: "Answer content is required" });
  } else if (!question_id) {
    return res.status(400).json({ message: "Question Id is required" });
  }

  if (content.length > 300) {
    return res
      .status(400)
      .json({ message: "Answer cannot exceed 300 characters" });
  }

  next();
};
