"use strict";
exports.__esModule = true;
var Transaction = /** @class */ (function () {
    function Transaction() {
    }
    return Transaction;
}());
exports.Transaction = Transaction;
var Account = /** @class */ (function () {
    function Account(name) {
        this.name = "bank";
        this.balance = 0;
        this.transactions = [];
        this.name = name;
    }
    Account.prototype.payTo = function (act) {
        var _this = this;
        return function (amount) {
            var trans = new Transaction();
            trans.fromAccount = _this;
            trans.toAccount = act;
            trans.fromAccountStartBalance = _this.balance;
            trans.toAccountStartBalance = act.balance;
            trans.transferAmount = amount;
            _this.balance -= amount;
            act.balance += amount;
            _this.transactions.push(trans);
            act.transactions.push(trans);
            return trans;
        };
    };
    return Account;
}());
exports.Account = Account;
//# sourceMappingURL=Finance.js.map