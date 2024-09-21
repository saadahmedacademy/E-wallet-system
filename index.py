import uuid
import getpass
from datetime import datetime

class User:
    def __init__(self, username: str, password: str) -> None:
        self.username: str = username
        self.password: str = password
        self.wallet_id: str = str(uuid.uuid4())
        self.balance: float = 0.0
        self.transaction_history: list[str] = []

    def deposit(self, amount: float) -> None:
        if amount > 0:
            self.balance += amount
            transaction = f"Deposited ${amount:.2f} on {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"
            self.transaction_history.append(transaction)
            print(f"${amount:.2f} deposited successfully. Current balance: ${self.balance:.2f}")
        else:
            print("Deposit amount must be positive.")

    def transfer(self, recipient: 'User', amount: float) -> None:
        if self.balance >= amount > 0:
            self.balance -= amount
            recipient.balance += amount

            # Record the transaction in both users' histories
            timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            self.transaction_history.append(f"Transferred ${amount:.2f} to {recipient.username} on {timestamp}")
            recipient.transaction_history.append(f"Received ${amount:.2f} from {self.username} on {timestamp}")

            print(f"Successfully transferred ${amount:.2f} to {recipient.username}. Current balance: ${self.balance:.2f}")
        else:
            print("Insufficient balance or invalid amount.")

    def check_balance(self)-> None:
        print(f"Your current balance is : ${self.balance:.2f}")

# Sample usage
if __name__ == "__main__":
    # Create two users
    username1 = input("Enter first user's username: ")
    password1 = getpass.getpass("Enter first user's password: ")
    user1 = User(username1, password1)

    username2 = input("Enter second user's username: ")
    password2 = getpass.getpass("Enter second user's password: ")
    user2 = User(username2, password2)

    # Deposit money to user1
    amount = float(input(f"Enter the amount to deposit for {user1.username}: "))
    user1.deposit(amount)

    # Perform transfer
    transfer_amount = float(input(f"Enter the amount to transfer from {user1.username} to {user2.username}: "))
    user1.transfer(user2, transfer_amount)

    # Display transaction histories
    print(f"\n{user1.username}'s Transaction History: {user1.transaction_history}")
    print(f"{user2.username}'s Transaction History: {user2.transaction_history}")
