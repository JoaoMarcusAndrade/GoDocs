import { Request, Response } from "express";
import { prisma } from "../database/prisma.js";
import { client } from "../redis.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

export async function loginController(req: Request, res: Response) {
    const { email, pass } = req.body;

    if (!email || !pass) {
        return res.status(400).json({
            error: "Email e senha são obrigatórios"
        });
    }

    try {

        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return res.status(401).json({
                error: "Email ou senha inválidos"
            });
        }

        const passCorrect = await bcrypt.compare(pass, user.passHash);

        if (!passCorrect) {
            return res.status(401).json({
                error: "Email ou senha inválidos"
            });
        }

        const token = uuidv4();

        await client.set(`session:${token}`, email, {
            EX: 60 * 60 * 24
        });

        return res.status(201).json({
            message: "Login bem-sucedido",
            token,
            user: {
                name: user.name,
                CPF: user.CPF,
                img: user.image
            }
        });

    } catch (err) {

        console.error(err);

        return res.status(500).json({ error: "Erro interno do servidor" });
    }
}