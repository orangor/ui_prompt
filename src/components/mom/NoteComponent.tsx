import React, { useRef, useState } from "react";
import "./NoteComponent.less";

interface NoteProps {
  defaultTitle: string;
  defaultContent: string;
}

const NoteComponent: React.FC<NoteProps> = ({ defaultTitle, defaultContent }) => {
  const [title, setTitle] = useState(defaultTitle);
  const [content, setContent] = useState(defaultContent);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const handleTitleChange = () => {
    if (titleRef.current) {
      setTitle(titleRef.current.innerText);
    }
  };

  const handleContentChange = () => {
    if (contentRef.current) {
      setContent(contentRef.current.innerText);
    }
  };

  return (
    <div className="note-container">
      <div
        ref={titleRef}
        className="note-title"
        contentEditable={true}
        onBlur={handleTitleChange}
        suppressContentEditableWarning={true}
      >
        {title}
      </div>
      <div
        ref={contentRef}
        className="note-content"
        contentEditable={true}
        onBlur={handleContentChange}
        suppressContentEditableWarning={true}
      >
        {content}
      </div>
    </div>
  );
};


export {NoteComponent} ;
