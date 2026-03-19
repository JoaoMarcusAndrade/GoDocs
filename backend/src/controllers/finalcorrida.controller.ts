import { Response } from "express";
import { prisma } from "../database/prisma.js";
import { AuthRequest } from "../middleware/auth.middleware.js";

export async function finalizarCorridaController(req: AuthRequest, res: Response) {
    try {

        const deliveryId = parseInt(req.params['id'] as string);
        if (isNaN(deliveryId)) {
            return res.status(400).json({ error: "ID de corrida inválido." });
        }

        const delivery = await prisma.delivery.findUnique({
            where: { id: deliveryId },
            include: { courier: true },
        });

        if (!delivery) {
            return res.status(404).json({ error: "Corrida não encontrada." });
        }

        if (delivery.status !== "EM_ROTA") {
            return res.status(400).json({ error: "Corrida não pode ser finalizada." });
        }

        if (delivery.courier?.email !== req.userEmail) {
            return res.status(403).json({ error: "Sem permissão para finalizar esta corrida." });
        }

        const updated = await prisma.delivery.update({
            where: { id: deliveryId },
            data: {
                status: "ENTREGUE",
                finishedAt: new Date(),
            },
        });

        return res.status(200).json({ message: "Corrida finalizada.", delivery: updated });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Erro interno do servidor" });
    }
}