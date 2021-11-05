import React, { useState } from 'react';
import { ArrowNarrowLeftIcon } from '@heroicons/react/outline';
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
    videoUrl: "",
    qrImgUrl: "https://miro.medium.com/max/990/1*FX_LPYdLaX1IPlohROEaQA.jpeg"
  });

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (newState) => {
    setEditorState(newState);
  }

  return (
    <div className='mod-container relative'>
      <header className='flex items-center justify-between mb-3'>
        <button onClick={() => history.push('/')} className="py-2 px-8 border rounded-3xl">
          <ArrowNarrowLeftIcon className='h-8 dark-color' />
        </button>
        <h1 className='text-3xl max-w-xl text-center'>{qrPage.title}</h1>
        <button className="btn dark-bg text-gray-50">Save changes</button>
      </header>

      <div className="vidting">
        {qrPage.videoUrl && <h1>Video thumbnail</h1>}
        upload vid
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
