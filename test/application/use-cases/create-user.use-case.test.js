import { CreateUserUseCase } from '../../../src/application/use-cases/create-user.use-case.js';
import { UserRepository } from '../../../src/infrastructure/database/user-repository.js';
import { ApplicationError } from '../../../src/application/errors/application-error.js';
import { expect } from 'chai';

describe('CreateUserUseCase', () => {
  let userRepository;
  let createUserUseCase;

  beforeEach(() => {
    userRepository = new UserRepository();
    createUserUseCase = new CreateUserUseCase(userRepository);
  });

  it('should create a new user', async () => {
    const user = await createUserUseCase.execute('John Doe', 'john.doe@example.com');
    expect(user).to.have.property('id');
    expect(user.name).to.equal('John Doe');
    expect(user.email).to.equal('john.doe@example.com');
  });

  it('should throw an error if user with email already exists', async () => {
    await createUserUseCase.execute('John Doe', 'john.doe@example.com');
    try {
      await createUserUseCase.execute('Jane Doe', 'john.doe@example.com');
    } catch (error) {
      expect(error).to.be.instanceOf(ApplicationError);
      expect(error.message).to.equal('User with this email already exists');
      expect(error.errorCode).to.equal('USER_EXISTS');
      expect(error.httpCode).to.equal(400);
    }
  });

  it('should propagate an error if repository fails', async () => {
    userRepository.save = async () => { throw new Error('Unexpected error'); };
    try {
      await createUserUseCase.execute('John Doe', 'john.doe@example.com');
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.equal('Unexpected error');
    }
  });
});
