// components/CustomEditor.js
'use client'; // Required in App Router
import React, { useState, useEffect, useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'; // Or your chosen build

const TocCustomEditor = ({ id, label, initialData, onChange, required, errmsg = '' }) => {
    const editorRef = useRef();
    const [editorLoaded, setEditorLoaded] = useState(false);

    useEffect(() => {
        // This ensures CKEditor is loaded only on the client-side
        editorRef.current = {
        CKEditor: require('@ckeditor/ckeditor5-react').CKEditor,
        ClassicEditor: require('@ckeditor/ckeditor5-build-classic').default,
        };
        setEditorLoaded(true);
    }, [])

    return editorLoaded ? (
        <>
            {/* <h2 className='pt-5 pb-2 font-semibold'>{label}</h2> */}
            <label htmlFor={id} className="block text-gray-700 text-sm font-bold mb-2">
                {label} {required && <span className='text-red-700'>*</span>}
            </label>
            <CKEditor
            editor={ClassicEditor}
            data={initialData}
            onReady={(editor) => {
                // You can store the "editor" instance and use it later if needed
                console.log('Editor is ready to use!', editor);
            }}
            onChange={(event, editor) => {
                const data = editor.getData();
                onChange(data); // Pass the updated data to the parent component
            }}
            onBlur={(event, editor) => {
                console.log('Blur.', editor);
            }}
            onFocus={(event, editor) => {
                console.log('Focus.', editor);
            }}
            />
            {errmsg && <hint className="text-red-700">{errmsg}</hint>}

        </>
    ) : (
        <div>Loading editor...</div>
    )
};

export default TocCustomEditor;