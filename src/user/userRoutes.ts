import { FastifyInstance } from "fastify";
import { authMiddleware } from "../middlewares/authMiddleware";
import UserController from "./userController";
import UserService from "./userService";

const userService = new UserService();
const userController = new UserController(userService);

export const userRoutes = async (app: FastifyInstance) => {
    app.post("/user", userController.createUser.bind(userController));
    app.post("/login", userController.login.bind(userController));
    app.get("/me", { preHandler: authMiddleware }, userController.me.bind(userController));
    app.post("/logout", { preHandler: authMiddleware }, userController.logout.bind(userController));
};
