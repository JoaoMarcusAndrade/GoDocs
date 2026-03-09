import { prisma } from '../database/prisma.js';
import { client } from '../redis.js';
import { Request, Response } from 'express';
import bcrypt from "bcrypt";

export async function fullUsrController(req: Request, res: Response) {
    try {
        const { email, name, CPF, img } = req.body;

        const userJson = await client.get(`Usr:${email}`);
        
        if (!userJson) {
            return res.status(404).json({ error: "User not found in cache" });
        }

        const user = JSON.parse(userJson!);
        const hashSenha = await bcrypt.hash(user.pass, 10);

        const createdUser = await prisma.user.create({
            data: {
                email: user.email,
                number: user.phone,
                passHash: hashSenha,
                name: name,
                CPF: CPF,
                image: img
            }
        })

        return res.status(201).json(createdUser);
    } catch(err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" })
    }
}