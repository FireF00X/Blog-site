import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


// Define a custom format for the color button
const ColorStyle = ReactQuill.Quill.import('attributors/style/color');
ReactQuill.Quill.register(ColorStyle, true);

var toolbarOptions = ['size', 'bold', 'list', 'color', 'link', 'italic', 'underline', 'strike'];

const ReactQuillInput = ({ value, setValue }) => {

  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={setValue}
      formats={toolbarOptions}
      modules={{
        toolbar: [
          [{ 'size': ['small', false, 'large', 'huge'] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ color: [] }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['link'],
        ],
      }}
    />
  );

}

export default ReactQuillInput;