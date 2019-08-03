import {describe, it} from 'mocha';
import {expect} from 'chai';
import { Account } from '../src/Finance';


describe("accounts",() => {
	const bank = new Account("bank");
	const bill = new Account("bill");
	bank.balance += 100;
	const transaction = bank.payTo(bill)(100);

	it("pays to another account", () => {
		expect(bank.balance).to.equal(0);
		expect(bill.balance).to.equal(100);
	});

	it("creates transactions", () => {
		expect(bank.transactions.length).to.equal(1);
		expect(bill.transactions.length).to.equal(1);
		expect(bill.transactions[0].fromAccount).to.equal(bank);
		expect(bank.transactions[0].toAccount).to.equal(bill);
		expect(transaction).to.equal(bill.transactions[0]);
		expect(transaction).to.equal(bank.transactions[0]);
	})
})