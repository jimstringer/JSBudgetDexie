import { createHashRouter } from 'react-router';
import { Home } from './pages/home/Home';
import { Export } from './pages/settings/Export';
import { Import } from './pages/settings/Import';
import { TransactionForm } from './pages/transactions/TransactionForm';
import { TransactionList } from './pages/transactions/TransacttionList';
import { Layout } from './layouts/Layout';
import { ImportFSJson } from './pages/settings/ImportFSJson';
import { PageNotFound } from './pages/error/PageNotFound';

export const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, Component: Home },
      {
        path: 'transactions',
        children: [
          { index: true, Component: TransactionList },
          { path: 'edit/:tid?', Component: TransactionForm },
          { path: 'new', Component: TransactionForm }
        ]
      },
      {
        path: 'settings',
        children: [
          { path: 'export', Component: Export },
          { path: 'import', Component: Import },
          { path: 'importfs', Component: ImportFSJson }
        ]
      }
    ]
  },
  { path: '*', Component: PageNotFound } // Fallback route
]);
