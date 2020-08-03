import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions.reduce((a, transaction) => {
      return transaction.type === 'income' ? a + transaction.value : a;
    }, 0);

    const outcome = this.transactions.reduce((a, transaction) => {
      return transaction.type === 'outcome' ? a + transaction.value : a;
    }, 0);

    const total = income - outcome;

    return { income, outcome, total };
  }

  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
