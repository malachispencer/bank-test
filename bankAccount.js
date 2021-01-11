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

    if (this.#isInvalidAmount(amount)) {
      throw 'Amount must be a number';
    }

    this.balance += amount;

    date = this.#formatDate(date);

    this.transactions.push({
      date,
      amount,
      type: 'debit',
      newBalance: this.balance
    });
  }

  withdraw(amount, date) {
    if (this.#isInvalidDate(date)) { 
      throw 'Please enter valid date in the format YYYY-MM-DD';
    }

    if (this.#isInvalidAmount(amount)) {
      throw 'Amount must be a number';
    }

    this.balance -= amount;

    date = this.#formatDate(date);

    this.transactions.push({
      date,
      amount,
      type: 'credit',
      newBalance: this.balance
    });
  }

  showBalance() {
    return this.balance;
  }

  showTransactions() {
    return this.transactions;
  }

  #isInvalidDate(date) {
    const validFormat = new RegExp(/^\d{4}-\d{2}-\d{2}$/);

    if (!validFormat.test(date)) { return true; }

    if (new Date(date) == 'Invalid Date') { return true; }

    return false;
  }

  #isInvalidAmount(amount) {
    if (typeof amount !== 'number' || isNaN(amount)) {
      return true;
    }

    return false;
  }

  #formatDate(date) {
    return date.replace(/-/g, '/');
  }
}

module.exports = BankAccount;