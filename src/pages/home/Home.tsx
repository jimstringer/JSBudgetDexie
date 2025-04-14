//import { Link } from 'react-router';

import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../models/db';
import { groupBySum } from '../../utils/GroupBySum';
import { NumberFormater } from '../../utils/NumberFormater';
import { DetailList } from '../../components/DetailList';
import { TransactionType } from '../../models/Category';

export const Home = () => {
  const currentyear = new Date().getFullYear(); // Define currentyear
  let expenseTotal = 0; // Initialize expenseTotal in cents
  let incomeTotal = 0; // Initialize incomeTotal
  //get current year and month
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Months are zero-based in JavaScript

  const totals = useLiveQuery(
    async () => {
      // Get transactions for current year

      const transactions = await db.transactions
        .where('year')
        .equals(year)
        .toArray();
      const categories = await db.categorys.toArray();
      // Combine transactions with categories
      const combined = transactions.map((trans) => ({
        ...trans,
        category:
          categories.find((c) => c.id === trans.categoryId)?.name ||
          'Uncategorized'
      }));
      const totals = groupBySum(combined, ['category', 'type'], ['amount']);
      return totals;
    },
    [year, month],
    []
  );
  // Calculate the expense and income totals
  if (totals) {
    expenseTotal = totals.reduce(
      (acc, curr) => (curr.type === 'EXPENSE' ? acc + curr.amount : acc),
      0
    );
    incomeTotal = totals.reduce(
      (acc, curr) => (curr.type === 'INCOME' ? acc + curr.amount : acc),
      0
    );

    totals.sort((a, b) => {
      if ((a.category ?? '') < (b.category ?? '')) return -1;
      if ((a.category ?? '') > (b.category ?? '')) return 1;
      return 0;
    });
    //console.log('Totals', totals);

    //console.log('Totals:', totals);
  }
  //console.log('Expense Total:', expenseTotal);
  //console.log('Income Total:', incomeTotal);
  // Render the component

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-blue-50 p-6'>
      <div className='bg-white p-8 rounded-lg shadow-xl max-w-xl w-full text-center border border-gray-200'>
        <h1 className='text-4xl font-bold text-gray-800 mb-4'>
          {currentyear} Totals!
        </h1>
        <div className='font-bold text-gray-600 text-left bg-pink-300 mb-1'>
          Expense Total: {NumberFormater.format(expenseTotal / 100)}
        </div>
        <DetailList trans={totals} type={TransactionType.EXPENSE} />
        <div className='font-bold text-gray-600 text-left bg-green-300 mt-2'>
          Income Total: {NumberFormater.format(incomeTotal / 100)}
        </div>
        <DetailList trans={totals} type={TransactionType.INCOME} />
      </div>
    </div>
  );
};
