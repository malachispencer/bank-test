const BankAccount = require('./bankAccount');

describe('BankAccount', () => {
  let bankAccount;

  beforeEach(() => {
    bankAccount =  new BankAccount();
  });

  describe('#deposit', () => {
    test('it allows client to add an amount and a date', () => {
      const depositFn = bankAccount.deposit(1000, '11/01/21');
      const mockFn = jest.fn(depositFn);

      expect(depositFn).toHaveBeenCalledWith(1000, '11/01/20');
    });
  });
});