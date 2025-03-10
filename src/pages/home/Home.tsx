import { Link } from 'react-router';

export const Home = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-blue-50 p-6'>
      <div className='bg-white p-8 rounded-lg shadow-xl max-w-xl w-full text-center border border-gray-200'>
        <h1 className='text-4xl font-extrabold text-gray-800 mb-4'>
          Welcome to <span className='text-blue-600 '>Expense Tracker</span>
        </h1>
        <p className='text-lg text-gray-700 mb-6'>
          Manage your expenses efficiently and keep track of your financial
          health.
        </p>
        <Link to='/transaction'>
          <button className='px-8 py-4 bg-blue-600 text-white font-bold rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300'>
            Create transaction
          </button>
        </Link>
      </div>
    </div>
  );
};
