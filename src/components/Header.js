import React from 'react';
import { Link } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { app } from '../firebase';
import { CogIcon } from '@heroicons/react/outline';

const Header = () => {
  const user = {};

  return (
    <header className=''>
      <nav className='mod-container flex items-center justify-between py-8'>

        <Link to="/">
          <h1 className='text-3xl font-medium flex items-center dark-color'>👁‍🗨 qrifo</h1>
        </Link>

        <div className="flex items-stretch">
          {user ? (
            <>
              <button className="btn">Sign Out</button>
              <button className='btn ml-3'>
                <CogIcon className='h-6 dark-color' />
              </button>
            </>
          ) : (
            <>
              <button className="btn">Sign In</button>
              <button className="btn dark-bg text-gray-50 ml-3">Sign Up</button>
            </>
          )}
          

        </div>

      </nav>
    </header>
  );
}

export default Header;
