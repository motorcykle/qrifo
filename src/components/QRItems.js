import React, { useEffect, useState } from 'react';
import AddIcon from '../assets/add.png';
import Qritem from './QRItem';
import Modal from './Modal';
import { collection, query, where, onSnapshot, doc, orderBy } from "firebase/firestore";
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { db } from '../firebase';


const Qritems = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const user = useSelector(selectUser);
  const [qrPages, setQRPages] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "userPages", user.uid, "qrpages"), orderBy('timestamp', 'desc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => data.push({ id: doc.id, ...doc.data() }));
      setQRPages(data);
    });

    return unsubscribe;
  }, [user]);

  useEffect(() => console.log(qrPages), [qrPages])

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 py-6'>
      <Modal open={modalOpen} setOpen={setModalOpen} />
      <div onClick={() => setModalOpen(true)} className="home-card p-16 cursor-pointer" role="button" aria-label='add qr code'>
        <img src={AddIcon} alt="plus icon" className='opacity-40' />
        <small className='font-normal text-gray-400'>Create QR Page</small>
      </div>

      {qrPages.length > 0 && qrPages.map(QRItem => <Qritem key={QRItem.id} data={QRItem} />)}
    </div>
  );
}

export default Qritems;
