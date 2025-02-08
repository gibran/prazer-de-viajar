import { GetUserByEmailUseCase } from '../../../src/application/use-cases/get-user-by-email.use-case.js';
import { UserRepository } from '../../../src/infrastructure/database/user-repository.js';
import { ApplicationError } from '../../../src/application/errors/application-error.js';
import { expect } from 'chai';

describe('GetUserByEmailUseCase', () => {
  let userRepository;
  let getUserByEmailUseCase;

  beforeEach(() => {
    userRepository = new UserRepository();
    getUserByEmailUseCase = new GetUserByEmailUseCase(userRepository);
  });

  it('should return a user by email', async () => {
    await userRepository.save({ id: 1, name: 'John Doe', email: 'john.doe@example.com' });
    const user = await getUserByEmailUseCase.execute('john.doe@example.com');
    expect(user).to.have.property('id');
    expect(user.name).to.equal('John Doe');
    expect(user.email).to.equal('john.doe@example.com');
  });

  it('should throw an error if user not found', async () => {
    try {
      await getUserByEmailUseCase.execute('john.doe@example.com');
    } catch (error) {
      expect(error).to.be.instanceOf(ApplicationError);
      expect(error.message).to.equal('User not found.');
      expect(error.errorCode).to.equal('USER_NOT_FOUND');
      expect(error.httpCode).to.equal(404);
    }
  });

  it('should propagate an error if repository fails', async () => {
    userRepository.findByEmail = async () => { throw new Error('Unexpected error'); };
    try {
      await getUserByEmailUseCase.execute('john.doe@example.com');
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.equal('Unexpected error');
    }
  });
});
