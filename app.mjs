import express from "express";
import questionRoute from "./routes/questionRoute.mjs";
import answerRoute from "./routes/answerRoute.mjs";

const app = express();
const port = 4000;

app.use(express.json());

app.get("/test", (req, res) => {
  return res.json("Server API is working 🚀");
});

app.use("/api/question", questionRoute);
app.use("/api/answer", answerRoute);

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
