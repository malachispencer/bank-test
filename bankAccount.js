class BankAccount {
  constructor() {
    this.INITIAL_BALANCE = 0;
    this.balance = this.INITIAL_BALANCE;
    this.transactions = [];
  }

  deposit(amount, date) {
    if (this.#isInvalidDate(date)) { 
      throw 'Please enter valid date in the format YYYY-MM-DD';
     }
  }

  #isInvalidDate(date) {
    const validFormat = new RegExp(/^\d{4}-\d{2}-\d{2}$/);

    if (!validFormat.test(date)) {
      return true;
    }

    if (new Date(date) === 'Invalid Date') { 
      return true; 
    }

    return false;
  }
}

module.exports = BankAccount;