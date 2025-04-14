import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../models/db';
//import Transaction from '../../models/Transaction';
import { TransactionCard } from './TransactionCard';
import { useState } from 'react';

export const TransactionList = () => {
  //get current year and month
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // Months are zero-based in JavaScript
  const [year, setYear] = useState<number>(currentYear);
  const [month, setMonth] = useState<number>(currentMonth);

  const transactions = useLiveQuery(
    async () => {
      // Calculate the start and end date for the month
      const nextyear = month === 12 ? year + 1 : year;
      const nextmonth = month === 12 ? 1 : month + 1;
      const firstDayThisMonth =
        '' + year + (month < 10 ? '0' + month : month) + '01';
      const firstDayNextMonth =
        '' + nextyear + (nextmonth < 10 ? '0' + nextmonth : nextmonth) + '01';
      const transactions = await db.transactions
        .where('mydate')
        .between(+firstDayThisMonth, +firstDayNextMonth, true, false)
        .toArray();
      const categories = await db.categorys.toArray();
      // Combine transactions with categories
      return transactions.map((trans) => ({
        ...trans,
        category: categories.find((c) => c.id === trans.categoryId)?.name
      }));
    },
    [year, month],
    []
  );

  /*
  useEffect(() => {
    const fetchTransactions = async () => {
      // Calculate the start and end date for the month
      const nextyear = month === 12 ? year + 1 : year;
      const nextmonth = month === 12 ? 1 : month + 1;
      const firstDayThisMonth =
        '' + year + (month < 10 ? '0' + month : month) + '01';
      const firstDayNextMonth =
        '' + nextyear + (nextmonth < 10 ? '0' + nextmonth : nextmonth) + '01';
      const transactions = await db.transactions
        .where('mydate')
        .between(+firstDayThisMonth, +firstDayNextMonth, true, false)
        .toArray();
      setTransactions(transactions);
    };
    fetchTransactions();
  }, [year, month]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
*/
  //if (!transactions) return null;
  //if (transactions.length === 0) return <div>No transactions found</div>;
  return (
    <div className=' w-full items-center justify-center min-h-screen bg-blue-50 p-1'>
      <div>
        <select
          className='border-2 border-gray-300 rounded-md p-2'
          value={year}
          onChange={(e) => setYear(parseInt(e.target.value))}
        >
          {Array.from({ length: 10 }, (_, index) => (
            <option key={index} value={currentYear - index}>
              {currentYear - index}
            </option>
          ))}
        </select>
        <select
          className='border-2 border-gray-300 rounded-md p-2'
          value={month}
          onChange={(e) => setMonth(parseInt(e.target.value))}
        >
          {Array.from({ length: 12 }, (_, index) => (
            <option key={index} value={index + 1}>
              {new Date(0, index).toLocaleString('default', {
                month: 'long'
              })}
            </option>
          ))}
        </select>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-4 bg-white p-2 gap-4 rounded-lg shadow-xl w-full text-center border border-gray-200'>
        {transactions?.map((trans) => (
          <TransactionCard key={trans.id} transaction={trans} />
        ))}
      </div>
    </div>
  );
};
