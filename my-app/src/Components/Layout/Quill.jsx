import React from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function Quill({jobDescription,setJobDescription}) {
  

  return (
    <ReactQuill theme="snow"  defaultValue={jobDescription} onChange={setJobDescription}>

      
    </ReactQuill>
  );
}