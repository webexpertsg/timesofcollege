// components/CustomEditor.js
'use client'; // Required in App Router

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'; // Or your chosen build

const TocCustomEditor = ({ data, onChange }) => {
    return (
    <CKEditor
        editor={ClassicEditor}
        data={data}
        onReady={(editor) => {
        // Editor is ready, you can access the editor instance here
        console.log('Editor is ready to use!', editor);
        }}
        onChange={(event, editor) => {
        const data = editor.getData();
        onChange(data); // Pass the updated data to the parent component
        }}
        // Add other configuration options as needed
    />
    );
};

export default TocCustomEditor;