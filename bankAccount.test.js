const BankAccount = require('./bankAccount');

describe('BankAccount', () => {
  let bankAccount;

  beforeEach(() => {
    bankAccount =  new BankAccount();
  });

  describe('#deposit', () => {
    test('allows client to enter an amount and a date', () => {
      const depositSpy = jest.spyOn(bankAccount, 'deposit');
      bankAccount.deposit(1000, '2021-01-11');

      expect(depositSpy).toHaveBeenCalledWith(1000, '2021-01-11');
    });

    test('raises an error if date is not valid', () => {
      expect(() => { 
        bankAccount.deposit(1000, '2021/01/11');
      }).toThrow('Please enter valid date in the format YYYY-MM-DD');

      expect(() => { 
        bankAccount.deposit(1000, '2021-12-32');
      }).toThrow('Please enter valid date in the format YYYY-MM-DD');
    });

    test('raises an error if the amount is not a number', () => {
      expect(() => {
        bankAccount.deposit('', '2021-01-11');
      }).toThrow('Amount must be a number');

      expect(() => {
        bankAccount.deposit(null, '2021-01-11');
      }).toThrow('Amount must be a number');

      expect(() => {
        bankAccount.deposit(undefined, '2021-01-11');
      }).toThrow('Amount must be a number');

      expect(() => {
        bankAccount.deposit(true, '2021-01-11');
      }).toThrow('Amount must be a number');

      expect(() => {
        bankAccount.deposit(false, '2021-01-11');
      }).toThrow('Amount must be a number');

      expect(() => {
        bankAccount.deposit(NaN, '2021-01-11');
      }).toThrow('Amount must be a number');
    });

    test(`increments the client's balance by the amount`, () => {
      bankAccount.deposit(1000, '2021-01-11');

      expect(bankAccount.showBalance()).toEqual(1000);
    });

    test('adds the transaction to transactions array', () => {
      bankAccount.deposit(1000, '2021-01-11');
      const transactions = bankAccount.showTransactions();

      expect(transactions[0]).toBeInstanceOf(Object);
      expect(transactions[0].date).toBe('2021-01-11');
      expect(transactions[0].amount).toBe(1000);
      expect(transactions[0].newBalance).toBe(1000);
    });
  });

  describe('#withdraw', () => {
    test('allows client to enter an amount and a date', () => {
      const withdrawSpy = jest.spyOn(bankAccount, 'withdraw');
      bankAccount.withdraw(500, '2021-01-11');

      expect(withdrawSpy).toHaveBeenCalledWith(500, '2021-01-11');
    });

    test('raises an error if date is not valid', () => {
      expect(() => { 
        bankAccount.withdraw(500, '20210111');
      }).toThrow('Please enter valid date in the format YYYY-MM-DD');

      expect(() => { 
        bankAccount.withdraw(500, '2021-13-31');
      }).toThrow('Please enter valid date in the format YYYY-MM-DD');
    });

    test('raises an error if the amount is not a number', () => {
      expect(() => {
        bankAccount.withdraw('five hundred pounds', '2021-01-11');
      }).toThrow('Amount must be a number');
    });

    test(`decrements the client's balance by the amount`, () => {
      bankAccount.deposit(1000, '2021-01-11');
      bankAccount.deposit(2000, '2021-01-13');
      bankAccount.withdraw(500, '2021-01-14');

      expect(bankAccount.showBalance()).toEqual(2500);
    });

    test('adds transactions to transactions array', () => {
      bankAccount.withdraw(500, '2021-01-11');
      const transactions = bankAccount.showTransactions();

      expect(transactions[0]).toBeInstanceOf(Object);
      expect(transactions[0].date).toBe('2021-01-11');
      expect(transactions[0].amount).toBe(500);
      expect(transactions[0].newBalance).toBe(-500);
    });
  });
});