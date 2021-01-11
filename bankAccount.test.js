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

    test('raises an error if date format is not valid', () => {
      expect(() => { 
        bankAccount.deposit(1000, '2021/01/11');
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
  });
});