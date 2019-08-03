
export class Transaction{
	fromAccount: Account;
	toAccount: Account;
	transferAmount: number;
	fromAccountStartBalance: number;
	toAccountStartBalance: number;
}

export class Account{

	name: string = "bank";
	balance: number = 0;
	transactions: Transaction[] = [];
	constructor(name: string){
		this.name = name;
	}
	payTo(act: Account): (amount: number) => Transaction {
		return amount => {
			const trans = new Transaction();
			trans.fromAccount = this;
			trans.toAccount = act;
			trans.fromAccountStartBalance = this.balance;
			trans.toAccountStartBalance = act.balance;
			trans.transferAmount = amount;
			this.balance -= amount;
			act.balance += amount;
			this.transactions.push(trans);
			act.transactions.push(trans);
			return trans;
		}
	}
}	 	