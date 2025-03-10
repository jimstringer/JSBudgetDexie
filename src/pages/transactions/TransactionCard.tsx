import Transaction from '../../models/Transaction';

export const TransactionCard = ({
  transaction
}: {
  transaction: Transaction;
}) => {
  return (
    <div className='flex flex-col bg-gray-100 p-2 rounded-lg shadow-md'>
      <h2 className='text-lg font-semibold text-gray-800'>
        {transaction.myDate}
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
      <p className='text-gray-600'>{transaction.myDate}</p>
    </div>
  );
};
