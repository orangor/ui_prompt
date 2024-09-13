import "./CoverCreator.less";
import React, { useState, useRef } from "react";

interface CoverCreatorProps {
  defaultText: string;
}

const CoverCreator: React.FC<CoverCreatorProps> = ({ defaultText }) => {
  const [displayImage, setDisplayImage] = useState<string>("");
  const [text, setText] = useState<string>(defaultText);
  const textRef = useRef<HTMLDivElement | null>(null);
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

  const handleTextChange = () => {
    if (textRef.current) {
      setText(textRef.current.innerText);
    }
  };

  return (
    <div className="cover-creator">
      <div
        ref={textRef}
        className="text-section"
        contentEditable={true}
        onBlur={handleTextChange}
        suppressContentEditableWarning={true}
      >
        {text}
      </div>
      <div
        className="image-section"
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        {displayImage && <img src={displayImage} alt="Cover Image" />}
        <input 
          type="file" 
          ref={fileInputRef} 
          style={{ display: 'none' }} 
          onChange={handleImageChange} 
          accept="image/*" 
        />
      </div>
    </div>
  );
};

export { CoverCreator };
