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
        bankAccount.deposit('wrong', '2021-01-11');
      }).toThrow('Amount must be an a number');
    });
  });
});