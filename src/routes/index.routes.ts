import { Router } from 'express';
import { _dirname, __filename } from '../app.js';
import path from 'path';
import { emailController } from '../controllers/email.controller.js';
import { FA2verifyController } from '../controllers/2FA.controller.js'

export const router = Router();


router.get("/", (req, res) => {
  res.sendFile(path.join(_dirname, "view", "index.html"));
});

router.post("/mail-auth", (req, res) => {
  emailController(req, res)
  console.log("/mail-auth request")
})

router.post("/2FA-Verify", (req, res) => {
  FA2verifyController(req, res)
  console.log("/2FA-Verify")
})