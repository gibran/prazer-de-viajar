class ListUsersUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute() {
    return this.userRepository.findAll();
  }
}

export { ListUsersUseCase };