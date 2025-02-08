import { DeleteUserByEmailUseCase } from '../../../src/application/use-cases/delete-user-by-email.use-case.js';
import { UserRepository } from '../../../src/infrastructure/database/user-repository.js';
import { ApplicationError } from '../../../src/application/errors/application-error.js';
import { expect } from 'chai';

describe('DeleteUserByEmailUseCase', () => {
  let userRepository;
  let deleteUserByEmailUseCase;

  beforeEach(() => {
    userRepository = new UserRepository();
    deleteUserByEmailUseCase = new DeleteUserByEmailUseCase(userRepository);
  });

  it('should delete a user by email', async () => {
    await userRepository.save({ id: 1, name: 'John Doe', email: 'john.doe@example.com' });
    await deleteUserByEmailUseCase.execute('john.doe@example.com');
    const user = await userRepository.findByEmail('john.doe@example.com');
    expect(user).to.be.undefined;
  });

  it('should throw an error if user not found', async () => {
    try {
      await deleteUserByEmailUseCase.execute('john.doe@example.com');
    } catch (error) {
      expect(error).to.be.instanceOf(ApplicationError);
      expect(error.message).to.equal('User not found.');
      expect(error.errorCode).to.equal('USER_NOT_FOUND');
      expect(error.httpCode).to.equal(404);
    }
  });

  it('should propagate an error if repository fails', async () => {
    userRepository.deleteByEmail = async () => { throw new Error('Unexpected error'); };
    try {
      await userRepository.save({ id: 1, name: 'John Doe', email: 'john.doe@example.com' });
      await deleteUserByEmailUseCase.execute('john.doe@example.com');
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.equal('Unexpected error');
    }
  });
});
