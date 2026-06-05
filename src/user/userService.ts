import bcrypt from "bcryptjs";
import { UnauthorizedError } from "../errors/unauthorizedError";
import { CreateUserDTO } from "./dtos/createUserDTO";
import { loginDTO } from "./dtos/loginDTO";
import User from "./userModel";

class UserService {
    async createUser(createUserDTO: CreateUserDTO) {
        const user = await User.create(createUserDTO);
        return user;
    }

    async login(loginDTO: loginDTO) {
        const { email, password } = loginDTO;

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            throw new UnauthorizedError("Email ou senha inválidos");
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            throw new UnauthorizedError("Email ou senha inválidos");
        }

        return user;
    }

    async findById(userId: string) {
        return User.findById(userId);
    }
}

export default UserService;
