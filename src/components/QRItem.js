import React from 'react';
import { PencilAltIcon } from '@heroicons/react/outline';

const Qritem = ({ data }) => {
  return (
    <div className="home-card p-6 text-center">

      <a href={data?.qrImgUrl} download={`${data?.title}.png`} className='text-xs font-medium text-gray-400 mb-1'>Download QR Image</a>
      <img src={data?.qrImgUrl} alt="" className="  max-h-52 " />
      <h2 className=" text-2xl mt-6">
        {data?.title}
      </h2>
      <button className="btn dark-bg text-gray-50 mt-3 flex items-center">
        <PencilAltIcon className='h-7 mr-3' />
        Edit QR Page
      </button>
      
    </div>
  );
}

export default Qritem;
