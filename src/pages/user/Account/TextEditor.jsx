import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function TextEditor() {
  const [formValues, setFormValues] = useState({
    content: "", // Initialize content state
  });

  // Handle change event for ReactQuill
  const handleContentChange = (content, delta, source, editor) => {
    setFormValues({ ...formValues, content: editor.getHTML() });
  };

  const handlePost = () => {
    // Access content from formValues
    console.log("Content:", formValues.content);
    // Other logic for posting the blog
  };

  return (
    <div>
      <ReactQuill
        theme="snow"
        onChange={handleContentChange}
        className="mb-3"
        placeholder="Write your content here..."
      />
      <button onClick={handlePost}>Post</button>
      {/* Display content at the bottom */}
      <div dangerouslySetInnerHTML={{ __html: formValues.content }}></div>
    </div>
  );
}

export default TextEditor;
