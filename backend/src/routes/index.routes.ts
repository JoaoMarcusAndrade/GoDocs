import { Router } from 'express';
import { _dirname, __filename } from '../app.js';
import path from 'path';
import { emailController } from '../controllers/email.controller.js';
import { FA2verifyController } from '../controllers/2FA.controller.js';
import { signInController } from '../controllers/signIn.controller.js'

export const router = Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Envia arquivo html base
 *     responses:
 *       200:
 *         description: index.html 
 */
router.get("/", (req, res) => {
  res.sendFile(path.join(_dirname, "view", "index.html"));
});

/**
 * @swagger
 * /auth/2FA:
 *   post:
 *     summary: Confere codigo enviado
 *     responses:
 *       200:
 *         description: OK
 *         content: # Response body
 *            application/json: # Media type
 *              schema: # Must-have
 *                type: object # Data type
 *                proprieties:
 *                  email:
 *                    type: string
 *                  FA2code:
 *                    type: integer
 *                example:
 *                  email: example@mail.com
 *                  FA2code: 104985
 */
router.post("/auth/2FA", (req, res) => {
  FA2verifyController(req, res)
  console.log("/auth/2FA")
})

router.post("/sign-in", (req, res) => {
  signInController(req, res)
})