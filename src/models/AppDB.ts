// AppDB.ts

import Dexie, { type EntityTable } from 'dexie';
import Transaction from './Transaction';
import Category from './Category';
//import { TransactionType } from './Category';

export default class AppDB extends Dexie {
  transactions!: EntityTable<Transaction, 'id'>;
  categorys!: EntityTable<Category, 'id'>;

  constructor() {
    super('AppDB');
    this.version(5).stores({
      // Define the indexes for the transactions table
      transactions: '++id, categoryId, mydate, year, yearmonth, type',
      categorys: '++id, name, type'
    });
  }
}
