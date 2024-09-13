import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { Resizable } from 'react-resizable';
import 'react-resizable/css/styles.css';
import './TextContainer.less';
import { MOM_TEXT } from "../../const/const";

interface EditableTextProps {
  mom_text: MOM_TEXT;
  onTextChange: (text: string) => void;
}

const EditableText: React.FC<EditableTextProps> = ({ mom_text, onTextChange }) => {
  const [width, setWidth] = useState(200);
  const [height, setHeight] = useState(100);

  return (
    <Draggable handle=".drag-handle">
      <div style={{ position: 'absolute', width, height }}>
        <Resizable
          width={width}
          height={height}
          axis="both"
          onResize={(event, { size }) => {
            setWidth(size.width);
            setHeight(size.height);
          }}
        >
          <div className="resizable-container">
            <div className="drag-handle" />
            <div
              className={mom_text.text_node.type}
              contentEditable={true}
              onBlur={(e) => onTextChange((e.target as HTMLDivElement).innerText)}
              dangerouslySetInnerHTML={{ __html: mom_text.text }}
            />
          </div>
        </Resizable>
      </div>
    </Draggable>
  );
};

export default EditableText;
