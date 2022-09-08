import React, { useState, useRef } from "react";
import dynamic from "next/dynamic";

const JoditEditor = dynamic(()=> import("jodit-react"),{
    ssr: false
})

export default function TextEditor({ content,setContent }) {
  const editor = useRef(null);

  // const [content, setContent] = useState("");
  const config = {
    readonly: false,
    height: 400,
    buttons: [
      // 'source',
      // '|',
      'bold',
      'italic',
      'underline',
      '|',
      'ul',
      'ol',
      '|',
      // 'font',
      // 'fontsize',
      'brush',
      // 'paragraph',
      '|',
      // 'image',
      'table',
      'link',
      '|',
      'left',
      'center',
      'right',
      'justify',
      '|',
      'undo',
      'redo',
      '|',
      'hr',
      // 'eraser',
      'fullsize',
      'preview'
  ],
  };
  const handleUpdate = (event) => {
    const editorContent = event?.target?.innerHTML || event;
    setContent(editorContent);
  };

  return (
    <div className="editor-container">
      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        onBlur={handleUpdate}
        onChange={(newContent) => {
          // console.log("JoditEditor onchange",newContent);
        }}
      />
      {/* <div className="jodit-wysiwyg" dangerouslySetInnerHTML={{ __html: content }} /> */}

      <style>{`
        .jodit-status-bar__item.jodit-status-bar__item-right a{
          display: none;
        }

      `}</style>
    </div>
  );
}