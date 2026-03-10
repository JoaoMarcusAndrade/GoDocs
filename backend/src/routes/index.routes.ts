import { Router } from 'express';
import { _dirname, __filename } from '../app.js';
import path from 'path';
import { FA2verifyController } from '../controllers/2FA.controller.js';
import { signInController } from '../controllers/signIn.controller.js'
import { fullUsrController } from '../controllers/fullUsr.controller.js';
import { loginController } from '../controllers/login.controller.js';

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

/**
 * @swagger
 * /auth/sign-in:
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
 *                  pass:
 *                    type: string
 *                  phone: 
 *                    type: integer
 *                example:
 *                  email: example@mail.com
 *                  pass: 14sF5%and
 *                  phone: 11991234567
 */
router.post("/auth/sign-in", (req, res) => {
  signInController(req, res)
})

/**
 * @swagger
 * /auth/endUsr:
 *   post:
 *     summary: Completa cadastro com os dados adicionais
 *     responses:
 *       201:
 *         description: OK - usuário adicionado no banco de dados
 *         content: # Response body
 *            application/json: # Media type
 *              schema: # Must-have
 *                type: object # Data type
 *                proprieties:
 *                  email:
 *                    type: string
 *                  CPF:
 *                    type: integer
 *                  name:
 *                    type: string
 *                  img:
 *                    type: string
 *                example:
 *                  email: example@mail.com
 *                  CPF: 12345678900
 *                  name: joão vinicius
 *                  img: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA\AAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHx\gljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==
 */
router.post("/auth/endUsr", (req, res) => {
  fullUsrController(req, res)
})
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login com email e senha — retorna sessionToken
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                proprieties:
 *                  email:
 *                    type: string
 *                  pass:
 *                    type: string
 *                example:
 *                  email: example@mail.com
 *                  pass: 14sF5%and
 */
router.post("/auth/login", (req, res) => {
  loginController(req, res)
  console.log("/auth/login")
})