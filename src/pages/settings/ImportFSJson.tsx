import Expenses from '../../expenses.json';
import { TransactionType } from '../../models/Category';
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

function yearfrommydate(mydate: number) {
  return +mydate.toString().substring(0, 4);
}
function yearmonth(mydate: number) {
  return +mydate.toString().substring(0, 6);
}

export const ImportFSJson = () => {
  const saveTodexie = async () => {
    db.transactions.clear();
    //get the categories from database
    const categorysMap = new Map<string, number>();
    await db.categorys.toArray().then((categorys) => {
      categorys.forEach((category) => {
        if (category.id !== undefined) {
          categorysMap.set(category.name.toUpperCase(), category.id);
        }
      });
    });
    Expenses.forEach((expense: Expense) => {
      db.transactions.add({
        categoryId: categorysMap.get(expense.Category.toUpperCase()) || 0,

        // amount: expense.Amount * 100,
        amount: +expense.Amount.toFixed(2).replace('.', '') || 0,
        mydate: expense.mydate,
        strdate: expense.StrDate,
        year: yearfrommydate(expense.mydate),
        yearmonth: yearmonth(expense.mydate),
        type: expense.Income ? TransactionType.INCOME : TransactionType.EXPENSE,
        comment: expense.Comment
      });
    });
  };

  return (
    <div>
      <h1>ImportFSJson</h1>
      <button
        onClick={saveTodexie}
        className='border-2 border-solid bg-amber-500'
      >
        Save to Dexie
      </button>
    </div>
  );
};
