import { Email } from '../../domain/value-objects/email.vo.js';
import { ApplicationError } from '../errors/application-error.js';

class DeleteUserByEmailUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(email) {
    const userEmail = new Email(email);
    const existingUser = await this.userRepository.findByEmail(userEmail.value);

    if (!existingUser) {
      throw new ApplicationError('User not found.', 'USER_NOT_FOUND', 404);
    }

    await this.userRepository.deleteByEmail(userEmail.value);
  }
}

export { DeleteUserByEmailUseCase };
