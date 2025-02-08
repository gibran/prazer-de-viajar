import dotenv from 'dotenv';
import { UserRepository } from "../infrastructure/database/user-repository.js";
import { CreateUserUseCase } from "../application/use-cases/create-user.use-case.js";
import { ListUsersUseCase } from "../application/use-cases/list-users.use-case.js";
import { GetUserByEmailUseCase } from "../application/use-cases/get-user-by-email.use-case.js";
import { DeleteUserByEmailUseCase } from "../application/use-cases/delete-user-by-email.use-case.js";
import { UserController } from "../interfaces/controllers/user-controller.js";
import userRoutes from "../interfaces/routes/user-routes.js";
import expressApp from "../infrastructure/frameworks/express-app.js";

dotenv.config();

// Inicialização dos módulos
const userRepository = new UserRepository();
const createUserUseCase = new CreateUserUseCase(userRepository);
const listUserUseCase = new ListUsersUseCase(userRepository);
const getUserByEmailUseCase = new GetUserByEmailUseCase(userRepository);
const deleteUserByEmailUseCase = new DeleteUserByEmailUseCase(userRepository);
const userController = new UserController(createUserUseCase, listUserUseCase, getUserByEmailUseCase, deleteUserByEmailUseCase);
const app = expressApp(userRoutes(userController));

// Inicialização do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
