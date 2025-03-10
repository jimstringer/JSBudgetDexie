import { useState } from 'react';
import { useNavigate } from 'react-router';
import { db } from '../../models/db';
import { Field, Label, Switch } from '@headlessui/react';

export const TransactionForm: React.FC = () => {
  const [formData, setFormData] = useState({
    Category: '',
    Amount: '',
    Date: ''
  });

  const [income, setIncome] = useState(false);

  const { Category, Amount, Date } = formData;

  const navigate = useNavigate();

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handlecreation = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!Category || !Amount || !Date) {
      alert('Please fill out all fields.');
      return;
    }
    const category = Category;
    const amount = +Amount;
    const myDate = Date;
    db.transactions.add({ category, amount, myDate, income });
    navigate('/transactions');
  };

  return (
    <div className='flex bg-gray-100 items-center justify-center'>
      <div className='bg-white p-2 sm:p-8 rounded-lg shadow-lg w-full max-w-md'>
        <div
          className='flex items-center justify-between mb-2'
          onClick={() => navigate('/transactions')}
        >
          <div className='flex-none'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 16 16'
              fill='currentColor'
              className='hi-micro hi-chevron-left inline-block size-8'
            >
              <path
                fillRule='evenodd'
                d='M9.78 4.22a.75.75 0 0 1 0 1.06L7.06 8l2.72 2.72a.75.75 0 1 1-1.06 1.06L5.47 8.53a.75.75 0 0 1 0-1.06l3.25-3.25a.75.75 0 0 1 1.06 0Z'
                clipRule='evenodd'
              />
            </svg>
          </div>
          <div className='flex-2 w-full'>
            <h1 className='text-3xl font-bold text-gray-800 text-center'>
              Create {income ? 'Income' : 'Expense'}
            </h1>
          </div>
        </div>
        <form onSubmit={handlecreation} className='space-y-6'>
          <Field>
            <Label className='block text-gray-700 font-medium mb-2'>
              Turn On To Enter Income
            </Label>
            <Switch
              name='income'
              checked={income}
              onChange={setIncome}
              className='group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-[checked]:bg-blue-600'
            >
              <span className='size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6' />
            </Switch>
          </Field>
          <div>
            <label className='block text-gray-700 font-medium mb-2'>
              Enter Category
            </label>
            <input
              type='text'
              name='Category'
              value={Category}
              onChange={handleChange}
              placeholder='Enter details'
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>
          <div>
            <label className='block text-gray-700 font-medium mb-2'>
              Enter Amount ($)
            </label>
            <input
              type='number'
              name='Amount'
              value={Amount}
              onChange={handleChange}
              placeholder='Amount'
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>
          <div>
            <label className='block text-gray-700 font-medium mb-2'>
              Select Date
            </label>
            <input
              type='date'
              name='Date'
              value={Date}
              onChange={handleChange}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>
          <button
            type='submit'
            className='w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300'
          >
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  );
};
