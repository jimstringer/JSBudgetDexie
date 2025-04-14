import { useConfirmAlert } from '../../hooks/UseConfirmAlert';
import { TransactionType } from '../../models/Category';
import { db } from '../../models/db';
//import Transaction from '../../models/Transaction';
import { useNavigate } from 'react-router';

interface TransactionCardProps {
  category: string | undefined;
  id?: number;
  categoryId: number;
  amount: number;
  mydate: number;
  strdate: string;
  year: number;
  yearmonth: number;
  type: TransactionType;
  comment: string;
}

export const TransactionCard = ({
  transaction
}: {
  transaction: TransactionCardProps;
}) => {
  const navigate = useNavigate();
  const { showAlert } = useConfirmAlert();

  const handleDelete = async () => {
    if (transaction.id !== undefined) {
      await db.transactions.delete(transaction.id);
    } else {
      console.error('Book ID is undefined, cannot delete.');
    }
    console.log('Book deleted with id:', transaction.id);
  };
  const handleDeleteClick = () => {
    showAlert({
      title: 'Are you sure?',
      confirmMessage: 'This action cannot be undone.',
      onConfirm: async () => {
        await handleDelete();
      }
    });
  };

  return (
    <div className='flex flex-col bg-gray-100 p-2 rounded-lg shadow-md'>
      <div className='flex flex-row justify-center mx-2'>
        <h2 className='text-lg font-semibold text-gray-800'>
          {transaction.strdate}
        </h2>
      </div>

      <div className='flex flex-row justify-center mx-2'>
        <p
          className={`text-lg ${transaction.type === TransactionType.INCOME ? 'text-pink-500' : 'text-green-500'}`}
        >
          {transaction.type === TransactionType.INCOME ? 'Income' : 'Expense'}
        </p>
      </div>

      <div className='flex flex-row justify-center mx-2'>
        <p className='text-gray-600'>{transaction.category}</p>
      </div>

      <div className='flex flex-row justify-center mx-2'>
        <p
          className={`${transaction.type === TransactionType.INCOME ? 'text-pink-800' : 'text-lime-600'}`}
        >
          ${transaction.amount.toFixed(2)}
        </p>
      </div>

      <div className='flex flex-row justify-center mx-2'>
        <p className='text-gray-600'>{transaction.comment}</p>
      </div>
      <div className='flex flex-row justify-center mx-2'>
        <button
          className='bg-blue-500 text-white w-28 rounded-lg mr-2 mt-2'
          onClick={() => navigate(`/transactions/edit/${transaction.id}`)}
        >
          Edit
        </button>
        <button
          className='bg-red-500 text-white w-28 rounded-lg mt-2'
          onClick={handleDeleteClick}
          type='button'
          aria-label='Delete transaction'
          title='Delete transaction'
        >
          Delete
        </button>
      </div>
    </div>
  );
};
