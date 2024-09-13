import React, { useState, useCallback, forwardRef, useImperativeHandle } from 'react';
import Draggable from 'react-draggable';
import EditableText from './EditableText';
import DraggableImage from './DraggableImage';
import   {MOM_TEXT,ORDINALS } from "../../const/const"
interface BeautifulDisplayProps {
  initialText?: MOM_TEXT;
}

export interface BeautifulDisplayHandle {
  addText: (text: MOM_TEXT) => void;
  deleteText: (index: number) => void;
}

const BeautifulDisplay = forwardRef<BeautifulDisplayHandle, BeautifulDisplayProps>(({ initialText   = {text_node:ORDINALS.FIRST,text:"新的内容"}  }, ref) => {
  const [texts, setTexts] = useState<MOM_TEXT[]>([initialText]);
  const [images, setImages] = useState<string[]>([]);
  
  useImperativeHandle(ref, () => ({
    addText: (text: MOM_TEXT) => setTexts((prev) => [...prev, text]),
    deleteText: (index: number) => setTexts((prev) => prev.filter((_, i) => i !== index)),
  }));
  
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); 
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        setImages((prev) => [...prev, e.target?.result as string]);
      };
      reader.readAsDataURL(file);
    }
  }, []);
  
  const handleImageClick = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const style: React.CSSProperties = {
    padding: '20px',
    backgroundColor: '#fff5e1',
    border: '1px solid #eee',
    borderRadius: '10px',
    textAlign: 'center',
    color: '#333',
    overflow: 'hidden',
    position: 'relative',
    height:'100%',
    width:'100'
  };

  return (
    <div style={style} onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
      {texts.map((mom_text, index) => (
        <Draggable key={index}>
          <EditableText mom_text={mom_text} onTextChange={(newText) => setTexts(prev => prev.map((t, i) => i ===index ?{text_node:t.text_node,text:newText }  : t))} />
        </Draggable>
      ))}
      {images.map((src, index) => (
        <DraggableImage key={index} src={src} onClick={() => handleImageClick(index)} />
      ))}
    </div>
  );
});

export default BeautifulDisplay;
