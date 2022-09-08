import React, { useState, useRef } from "react";
import dynamic from "next/dynamic";

const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false
})

// interface TextEditorProps {
//   content: string,
//   setContent: (e) => any,
//   customConfig?: object
// }

export default function TextEditor(props: { content: string, setContent: any, customConfig?: object }) {
  const { content, setContent, customConfig } = props;

  const editor = useRef();

  // const [content, setContent] = useState("");
  const config = {
    height: 400,
    width: "auto",
    toolbarAdaptive: false,
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
    ...customConfig
  };
  const handleUpdate = (event) => {
    const editorContent = event?.target?.innerHTML || event;
    setContent(editorContent);
  };

  return (
    <div className="editor-container">
      <JoditEditor
        // ref={editor}
        value={content}
        config={config}
        onBlur={handleUpdate}
        // onChange={(newContent) => {
        //   console.log("JoditEditor onchange",newContent);
        // }}
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