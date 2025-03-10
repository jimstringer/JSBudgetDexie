import { Outlet } from 'react-router';
import { NavBar } from '../components/NavBar';

export const Layout = () => {
  return (
    <main className='container mx-auto px-1 bg-slate-500'>
      <NavBar />
      <Outlet />
    </main>
  );
};
