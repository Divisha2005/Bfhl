
import express from "express";
import dotenv from "dotenv";
import healthRouter from "./routes/health.routes.js";
import bfhlRouter from "./routes/bfhl.routes.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use("/", healthRouter);
app.use("/", bfhlRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
