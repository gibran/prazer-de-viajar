class UserRepository {
    constructor() {
        this.users = [];
    }

    async save(user) {
        this.users.push(user);
        return user;
    }

    async findAll() {
        return this.users;
    }

    async findByEmail(email) {
        return this.users.find(user => user.email === email);
    }

    async deleteByEmail(email) {
        this.users = this.users.filter(user => user.email !== email);
    }
}

export { UserRepository };