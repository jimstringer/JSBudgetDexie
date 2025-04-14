export enum TransactionType {
  EXPENSE = 'EXPENSE',
  INCOME = 'INCOME',
}
// Category.ts
// Category model
// This file defines the structure of a Category object.

export default interface Category {
  id?: number;
  name: string;
  type: TransactionType;
}
