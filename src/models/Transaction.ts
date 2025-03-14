import { Entity } from 'dexie';
import type AppDB from './AppDB';

export default class Transaction extends Entity<AppDB> {
  id!: number;
  category!: string;
  amount!: number;
  mydate!: number;
  strdate!: string;
  income!: boolean;
  comment!: string;
}

/*
interface TransactionProps {
  id: number;
  category: string;
  amount: number;
  mydate: number;
  income: boolean;
  comment: string;
}

const db = new Dexie('TransactionDatabase') as Dexie & {
  transactions: EntityTable<
    Transaction,
    'id' // primary key "id" (for the typings only)
  >;
};

// Schema declaration:
db.version(1).stores({
  transactions: '++id, category, amount, myDate, income' // primary key "id" (for the runtime!)
});

export type { Transaction };
export { db };
*/
