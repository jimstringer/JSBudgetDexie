import { Routes, Route } from 'react-router';
import { Home } from './pages/home/Home';
import { Layout } from './layouts/Layout';
import { TransactionList } from './pages/transactions/TransacttionList';
import { TransactionForm } from './pages/transactions/TransactionForm';
import { ImportFSJson } from './pages/settings/ImportFSJson';

function AppOld() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='transactions' element={<TransactionList />} />
          <Route path='loadjson' element={<ImportFSJson />} />
          <Route path='*' element={<NoMatch />} />
        </Route>
        <Route>
          <Route path='transaction/:tid?' element={<TransactionForm />} />
        </Route>
      </Routes>
    </>
  );
}

const NoMatch = () => {
  return <p>There's nothing here: 404!</p>;
};

export default AppOld;
