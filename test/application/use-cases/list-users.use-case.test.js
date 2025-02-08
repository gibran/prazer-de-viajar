import { ListUsersUseCase } from '../../../src/application/use-cases/list-users.use-case.js';
import { UserRepository } from '../../../src/infrastructure/database/user-repository.js';
import { expect } from 'chai';

describe('ListUsersUseCase', () => {
  let userRepository;
  let listUsersUseCase;

  beforeEach(() => {
    userRepository = new UserRepository();
    listUsersUseCase = new ListUsersUseCase(userRepository);
  });

  it('should return all users', async () => {
    await userRepository.save({ id: 1, name: 'John Doe', email: 'john.doe@example.com' });
    await userRepository.save({ id: 2, name: 'Jane Doe', email: 'jane.doe@example.com' });
    const users = await listUsersUseCase.execute();
    expect(users).to.have.lengthOf(2);
  });

  it('should return an empty list if no users are found', async () => {
    const users = await listUsersUseCase.execute();
    expect(users).to.be.an('array').that.is.empty;
  });

  it('should propagate an error if repository fails', async () => {
    userRepository.findAll = async () => { throw new Error('Unexpected error'); };
    try {
      await listUsersUseCase.execute();
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.equal('Unexpected error');
    }
  });
});
