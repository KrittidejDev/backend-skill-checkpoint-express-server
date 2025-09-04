import express from "express";
import questionRoute from "./routes/questionRoute.mjs";
import answerRoute from "./routes/answerRoute.mjs";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

const swaggerDocument = YAML.load(join(__dirname, "swagger.yaml"));

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/question", questionRoute);
app.use("/api/answer", answerRoute);

// route / สำหรับ Vercel
app.get("/", (req, res) => {
  res.redirect("/api-docs"); // หรือส่งข้อความ simple
});

app.get("/test", (req, res) => res.json("Server API is working 🚀"));

// **สำคัญ:** อย่าใช้ app.listen() บน Serverless
export default app;
