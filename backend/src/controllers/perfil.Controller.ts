import { Response, Request } from "express";
import { prisma } from "../database/prisma.js";
import bcrypt from "bcrypt";
import { AuthRequest } from "../middleware/auth.middleware.js";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export async function passController(req: AuthRequest, res: Response) {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    const userEmail = req.userEmail

    if (!oldPassword || !newPassword || !confirmPassword) {
        return res.status(400).json({error: "Todos os campos são obrigatórios."})
    }

    if (newPassword !== confirmPassword) {
        return res.status(400).json({error:"As senhas não são iguais."})
    }

    if (!passwordRegex.test(newPassword)) {
        return res.status(400).json({ error: 'A senha deve ter no mínimo 8 caracteres, letra maiúscula, minúscula, número e caractere especial' });
    }

    const user = await prisma.user.findUnique({where: {email: userEmail} });

    if (!user){
        return res.status(404).json({error: "Usuário não encontrado"})
    }

    const passwordMatch = await bcrypt.compare(oldPassword, user.passHash);

    if (!passwordMatch) {
        return res.status(401).json({error: "Senha atual incorreta."})
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
        where: {email: userEmail},
        data: { passHash: hashedPassword},
    });

    return res.status(200).json({message: "Senha alterada com sucesso."})
}