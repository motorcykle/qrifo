import { ArrowNarrowLeftIcon } from '@heroicons/react/outline';
import React from 'react';
import { useHistory } from 'react-router-dom';

const ContactSupport = () => {
  const history = useHistory();

  return (
    <div className='mod-container'>
      <header>
        <button onClick={() => history.push('/')} className="py-2 px-8 border rounded-3xl">
          <ArrowNarrowLeftIcon className='h-8 dark-color' />
        </button>
      </header>
    
      contact support
    </div>
  );
}

export default ContactSupport;
