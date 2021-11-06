import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

const Qrpage = () => {
  const { qrpageid } = useParams();

  const [qrPage, setQrPage] = useState();

  useEffect(() => {
    console.log(qrpageid, qrPage)
  }, [qrPage, qrpageid])

  return (
    <div className='mod-container'>
      <p>qr page</p>
    </div>
  );
}

export default Qrpage;
