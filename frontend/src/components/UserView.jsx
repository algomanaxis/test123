import { useEffect } from 'react';
import { useState } from 'react';
import { Worker } from '@react-pdf-viewer/core';
// Import the main component
import { Viewer } from '@react-pdf-viewer/core';
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';




const UserView = () => {

    const [url, setUrl] = useState(null);  
    useEffect(() => {
      const searchParams = new URLSearchParams(window.location.search);
      const url = searchParams.get('url');          
      setUrl(url);
    }, []);


  
  useEffect(() => {
    const handleContextmenu = e => {
        e.preventDefault()
    }
    document.addEventListener('contextmenu', handleContextmenu)
    return function cleanup() {
        document.removeEventListener('contextmenu', handleContextmenu)
    }
  }, [ ])

  


  return <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
    <div
      style={{
          border: '1px solid rgba(0, 0, 0, 0.3)',
          height: '810px',
          width:'1080px',
          marginLeft : '20%',
          marginTop :'1%',    
      }}
    >
      {/* <h1>{url}</h1> */}
        <Viewer fileUrl={"./images/" + url}  />  
        {/* <Viewer fileUrl={fileName} />    */}
        {/* <iframe src={url+"#toolbar=0"} frameborder="0" width="100%" height="100%"></iframe>   */}
    
</div>
  </Worker>;
};

export default UserView;
