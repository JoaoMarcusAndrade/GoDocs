import { Request, Response } from "express";

export async function emailController(req: Request, res: Response) {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: "Email deve ser obrigatório!" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(422).json({ error: "Email inválido!" });
    }
    return res.status(200).json({ message: "Email válido!" });
}