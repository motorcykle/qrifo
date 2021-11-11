import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { ClipLoader } from 'react-spinners';
import { convertFromRaw, EditorState } from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';
import parse from 'html-react-parser';
import ReactPlayer from 'react-player';

const Qrpage = () => {
  const { qrpageid } = useParams();
  const history = useHistory();
  const [loading, setLoading] = useState();
  const [qrPage, setQrPage] = useState();
  const [here, setHere] = useState('');

  const getAndSetQRPage = async () => {
    const docRef = doc(db, 'pages', qrpageid);
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
    if (qrPage && qrPage?.editorState) {
      let html1 = stateToHTML(convertFromRaw(qrPage.editorState));
      setHere(html1)
    }
    
  }, [qrPage]);

  if (loading) return <div className='h-screen w-screen grid place-items-center'>
    <ClipLoader color="#1d1d1d" loading={loading} size={100} />
  </div>;

  return (
    <div className='mod-container prose'>
      {qrPage?.videoUrl && <div className='w-full grid place-items-center mb-16'>
        <ReactPlayer controls url={qrPage.videoUrl} />
      </div>}

      {parse(here)}
    </div>
  );
}

export default Qrpage;
