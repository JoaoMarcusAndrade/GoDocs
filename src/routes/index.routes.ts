import { Router } from 'express';
import { _dirname, __filename } from '../app.js';
import path from 'path';

export const router = Router();


router.get("/", (req, res) => {
  res.sendFile(path.join(_dirname, "view", "index.html"));
});