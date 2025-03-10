// AppDB.ts

import Dexie, { type EntityTable } from 'dexie';
import Transaction from './Transaction';

export default class AppDB extends Dexie {
  transactions!: EntityTable<Transaction, 'id'>;

  constructor() {
    super('TransactionDB');
    this.version(1).stores({
      // Define the indexes for the transactions table
      transactions: '++id, category, amount, myDate, income'
    });
    this.transactions.mapToClass(Transaction);
  }
}
