import Transaction from '../../models/Transaction';
import { useNavigate } from 'react-router';

export const TransactionCard = ({
  transaction
}: {
  transaction: Transaction;
}) => {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col bg-gray-100 p-2 rounded-lg shadow-md'>
      <h2 className='text-lg font-semibold text-gray-800'>
        {transaction.mydate}
      </h2>
      <p
        className={`text-lg ${transaction.income ? 'text-pink-500' : 'text-green-500'}`}
      >
        {transaction.income ? 'Income' : 'Expense'}
      </p>
      <p className='text-gray-600'>{transaction.category}</p>
      <p
        className={`${transaction.income ? 'text-pink-800' : 'text-lime-600'}`}
      >
        ${transaction.amount.toFixed(2)}
      </p>
      <p className='text-gray-600'>{transaction.mydate}</p>
      <button
        className='bg-blue-500 text-white px-4 py-2 rounded-lg mt-2'
        onClick={() => navigate(`/transaction/${transaction.id}`)}
      >
        Edit
      </button>
    </div>
  );
};
