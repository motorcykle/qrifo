/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { QrcodeIcon } from '@heroicons/react/outline'
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import QRCode from 'qrcode';
import { addDoc, collection, serverTimestamp, updateDoc, doc } from '@firebase/firestore';
import { ref, getDownloadURL, uploadString } from '@firebase/storage';
import { db, storage } from '../firebase';

export default function Modal({ open, setOpen }) {
  const user = useSelector(selectUser);
  const cancelButtonRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");

  const createQRPage = async () => {
    if (title.trim() && !loading) {
      setLoading(true);
      
      const base64 = await QRCode.toDataURL(`${process.env.REACT_APP_FB_URL}/page/13333`);

      const docRef = await addDoc(collection(db, "userPages", user.uid, "qrpages"), {
        title,
        editorState: {},
        timestamp: serverTimestamp(),
        videoUrl: "",
        qrImgUrl: "",
        qrImgBase64: base64
      });
  
      const imageRef = ref(storage, `qrs/${user.uid}/${docRef.id}/image`);
      
      await uploadString(imageRef, base64, 'data_url')
        .then(async snapshot => {
          const downloadURL = await getDownloadURL(imageRef);
          await updateDoc(doc(db, 'userPages', user.uid, "qrpages", docRef.id), {
            qrImgUrl: downloadURL
          })
        });
      
      setLoading(false);
      setTitle('');
      setOpen(false);
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={setOpen}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start ">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                    <QrcodeIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left flex-1">
                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900 my-2">
                      Create QR page
                    </Dialog.Title>
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      createQRPage();
                    }} className="w-full">
                      <input className='py-2 px-3 border rounded-3xl w-full' type="text" name="title" id="titleInput" placeholder='Choose a title...' required value={title} onChange={({target}) => setTitle(target.value)} />
                    </form>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-600 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={createQRPage}
                  disabled={loading}
                >
                  Create page
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setOpen(false)}
                  ref={cancelButtonRef}
                  disabled={loading}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
