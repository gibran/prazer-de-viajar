import { ApplicationError } from '../../application/errors/application-error.js';

class UserController {
    constructor(createUserUseCase, listUsersUseCase, getUserByEmailUseCase, deleteUserByEmailUseCase) {
        this.createUserUseCase = createUserUseCase;
        this.listUsersUseCase = listUsersUseCase;
        this.getUserByEmailUseCase = getUserByEmailUseCase;
        this.deleteUserByEmailUseCase = deleteUserByEmailUseCase;
    }

    async createUser(request, response) {
        const { name, email } = request.body;

        try {
            const user = await this.createUserUseCase.execute(name, email);
            return response.status(201).json(user);
        } catch (error) {
            if (error instanceof ApplicationError) {
                return response.status(error.httpCode).json(error.toJSON());
            }
            return response.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async listUsers(request, response) {
        const users = await this.listUsersUseCase.execute();
        return response.status(200).json(users);
    }

    async getUserByEmail(request, response) {
        const { email } = request.params;

        try {
            const user = await this.getUserByEmailUseCase.execute(email);
    
            return response.status(200).json(user);
        } catch (error) {
            if (error instanceof ApplicationError) {
                return response.status(error.httpCode).json(error.toJSON());
            }
            return response.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async deleteUserByEmail(request, response) {
        const { email } = request.params;

        try {
            await this.deleteUserByEmailUseCase.execute(email);
            return response.status(204).send();
        } catch (error) {
            if (error instanceof ApplicationError) {
                return response.status(error.httpCode).json(error.toJSON());
            }
            return response.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export { UserController };