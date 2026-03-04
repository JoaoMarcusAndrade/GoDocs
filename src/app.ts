import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { router } from "./routes/index.routes.js";

export const app = express();

export const __filename = fileURLToPath(import.meta.url);
export const _dirname = path.dirname(__filename);

app.use(express.json())
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use(express.static(path.join(_dirname, "views")));
app.use(router);

 