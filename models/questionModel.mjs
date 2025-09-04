import connectionPool from "../db/db.mjs";

// create question
export const createQuestion = async (question) => {
  const query = `INSERT INTO questions (title, description, category) VALUES ($1, $2, $3)`;
  const values = [question.title, question.description, question.category];
  const result = await connectionPool.query(query, values);
  return result.rows[0];
};

// get question
export const getQuestion = async (queryParam) => {
  const { title, category } = queryParam;
  let query = `SELECT * FROM questions WHERE 1=1`;
  let values = [];
  let index = 1;
  if (title) {
    query += ` AND title ILIKE $${index++}`;
    values.push(`%${title}%`);
  }
  if (category) {
    query += ` AND category ILIKE $${index++}`;
    values.push(`%${category}%`);
  }
  const result = await connectionPool.query(query, values);
  return result.rows;
};

// get question by id
export const getQuestionById = async (id) => {
  const query = `SELECT * FROM questions WHERE id = $1`;
  const value = [id];
  const result = await connectionPool.query(query, value);
  return result.rows[0];
};

// update question
export const updateQuestion = async (id, question) => {
  const query = `UPDATE questions SET title = $1, description = $2, category = $3 WHERE id = $4`;
  const value = [question.title, question.description, question.category, id];
  const result = await connectionPool.query(query, value);
  return result.rows[0];
};

// delete question
export const deleteQuestion = async (id) => {
  try {
    await connectionPool.query("BEGIN");

    // ลบ votes ของ answers
    await connectionPool.query(
      `DELETE FROM answer_votes
       WHERE answer_id IN (SELECT id FROM answers WHERE question_id = $1)`,
      [id]
    );

    // ลบ answers
    await connectionPool.query(`DELETE FROM answers WHERE question_id = $1`, [
      id,
    ]);

    // ลบ question vote
    await connectionPool.query(
      `DELETE FROM question_votes WHERE question_id = $1`,
      [id]
    );

    // ลบ question
    const result = await connectionPool.query(
      `DELETE FROM questions WHERE id = $1 RETURNING *`,
      [id]
    );

    await connectionPool.query("COMMIT");
    return result.rows[0];
  } catch (error) {
    await connectionPool.query("ROLLBACK");
    throw error;
  }
};

// update votes on question
export const voteQuestion = async (questionId, value) => {
  if (![1, -1].includes(value)) {
    throw new Error("Vote value must be 1 or -1");
  }
  await connectionPool.query(
    `INSERT INTO question_votes (question_id,vote)
       VALUES ($1, $2)`,
    [questionId, value]
  );
  // รวมคะแนนทั้งหมดของ questionId
  const totalQuery = `
    SELECT COALESCE(SUM(vote), 0) AS total_vote
    FROM question_votes
    WHERE question_id = $1
  `;
  const totalResult = await connectionPool.query(totalQuery, [questionId]);
  return { questionId, total_vote: totalResult.rows[0].total_vote };
};

// get sume votes
export const getVoteQuestion = async (questionId) => {
  const query = `
      SELECT COALESCE(SUM(vote), 0) AS total_vote
    FROM question_votes
    WHERE question_id = $1
  `;
  const result = await connectionPool.query(query, [questionId]);
  return { questionId, total_vote: result.rows[0].total_vote };
};
