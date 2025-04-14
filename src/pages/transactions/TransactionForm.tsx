import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { db } from '../../models/db';
import { Field, Label, Switch } from '@headlessui/react';
import { TransactionType } from '../../models/Category';
import Category from '../../models/Category';

export const TransactionForm: React.FC = () => {
  const [formData, setFormData] = useState({
    Categoryid: 0,
    Amount: '',
    Date: '',
    Comment: ''
  });

  const [income, setIncome] = useState(false);
  const [incomeCategories, setIncomeCategories] = useState<Category[]>([]);
  const [expenseCategories, setExpenseCategories] = useState<Category[]>([]);

  const { Categoryid, Amount, Date, Comment } = formData;

  const navigate = useNavigate();
  const { tid } = useParams();

  const [formLabels, setFormLabels] = useState({
    tType: 'Expense',
    tAction: 'Create'
  });

  const getMyDateFormat = (strdate: string) => {
    const dateParts = strdate.split('-');
    return Number(`${dateParts[0]}${dateParts[1]}${dateParts[2]}`);
  };

  useEffect(() => {
    const fetchTransaction = async (tid: string | number) => {
      const transaction = await db.transactions.get(+tid);

      if (transaction !== undefined) {
        setFormData({
          Categoryid: transaction.categoryId,
          Amount: transaction.amount.toString(),
          Date: transaction.strdate,
          Comment: transaction.comment
        });
        setIncome(transaction.type === TransactionType.INCOME);
      }
    };
    const fetchCategories = async () => {
      const categories = await db.categorys.toArray();
      setIncomeCategories(
        categories.filter(
          (category) => category.type === TransactionType.INCOME
        )
      );
      setExpenseCategories(
        categories.filter(
          (category) => category.type === TransactionType.EXPENSE
        )
      );
    };
    fetchCategories();

    if (tid) {
      setFormLabels({
        tType: 'Edit',
        tAction: 'Update'
      });
      fetchTransaction(tid);
    }
  }, [tid]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      Categoryid: +value
    });
  };
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleIncomeChange = (checked: boolean) => {
    setIncome(checked);
    if (checked) {
      //   setSelectCategories(incomeCategories);
    } else {
      //   setSelectCategories(expenseCategories);
    }
  };

  const handlecreation = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!Categoryid || !Amount || !Date) {
      alert('Please fill out all fields.');
      return;
    }
    const category = Categoryid;
    const amount = +Amount;
    const mydate = getMyDateFormat(Date);
    const strdate = Date;
    const comment = Comment;
    const type = income ? TransactionType.INCOME : TransactionType.EXPENSE;
    if (tid) {
      db.transactions.update(+tid, {
        categoryId: category,
        amount,
        mydate,
        type,
        year: +mydate.toString().slice(0, 4),
        yearmonth: +mydate.toString().slice(0, 6),
        strdate,
        comment
      });
      navigate('/transactions');
      return;
    } else {
      db.transactions.add({
        categoryId: category,
        amount,
        mydate,
        type,
        year: +mydate.toString().slice(0, 4),
        yearmonth: +mydate.toString().slice(0, 6),
        strdate,
        comment
      });
      navigate('/transactions');
    }
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
              {formLabels.tAction} {income ? ' Income' : ' Expense'}
            </h1>
          </div>
        </div>
        <form onSubmit={handlecreation} className='space-y-6'>
          <Field>
            <Label
              className='block text-gray-700 font-medium mb-2'
              htmlFor='income'
            >
              Turn On To Enter Income
            </Label>
            <Switch
              name='income'
              id='income'
              checked={income}
              onChange={handleIncomeChange}
              className='group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-[checked]:bg-blue-600'
            >
              <span className='size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6' />
            </Switch>
          </Field>
          <div>
            <label
              className='block text-gray-700 font-medium mb-2'
              htmlFor='Category'
            >
              Enter Category
            </label>
            <select
              name='Category'
              id='Category'
              value={Categoryid}
              onChange={handleSelectChange}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            >
              <option value=''>Select Category</option>
              {income
                ? incomeCategories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))
                : expenseCategories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
            </select>
          </div>
          <div>
            <label
              className='block text-gray-700 font-medium mb-2'
              htmlFor='Amount'
            >
              Enter Amount ($)
            </label>
            <input
              type='number'
              name='Amount'
              id='Amount'
              value={Amount}
              onChange={handleChange}
              placeholder='Amount'
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>
          <div>
            <label
              className='block text-gray-700 font-medium mb-2'
              htmlFor='Date'
            >
              Select Date
            </label>
            <input
              type='date'
              name='Date'
              id='Date'
              value={Date}
              onChange={handleChange}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>
          <div>
            <label
              className='block text-gray-700 font-medium mb-2'
              htmlFor='Comment'
            >
              Enter Comment
            </label>
            <input
              type='text'
              name='Comment'
              id='Comment'
              value={Comment}
              onChange={handleChange}
              placeholder='Enter comment'
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
