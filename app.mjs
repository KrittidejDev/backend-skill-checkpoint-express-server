import express from "express";
import questionRoute from "./routes/questionRoute.mjs";
import answerRoute from "./routes/answerRoute.mjs";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// สำหรับ ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// โหลด swagger.yaml แบบ absolute path
const swaggerDocument = YAML.load(join(__dirname, "swagger.yaml"));

// Middleware
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use("/api/question", questionRoute);
app.use("/api/answer", answerRoute);

app.get("/test", (req, res) => res.json("Server API is working 🚀"));

// **สำคัญ: ลบ app.listen() บน Serverless**
export default app;
