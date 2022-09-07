import React, { useState, useRef } from "react";
import dynamic from "next/dynamic";

const JoditEditor = dynamic(()=> import("jodit-react"),{
    ssr: false
})

export default function App() {
  const editor = useRef(null);

  const [content, setContent] = useState("Start writing");
  const config = {
    readonly: false,
    height: 400
  };
  const handleUpdate = (event) => {
    const editorContent = event?.target?.innerHTML;
    setContent(editorContent);
  };

  return (
    <div className="App">
      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        onBlur={handleUpdate}
        onChange={(newContent) => {}}


      />
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}