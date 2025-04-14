import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { NavLink } from 'react-router';

export const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Navigation items array
  const navItems = [
    { name: 'Home', href: '/' },
    {
      name: 'Transactions',
      href: '#',
      submenu: [
        { name: 'All', href: '/transactions' },
        { name: 'New', href: '/transactions/new' }
      ]
    },
    {
      name: 'Settings',
      href: '/settings',
      submenu: [
        { name: 'Import Firestore', href: '/settings/importfs' },
        { name: 'Import', href: '/settings/import' },
        { name: 'Export', href: '/settings/export' }
      ]
    }
  ];

  return (
    <nav className='@container bg-gray-200 p-0 sm:p-4 mb-1 sticky top-0 z-50'>
      <ul className='hidden @md:flex space-y-2 @md:flex-row @md:space-y-0 @md:space-x-4'>
        {navItems.map((item) => (
          <li key={item.name} className='relative group'>
            <NavLink
              to={item.href}
              className={({ isActive }) => {
                return isActive
                  ? 'text-orange-500'
                  : 'block px-2 text-gray-800 hover:text-blue-600';
              }}
            >
              {item.name}
            </NavLink>
            {item.submenu && (
              <ul className='absolute left-0 hidden group-hover:block bg-white shadow-lg'>
                {item.submenu.map((subItem) => (
                  <li key={subItem.name}>
                    <NavLink
                      to={subItem.href}
                      className={({ isActive }) => {
                        return isActive
                          ? 'text-orange-500'
                          : 'block px-2 text-gray-800 hover:text-blue-600';
                      }}
                    >
                      {subItem.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
      <div className='@md:hidden'>
        <button
          className='group relative inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset'
          onClick={toggleMobileMenu}
          type='button'
        >
          <span className='absolute -inset-0.5' />
          <span className='sr-only'>Open main menu</span>
          <Bars3Icon
            aria-hidden='true'
            className={`size-5 ${isMobileMenuOpen ? 'hidden' : 'block'}`}
          />
          <XMarkIcon
            aria-hidden='true'
            className={`size-5 ${isMobileMenuOpen ? 'block' : 'hidden'}`}
          />
        </button>
        <ul
          className={`top-10 left-0 w-[55vw] bg-zinc-300  p-5 fixed h-dvh z-40 ease-in-out duration-300  ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          {navItems.map((item) => (
            <li key={item.name} className='mb-2'>
              <NavLink
                to={item.href}
                onClick={toggleMobileMenu}
                className={({ isActive }) => {
                  return isActive
                    ? 'text-orange-500'
                    : 'block px-2 text-gray-800 hover:text-blue-600';
                }}
              >
                {item.name}
              </NavLink>
              {item.submenu && (
                <ul className='ml-4'>
                  {item.submenu.map((subItem) => (
                    <li key={subItem.name}>
                      <NavLink
                        to={subItem.href}
                        onClick={toggleMobileMenu}
                        className={({ isActive }) => {
                          return isActive
                            ? 'text-orange-500'
                            : 'block px-2 text-gray-800 hover:text-blue-600';
                        }}
                      >
                        {subItem.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
