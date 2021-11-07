import React, { useEffect, useRef, useState } from 'react';
import { ArrowNarrowLeftIcon, ArrowNarrowUpIcon } from '@heroicons/react/outline';
import { useHistory, useParams } from 'react-router-dom';
import {convertFromRaw, convertToRaw, EditorState} from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db, storage } from '../firebase';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { ClipLoader } from 'react-spinners';
import { uploadString, ref, getDownloadURL, deleteObject } from '@firebase/storage';


const Edit = () => {
  // check if the id in docs of the user, to make sure the user edits own doc else redirect
  const user = useSelector(selectUser);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { qrpageid } = useParams();
  const history = useHistory();
  const [qrPage, setQrPage] = useState(null);

  const docRef = doc(db, 'userPages', user.uid, "qrpages", qrpageid);
  const [selectedFile, setSelectedFile] = useState(null);
  const filePickerRef = useRef(null);
  const videoRef = useRef(null);

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (newState) => {
    setEditorState(newState);
  }

  const addVideoAsSelected = (e) => {
    const reader = new FileReader();

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    }
  }

  const goToTop = () => window.scrollTo(0, 0);

  useEffect(() => {
    videoRef?.current?.load()
  }, [selectedFile, qrPage]);

  const getAndSetQRPage = async () => {
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setQrPage({ id: docSnap.id, ...docSnap.data() });
      setLoading(false);
    } else {
      console.log("No such document!");
      history.replace('/404')
    }
  }

  useEffect(() => {
    if (!qrpageid) return;

    getAndSetQRPage();
    
  }, [qrpageid]);

  useEffect(() => {
    if (!loading && qrPage?.editorState) {
      setEditorState(EditorState.createWithContent(convertFromRaw(qrPage?.editorState)))
    }
  }, [qrPage, loading]);

  const save = async () => {
    if (saving) return;

    setSaving(true);
    if (selectedFile) {
      const videoRef = ref(storage, `video/${user.uid}/${qrPage.id}`);

      if (qrPage.videoUrl) {
        deleteObject(videoRef).then(() => {
          // File deleted successfully
        }).catch((error) => {
          // Uh-oh, an error occurred!
          alert(error)
        });
      }

      try {
        await uploadString(videoRef, selectedFile, 'data_url').then(async snapshot => {
        const downloadURL = await getDownloadURL(videoRef);
        await updateDoc(docRef, {
            videoUrl: downloadURL,
            editorState: convertToRaw(editorState.getCurrentContent()),
            timestamp: serverTimestamp()
          })
        });

        setSelectedFile(null);
      } catch (error) {
        alert(error)
      }

    } else {
      await updateDoc(docRef, {
        editorState: convertToRaw(editorState.getCurrentContent()),
        timestamp: serverTimestamp()
      });
    }
    setSaving(false);
    getAndSetQRPage();
  }


  if (loading) return <div className='h-screen w-screen grid place-items-center'>
    <ClipLoader color="#1d1d1d" loading={loading} size={100} />
  </div>;

  return (
    <div className='mod-container relative'>
      <button onClick={goToTop} className="btn z-50 fixed bottom-5 right-5">
        <ArrowNarrowUpIcon className='h-7' />
      </button>
      
      <header className='grid gap-2 grid-cols-10 items-center mb-3'>
        <button onClick={() => history.push('/')} className="py-2 border rounded-3xl col-span-2">
          <ArrowNarrowLeftIcon className='h-8 dark-color mx-auto' />
        </button>
        <h1 className='text-3xl text-center col-span-8  sm:col-span-6'>{qrPage?.title}</h1>
        <button disabled={saving} onClick={save} className="btn dark-bg text-gray-50 col-span-full sm:col-span-2  ">
          Save
        </button>
      </header>

      {saving ? (
        <div className="p-4 grid place-items-center">
          <ClipLoader color="#1d1d1d" loading={saving} size={50} />
        </div>
      ) : (
        <>
        <div className="vidting">
          {(qrPage?.videoUrl || selectedFile) && 
            <video className='mx-auto' controls ref={videoRef} controlsList="nodownload">
              <source src={selectedFile ? selectedFile : qrPage?.videoUrl} />
            </video>
          }

            
          <input type="file" className='hidden' name="" id="" ref={filePickerRef} onChange={addVideoAsSelected} />
          
          {selectedFile ? (
            <button onClick={() => {
              setSelectedFile(null)
              goToTop();
            }} className="w-full p-6 bg-red-400 rounded-3xl my-3 text-center text-xl text-gray-50">
              Delete uploaded video
            </button>
          ) : (
            <button onClick={() => filePickerRef.current.click()} className="w-full p-6 bg-gray-100 rounded-3xl my-3 text-center text-xl text-gray-800">
              {qrPage?.videoUrl ? 'Upload different video' : 'Upload video'}
            </button>
          )}
        
        </div>

        <div className="py-1 relative">
          <Editor
            editorState={editorState}
            onEditorStateChange={onEditorStateChange}
            toolbarClassName=""
            editorClassName="bg-white shadow-lg border p-10 min-h-screen my-2"
          />
        </div>
        </>
      )}
    </div>
  );
}

export default Edit;
