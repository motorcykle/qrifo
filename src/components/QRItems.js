import React from 'react';
import AddIcon from '../assets/add.png';
import Qritem from './QRItem';

const Qritems = () => {
  const data = [
    {
      id: "133",
      title: 'Airbnb Canyon Ranch Leave Instructions',
      editorState: {},
      timestamp: "6:08:48 AM",
      videoUrl: "",
      qrImgUrl: "https://miro.medium.com/max/990/1*FX_LPYdLaX1IPlohROEaQA.jpeg"
    }, 
    {
      id: "1333",
      title: 'Airbnb Canyon Ranch Welcome',
      editorState: {},
      timestamp: "6:08:48 AM",
      videoUrl: "",
      qrImgUrl: "https://miro.medium.com/max/990/1*FX_LPYdLaX1IPlohROEaQA.jpeg"
    }, 
    {
      id: "13333",
      title: 'Airbnb Canyon Ranch Stay Rules',
      editorState: {},
      timestamp: "6:08:48 AM",
      videoUrl: "",
      qrImgUrl: "https://miro.medium.com/max/990/1*FX_LPYdLaX1IPlohROEaQA.jpeg",
      qrImgBase64: ''
    }, 
  ];

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 py-6'>
      <div className="home-card p-16 cursor-pointer" role="button" aria-label='add qr code'>
        <img src={AddIcon} alt="plus icon" className='opacity-40' />
        <small className='font-normal text-gray-400'>Create QR</small>
      </div>

      {data.length > 0 && data.map(QRItem => <Qritem data={QRItem} />)}
    </div>
  );
}

export default Qritems;
