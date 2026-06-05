import { FastifyReply, FastifyRequest } from "fastify";

export async function authMiddleware(request: FastifyRequest, reply: FastifyReply) {
    if (!request.session.userId) {
        return reply.status(401).send({ message: "Usuário não autenticado" });
    }
}
