class BankAccount {
  constructor() {
    this.INITIAL_BALANCE = 0;
    this.INVALID_DATE_ERROR_MSG = 'Please enter valid date in the format DD-MM-YYYY';
    this.INVALID_AMOUNT_ERROR_MSG = 'Amount must be a number';
    this.balance = this.INITIAL_BALANCE;
    this.transactions = [];
  }

  deposit(amount, date) {
    if (this.#isInvalidDate(date)) { 
      throw this.INVALID_DATE_ERROR_MSG;
    }

    if (this.#isInvalidAmount(amount)) {
      throw this.INVALID_AMOUNT_ERROR_MSG;
    }

    this.balance += amount;

    date = this.#formatDate(date);
    amount = this.#formatAmount(amount);

    this.transactions.push({
      date,
      amount,
      type: 'debit',
      currentBalance: this.showBalance()
    });
  }

  withdraw(amount, date) {
    if (this.#isInvalidDate(date)) { 
      throw this.INVALID_DATE_ERROR_MSG;
    }

    if (this.#isInvalidAmount(amount)) {
      throw this.INVALID_AMOUNT_ERROR_MSG;
    }

    this.balance -= amount;

    date = this.#formatDate(date);
    amount = this.#formatAmount(amount);

    this.transactions.push({
      date,
      amount,
      type: 'credit',
      currentBalance: this.showBalance()
    });
  }

  showBalance() {
    return this.#formatAmount(this.balance);
  }

  showTransactions() {
    return [...this.transactions];
  }

  showStatement() {
    const header = 'date || credit || debit || balance\n';

    const body = [...this.transactions].map(transaction => {
      const { date, amount, type, currentBalance } = transaction;

      if (type === 'credit') {
        return date + ' || ' + amount + ' || || ' + currentBalance;
      } else {
        return date + ' || || ' + amount + ' || ' + currentBalance;
      }
      
    }).reverse().join('\n');

    return header + body;
  }

  #isInvalidDate(date) {
    const validFormat = new RegExp(/^\d{2}-\d{2}-\d{4}$/);

    if (!validFormat.test(date)) { return true; }

    const testDate = date.split('-').reverse().join('-');

    if (new Date(testDate) == 'Invalid Date') { return true; }

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