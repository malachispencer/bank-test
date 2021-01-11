const BankAccount = require('./bankAccount');

describe('BankAccount', () => {
  let bankAccount;

  beforeEach(() => {
    bankAccount = new BankAccount();
  });

  describe('#deposit', () => {
    test('allows client to enter an amount and a date', () => {
      const depositSpy = jest.spyOn(bankAccount, 'deposit');
      bankAccount.deposit(1000, '11-01-2021');

      expect(depositSpy).toHaveBeenCalledWith(1000, '11-01-2021');
    });

    test('raises an error if date is not valid', () => {
      expect(() => { 
        bankAccount.deposit(1000, '11/01/2021');
      }).toThrow('Please enter valid date in the format DD-MM-YYYY');

      expect(() => { 
        bankAccount.deposit(1000, '32-12-2021');
      }).toThrow('Please enter valid date in the format DD-MM-YYYY');
    });

    test('raises an error if the amount is not a number', () => {
      expect(() => {
        bankAccount.deposit('', '11-01-2021');
      }).toThrow('Amount must be a number');

      expect(() => {
        bankAccount.deposit(null, '11-01-2021');
      }).toThrow('Amount must be a number');

      expect(() => {
        bankAccount.deposit(undefined, '11-01-2021');
      }).toThrow('Amount must be a number');

      expect(() => {
        bankAccount.deposit(true, '11-01-2021');
      }).toThrow('Amount must be a number');

      expect(() => {
        bankAccount.deposit(false, '11-01-2021');
      }).toThrow('Amount must be a number');

      expect(() => {
        bankAccount.deposit(NaN, '11-01-2021');
      }).toThrow('Amount must be a number');
    });

    test(`increments the client's balance by the amount`, () => {
      bankAccount.deposit(1000, '11-01-2021');

      expect(bankAccount.showBalance()).toEqual('1000.00');
    });

    test('adds the transaction to transactions array', () => {
      bankAccount.deposit(1000, '11-01-2021');
      const transactions = bankAccount.showTransactions();

      expect(transactions[0]).toBeInstanceOf(Object);
      expect(transactions[0].date).toBe('11/01/2021');
      expect(transactions[0].amount).toBe('1000.00');
      expect(transactions[0].type).toBe('debit');
      expect(transactions[0].currentBalance).toBe('1000.00');
    });
  });

  describe('#withdraw', () => {
    test('allows client to enter an amount and a date', () => {
      const withdrawSpy = jest.spyOn(bankAccount, 'withdraw');
      bankAccount.withdraw(500, '11-01-2021');

      expect(withdrawSpy).toHaveBeenCalledWith(500, '11-01-2021');
    });

    test('raises an error if date is not valid', () => {
      expect(() => { 
        bankAccount.withdraw(500, '20210111');
      }).toThrow('Please enter valid date in the format DD-MM-YYYY');

      expect(() => { 
        bankAccount.withdraw(500, '31-13-2021');
      }).toThrow('Please enter valid date in the format DD-MM-YYYY');
    });

    test('raises an error if the amount is not a number', () => {
      expect(() => {
        bankAccount.withdraw('five hundred pounds', '11-01-2021');
      }).toThrow('Amount must be a number');
    });

    test(`decrements the client's balance by the amount`, () => {
      bankAccount.deposit(1000, '11-01-2021');
      bankAccount.deposit(2000, '13-01-2021');
      bankAccount.withdraw(500, '14-01-2021');

      expect(bankAccount.showBalance()).toEqual('2500.00');
    });

    test('adds transactions to transactions array', () => {
      bankAccount.withdraw(500, '11-01-2021');
      const transactions = bankAccount.showTransactions();

      expect(transactions[0]).toBeInstanceOf(Object);
      expect(transactions[0].date).toBe('11/01/2021');
      expect(transactions[0].amount).toBe('500.00');
      expect(transactions[0].type).toBe('credit');
      expect(transactions[0].currentBalance).toBe('-500.00');
    });
  });

  describe('#showStatement', () => {
    test('returns a multiline string of all transactions', () => {
      bankAccount.deposit(1000, '11-01-2021');
      bankAccount.deposit(2000, '13-01-2021');
      bankAccount.withdraw(500, '14-01-2021');

      const header = 'date || credit || debit || balance\n';
      const bodyOne = '14/01/2021 || 500.00 || || 2500.00\n';
      const bodyTwo = '13/01/2021 || || 2000.00 || 3000.00\n';
      const bodyThree = '11/01/2021 || || 1000.00 || 1000.00';
      const statement = header + bodyOne + bodyTwo + bodyThree;

      expect(bankAccount.showStatement()).toEqual(statement);
    });
  });
});