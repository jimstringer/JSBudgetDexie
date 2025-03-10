import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../models/db';
import Transaction from '../../models/Transaction';
import { TransactionCard } from './TransactionCard';

export const TransactionList = () => {
  const transactions = useLiveQuery(() => db.transactions.toArray(), []);

  return (
    <div className=' w-full items-center justify-center min-h-screen bg-blue-50 p-1'>
      <h1 className='text-4xl font-extrabold text-gray-800 mb-4'>
        Transactions
      </h1>
      <div className='grid grid-cols-1 md:grid-cols-4 bg-white p-2 gap-4 rounded-lg shadow-xl w-full text-center border border-gray-200'>
        {transactions?.map((transaction: Transaction) => (
          <TransactionCard key={transaction.id} transaction={transaction} />
        ))}
      </div>
    </div>
  );
};
