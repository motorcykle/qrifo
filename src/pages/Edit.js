import React, { useEffect, useRef, useState } from 'react';
import { ArrowNarrowLeftIcon, ArrowNarrowUpIcon } from '@heroicons/react/outline';
import { useHistory, useParams } from 'react-router-dom';
import {EditorState} from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


const Edit = () => {
  const { qrpageid } = useParams();
  const history = useHistory();

  const [qrPage, setQrPage] = useState({
    id: "133",
    title: 'Airbnb Canyon Ranch Leave Instructions',
    editorState: {},
    timestamp: "6:08:48 AM",
    videoUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4",
    qrImgUrl: "https://miro.medium.com/max/990/1*FX_LPYdLaX1IPlohROEaQA.jpeg"
  });

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
    videoRef.current.load()
  }, [selectedFile]);

  useEffect(() => {
    console.log(editorState)
  }, [editorState]);

  return (
    <div className='mod-container relative'>
      <button onClick={goToTop} className="btn  fixed bottom-5 right-5">
        <ArrowNarrowUpIcon className='h-7' />
      </button>
      
      <header className='grid gap-2 grid-cols-10 items-center mb-3'>
        <button onClick={() => history.push('/')} className="py-2 border rounded-3xl col-span-2">
          <ArrowNarrowLeftIcon className='h-8 dark-color mx-auto' />
        </button>
        <h1 className='text-3xl text-center col-span-8  sm:col-span-6'>{qrPage?.title}</h1>
        <button className="btn dark-bg text-gray-50 col-span-full sm:col-span-2  ">
          Save changes
        </button>
      </header>

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
    </div>
  );
}

export default Edit;
