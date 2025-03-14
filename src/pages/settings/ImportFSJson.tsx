import Expenses from '../../expenses.json';
import { db } from '../../models/db';

interface Expense {
  docid: string;
  mydate: number;
  StrDate: string;
  Category: string;
  Amount: number;
  Income: boolean;
  Comment: string;
}

export const ImportFSJson = () => {
  const saveTodexie = () => {
    Expenses.forEach((expense: Expense) => {
      db.transactions.add({
        category: expense.Category,
        amount: expense.Amount,
        mydate: expense.mydate,
        strdate: expense.StrDate,
        income: expense.Income,
        comment: expense.Comment
      });
    });
  };

  return (
    <div>
      <h1>ImportFSJson</h1>
      <button onClick={saveTodexie}>Save to Dexie</button>
    </div>
  );
};
