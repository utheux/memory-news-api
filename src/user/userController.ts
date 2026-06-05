import { FastifyReply, FastifyRequest } from "fastify";
import { UnauthorizedError } from "../errors/unauthorizedError";
import { CreateUserDTO } from "./dtos/createUserDTO";
import { loginDTO } from "./dtos/loginDTO";
import UserService from "./userService";

export class UserController {
    constructor(private readonly userService: UserService) { }

    private handleError(error: unknown, reply: FastifyReply) {
        if (error instanceof UnauthorizedError) {
            return reply.status(401).send({ message: error.message });
        }

        return reply.status(500).send({ message: "Erro interno do servidor" });
    }

    async createUser(
        request: FastifyRequest<{ Body: CreateUserDTO }>,
        reply: FastifyReply
    ) {
        try {
            const user = await this.userService.createUser(request.body);
            const { password, ...userResponse } = user.toObject();

            reply.status(201).send(userResponse);
        } catch (error) {
            this.handleError(error, reply);
        }
    }

    async login(
        request: FastifyRequest<{ Body: loginDTO }>,
        reply: FastifyReply
    ) {
        try {
            const user = await this.userService.login(request.body);
            const { password, ...userResponse } = user.toObject();

            request.session.userId = user.id;

            reply.status(200).send(userResponse);
        } catch (error) {
            this.handleError(error, reply);
        }
    }

    async me(request: FastifyRequest, reply: FastifyReply) {
        try {
            if (!request.session.userId) {
                return reply.status(401).send({ message: "Usuário não autenticado" });
            }

            const user = await this.userService.findById(request.session.userId);

            if (!user) {
                await request.session.destroy();
                return reply.status(401).send({ message: "Usuário não autenticado" });
            }

            reply.status(200).send(user);
        } catch (error) {
            this.handleError(error, reply);
        }
    }

    async logout(request: FastifyRequest, reply: FastifyReply) {
        try {
            await request.session.destroy();

            reply.status(204).send();
        } catch (error) {
            this.handleError(error, reply);
        }
    }
}

export default UserController;
