import React from 'react';
import Qritems from '../components/QRItems';
import Modal from '../components/Modal';


const Home = () => {
  return (
    <div className='mod-container'>
      <h1 className='text-3xl underline mb-5'>Your QRs</h1>
      <Qritems />
    </div>
  );
}

export default Home;
