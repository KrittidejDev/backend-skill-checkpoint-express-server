import express from "express";
import questionRoute from "./routes/questionRoute.mjs";
import answerRoute from "./routes/answerRoute.mjs";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

const app = express();
const port = 4000;

// โหลด swagger.yaml
const swaggerDocument = YAML.load("./swagger.yaml");

// ใช้ swagger.yaml เปิด Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());

app.get("/test", (req, res) => {
  return res.json("Server API is working 🚀");
});

app.use("/api/question", questionRoute);
app.use("/api/answer", answerRoute);

// app.listen(port, () => {
//   console.log(`Server is running at ${port}`);
// });
export default app;
