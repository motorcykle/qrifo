import React, { useState } from 'react';
import AddIcon from '../assets/add.png';
import Qritem from './QRItem';
import Modal from './Modal';


const Qritems = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const data = [
    {
      id: "133",
      title: 'Airbnb Canyon Ranch Leave Instructions',
      editorState: {},
      timestamp: "6:08:48 AM",
      videoUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4",
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
      <Modal open={modalOpen} setOpen={setModalOpen} />
      <div onClick={() => setModalOpen(true)} className="home-card p-16 cursor-pointer" role="button" aria-label='add qr code'>
        <img src={AddIcon} alt="plus icon" className='opacity-40' />
        <small className='font-normal text-gray-400'>Create QR Page</small>
      </div>

      {data.length > 0 && data.map(QRItem => <Qritem key={QRItem.id} data={QRItem} />)}
    </div>
  );
}

export default Qritems;
