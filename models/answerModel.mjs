import connectionPool from "../db/db.mjs";

// create answer
export const createAnswer = async (answer) => {
  const query = `INSERT INTO answers (question_id,content) VALUES ($1,$2)`;
  const values = [answer.question_id, answer.content];
  const result = await connectionPool.query(query, values);
  return result.rows[0];
};

// get all answer
export const getAnswer = async (questionId) => {
  const values = [questionId];
  const query = `SELECT * FROM answers WHERE question_id = $1`;
  const result = await connectionPool.query(query, values);
  return result.rows;
};

// delete answer
export const deleteAnswer = async (id) => {
  const query = `DELETE FROM answers WHERE id = $1 RETURNING *`;
  const values = [id];
  const result = await connectionPool.query(query, values);
  return result.rows[0];
};

// update votes on answer
export const voteAnswer = async (answerId, value) => {
  if (![1, -1].includes(value)) {
    throw new Error("Vote value must be 1 or -1");
  }
  await connectionPool.query(
    `INSERT INTO answer_votes (answer_id,vote)
       VALUES ($1, $2)`,
    [answerId, value]
  );
  // รวมคะแนนทั้งหมดของ answerId
  const totalQuery = `
    SELECT COALESCE(SUM(vote), 0) AS total_vote
    FROM answer_votes
    WHERE answer_id = $1
  `;
  const totalResult = await connectionPool.query(totalQuery, [answerId]);
  return { answerId, total_vote: totalResult.rows[0].total_vote };
};

// get sume votes
export const getVoteAnswer = async (answerId) => {
  const query = `
      SELECT COALESCE(SUM(vote), 0) AS total_vote
    FROM answer_votes
    WHERE answer_id = $1
  `;
  const result = await connectionPool.query(query, [answerId]);
  return { answerId, total_vote: result.rows[0].total_vote };
};
