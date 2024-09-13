import React, { useState, useRef } from "react";
import "./DisplayCard.less";

interface DisplayCardProps {
  defaultTitle: string;
  defaultContent: string;
}

const DisplayCard: React.FC<DisplayCardProps> = ({ defaultTitle, defaultContent }) => {
  const [title, setTitle] = useState(defaultTitle);
  const [content, setContent] = useState(defaultContent);
  const [displayImage, setDisplayImage] = useState<string>("");
  const titleRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length) {
      setDisplayImage(URL.createObjectURL(files[0]));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setDisplayImage(URL.createObjectURL(file));
    }
  };

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
    <div className="display-card">
      <div
        ref={titleRef}
        className="text-section"
        contentEditable={true}
        onBlur={handleTitleChange}
        suppressContentEditableWarning={true}
      >
        {title}
      </div>
      <div
        className="image-section"
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        {displayImage && <img src={displayImage} alt="Card Image" />}
        <input 
          type="file" 
          ref={fileInputRef} 
          style={{ display: 'none' }} 
          onChange={handleImageChange} 
          accept="image/*" 
        />
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

export { DisplayCard };
