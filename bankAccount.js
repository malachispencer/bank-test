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
    amount = this.#formatAmount(amount);

    this.transactions.push({
      date,
      amount,
      type: 'debit',
      newBalance: this.showBalance()
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
    amount = this.#formatAmount(amount);

    this.transactions.push({
      date,
      amount,
      type: 'credit',
      newBalance: this.showBalance()
    });
  }

  showBalance() {
    return this.#formatAmount(this.balance);
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

  #formatAmount(amount) {
    return amount.toFixed(2);
  }
}

module.exports = BankAccount;