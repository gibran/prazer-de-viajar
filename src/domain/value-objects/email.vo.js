class Email {
  constructor(email) {
    if (!Email.isValid(email)) {
      throw new Error('Email is invalid');
    }

    this.value = email;
  }

  static isValid(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}   

export { Email }