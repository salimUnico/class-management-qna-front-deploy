import React, { useEffect, useState, useRef } from "react";

import dynamic from 'next/dynamic'

const ReactQuill = dynamic(() => import('react-quill-with-table'), {
    ssr: false,
});
const QuillBetterTable = dynamic(() => import('quill-better-table'), {
    ssr: false,
});

import "react-quill-with-table/dist/quill.snow.css";
import "react-quill-with-table/dist/quill.bubble.css";

export default function App() {
    const editor = useRef();
    const [text, setText] = useState(``);


    const editorModules = {
        table: false, // disable table module
        // "better-table": {
        //     operationMenu: {
        //         items: {
        //             unmergeCells: {
        //                 text: "Another unmerge cells name"
        //             }
        //         }
        //     }
        // },
        // keyboard: {
        //     // bindings: QuillBetterTable.keyboardBindings
        // }
    };

    console.log("aaaaaaaa", text)
    return (
        <div className="App">
            <h1>Hello CodeSandbox</h1>
            <h2>Start editing to see some magic happen!</h2>
            <ReactQuill
                value={text}
                onChange={(value) => setText(value)}


                theme="snow" style={{ margin: "1rem 0" }}
                modules={{
                    table: false,
                    toolbar: [
                        [{ header: [1, 2, false] }],
                        ["bold", "italic", "underline", "strike", "blockquote"],
                        [{ list: "ordered" }, { list: "bullet" }],
                        [{ 'color': [] }, { 'background': [] }]
                    ]
                }}
                formats={[
                    "header",
                    "bold",
                    "italic",
                    "underline",
                    "strike",
                    "blockquote",
                    "list",
                    "bullet",
                    "indent",
                    "color",
                    "background"
                ]}

            />

        </div>
    );
}

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);
