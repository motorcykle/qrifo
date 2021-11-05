import React from 'react';
import { useHistory } from 'react-router-dom';

const Landing = () => {
  const history = useHistory();

  return (
    <main className='relative overflow-hidden w-screen flex-1 dark-color grid place-items-center'>
      <h1 className="text-9xl absolute top-0 whitespace-nowrap font-black opacity-5 -z-10">
        rules, instructions, messages <br />
        <span className=" ml-80">
          or any info - make it electronic 
        </span>
      </h1>
      <div className="flex items-center flex-col py-10 px-3 sm:text-center">
        <p className="text-4xl sm:text-7xl font-bold">
          rules, instructions, messages <br className='hidden md:inline-block' />
          or any info - make it electronic 
        </p>
        
        <p className='sm:text-2xl max-w-3xl mt-7 mb-14 opacity-70 leading-9'>
          with qrifo we use the most complicated technologies of all: the QR code to digitalize static, unsustainable and limited texts 
        </p>

        <div className="flex flex-col">
          <button onClick={() => history.push('/auth/signin')} className="btn dark-bg text-gray-50 mb-3">Generate a QR code</button>
          <small className=' text-gray-500 '>Want an idea? Turn text instructions to a video 😉</small>
        </div>
      </div>
      


    </main>
  );
}

export default Landing;
