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
        bankAccount.deposit(1000, '100121');
      }).toThrow('Please enter valid date in the format YYYY-MM-DD');
    });
  });
});