import React from 'react';
import { PencilAltIcon } from '@heroicons/react/outline';
import { useHistory } from 'react-router-dom';

const Qritem = ({ data }) => {
  const history = useHistory();

  return (
    <div className="home-card p-6 text-center">

      
      <img src={data?.qrImgUrl} alt="" className="  max-h-52 " />
      <a href={data?.qrImgUrl} download={`${data?.title}.png`} className='text-xs font-medium text-gray-400 mt-1'>Download QR Image</a>
      <h2 className=" text-2xl my-2">
        {data?.title}
      </h2>
      <button onClick={() => history.push(`/edit/${data.id}`)} className="btn dark-bg text-gray-50 mt-3 flex items-center">
        <PencilAltIcon className='h-7 mr-3' />
        Edit QR Page
      </button>
      
    </div>
  );
}

export default Qritem;
