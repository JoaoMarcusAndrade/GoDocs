import { prisma } from '../database/prisma.js';
import { client } from '../redis.js';
import { Request, Response } from 'express';
import bcrypt from "bcrypt";

export async function fullUsrController(req: Request, res: Response) {
    const { email, name, CPF, img } = req.body;

    if (!email || !name || !CPF) {
        return res.status(400).json({ error: "Dados obrigatórios" });
    }

    const cleanCPF = CPF.replace(/\D/g, "");

    if (cleanCPF.length !== 11) {
        return res.status(400).json({ error: "CPF inválido" });
    }

    try {
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return res.status(409).json({
                error: "Conflict",
                message: "Este e-mail já está cadastrado."
            });
        }

        const userJson = await client.get(`Usr:${email}`);
        if (!userJson) {
            return res.status(404).json({ error: "User not found in cache" });
        }

        let user
        try {
            user = JSON.parse(userJson);
        } catch {
            return res.status(500).json({ error: "Erro ao ler cache" });
        }

        if (!user.pass || !user.email || !user.phone) {
            return res.status(400).json({ error: "Dados inválidos no cache" });
        }

        if (email !== user.email) {
            return res.status(400).json({
                error: "Bad Request",
                message: "dados em cache inválidos"
            })
        }

        const hashSenha = await bcrypt.hash(user.pass, 10);

        const createdUser = await prisma.user.create({
            data: {
                email: user.email,
                number: user.phone,
                passHash: hashSenha,
                name: name,
                CPF: cleanCPF,
                image: img
            }
        })

        await client.del(`Usr:${email}`)
        return res.status(201).json(createdUser);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro interno do servidor" })
    }
}