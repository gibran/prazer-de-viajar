import { User } from '../../domain/entities/user.entity.js';
import { Email } from '../../domain/value-objects/email.vo.js';
import { ApplicationError } from '../errors/application-error.js';

class CreateUserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(name, email) {
    const userEmail = new Email(email);
    const existingUser = await this.userRepository.findByEmail(userEmail.value);

    if (existingUser) {
      throw new ApplicationError('User with this email already exists', 'USER_EXISTS', 400);
    }

    const user = new User({ id: Date.now(), name, email: userEmail.value });
    return this.userRepository.save(user);
  }
}

export { CreateUserUseCase };