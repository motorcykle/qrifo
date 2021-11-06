import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { app } from '../firebase';
import { CogIcon, LogoutIcon, SupportIcon } from '@heroicons/react/outline';

const Header = () => {
  const history = useHistory();
  const user = {};

  const direct = type => history.push(`/auth/${type}`);

  return (
    <header className=''>
      <nav className='mod-container flex items-center justify-between py-8'>

        <Link to="/">
          <h1 className='text-3xl font-medium flex items-center dark-color'>👁‍🗨 qrifo</h1>
        </Link>

        <div className="flex items-stretch">
          {user ? (
            <>
              <button onClick={signOut} className="btn flex items-center">
                <LogoutIcon className='h-6 mr-1' />
                <span className="hidden md:inline-block">Sign Out</span>
              </button>
              <button onClick={() => history.push('/contactsupport')} className='btn ml-3 flex items-center'>
                <SupportIcon className='h-6 mr-1' />
                <span className="hidden md:inline-block">Contact Support</span>
              </button>
            </>
          ) : (
            <>
              <button onClick={() => direct('signin')} className="btn">Sign In</button>
              <button onClick={() => direct('signup')} className="btn dark-bg text-gray-50 ml-3">Sign Up</button>
            </>
          )}
          

        </div>

      </nav>
    </header>
  );
}

export default Header;
