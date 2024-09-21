import { v4 as uuidv4 } from "uuid";
import * as readline from "readline";
import { format } from "date-fns";

class User {
  username: string;
  password: string;
  walletId: string;
  balance: number;
  transactionHistory: string[];

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
    this.walletId = uuidv4();
    this.balance = 0.0;
    this.transactionHistory = [];
  }

  deposit(amount: number): void {
    if (amount > 0) {
      this.balance += amount;
      const transaction = `Deposited $${amount.toFixed(2)} on ${format(
        new Date(),
        "yyyy-MM-dd HH:mm:ss"
      )}`;
      this.transactionHistory.push(transaction);
      console.log(
        `$${amount.toFixed(
          2
        )} deposited successfully. Current balance: $${this.balance.toFixed(2)}`
      );
    } else {
      console.log("Deposit amount must be positive.");
    }
  }

  transfer(recipient: User, amount: number): void {
    if (this.balance >= amount && amount > 0) {
      this.balance -= amount;
      recipient.balance += amount;

      const timestamp = format(new Date(), "yyyy-MM-dd HH:mm:ss");
      this.transactionHistory.push(
        `Transferred $${amount.toFixed(2)} to ${
          recipient.username
        } on ${timestamp}`
      );
      recipient.transactionHistory.push(
        `Received $${amount.toFixed(2)} from ${this.username} on ${timestamp}`
      );

      console.log(
        `Successfully transferred $${amount.toFixed(2)} to ${
          recipient.username
        }. Current balance: $${this.balance.toFixed(2)}`
      );
    } else {
      console.log("Insufficient balance or invalid amount.");
    }
  }

  check_balance(): void {
    console.log(`Your current balance is : $${this.balance.toFixed(2)}`);
  }
}

// Sample usage
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter first user's username: ", (username1) => {
  rl.question("Enter first user's password: ", (password1) => {
    const user1 = new User(username1, password1);

    rl.question("Enter second user's username: ", (username2) => {
      rl.question("Enter second user's password: ", (password2) => {
        const user2 = new User(username2, password2);

        rl.question(
          `Enter the amount to deposit for ${user1.username}: `,
          (inputAmount) => {
            const amount = parseFloat(inputAmount);
            user1.deposit(amount);

            // Check balance after deposite
            user1.check_balance();

            rl.question(
              `Enter the amount to transfer from ${user1.username} to ${user2.username}: `,
              (transferAmountStr) => {
                const transferAmount = parseFloat(transferAmountStr);
                user1.transfer(user2, transferAmount);

                // check balance after the transection :
                user1.check_balance();
                user2.check_balance();

                console.log(
                  `\n${user1.username}'s Transaction History: ${user1.transactionHistory}`
                );
                console.log(
                  `${user2.username}'s Transaction History: ${user2.transactionHistory}`
                );
                rl.close();
              }
            );
          }
        );
      });
    });
  });
});
