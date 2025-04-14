import { TransactionType } from './Category';
import { db } from './db';

export async function populate() {
  await db.categorys.bulkAdd([
    { name: 'Alcohol', type: TransactionType.EXPENSE },
    { name: 'Gas', type: TransactionType.EXPENSE },
    { name: 'Auto', type: TransactionType.EXPENSE },
    { name: 'Fees', type: TransactionType.EXPENSE },
    { name: 'Beauty', type: TransactionType.EXPENSE },
    { name: 'Bell', type: TransactionType.EXPENSE },
    { name: 'Family', type: TransactionType.EXPENSE },
    { name: 'Fishing', type: TransactionType.EXPENSE },
    { name: 'Camping', type: TransactionType.EXPENSE },
    { name: 'City Water', type: TransactionType.EXPENSE },
    { name: 'Clothing', type: TransactionType.EXPENSE },
    { name: 'Dine Out', type: TransactionType.EXPENSE },
    { name: 'Entertainment', type: TransactionType.EXPENSE },
    { name: 'Grocery', type: TransactionType.EXPENSE },
    { name: 'Health', type: TransactionType.EXPENSE },
    { name: 'Holiday', type: TransactionType.EXPENSE },
    { name: 'House', type: TransactionType.EXPENSE },
    { name: 'Hydro', type: TransactionType.EXPENSE },
    { name: 'Lotto', type: TransactionType.EXPENSE },
    { name: 'Misc', type: TransactionType.EXPENSE },
    { name: 'Taxes', type: TransactionType.EXPENSE },
    { name: 'Xmas', type: TransactionType.EXPENSE },
    {
      name: 'CPP',
      type: TransactionType.INCOME
    },
    {
      name: 'OAS',
      type: TransactionType.INCOME
    },
    {
      name: 'TIPS',
      type: TransactionType.INCOME
    },
    {
      name: 'WAGE',
      type: TransactionType.INCOME
    },
    {
      name: 'RIF',
      type: TransactionType.INCOME
    },
    {
      name: 'GIC',
      type: TransactionType.INCOME
    },
    {
      name: 'GST',
      type: TransactionType.INCOME
    },
    {
      name: 'CAI',
      type: TransactionType.INCOME
    },
    {
      name: 'TAX',
      type: TransactionType.INCOME
    },
    {
      name: 'OTHER',
      type: TransactionType.INCOME
    }
  ]);
}
