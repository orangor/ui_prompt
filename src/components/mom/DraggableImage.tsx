import React from 'react';
import Draggable from 'react-draggable';

interface DraggableImageProps {
  src: string;
  onClick: () => void;
}

const DraggableImage: React.FC<DraggableImageProps> = ({ src, onClick }) => {
  return (
    <Draggable>
      <img
        src={src}
        alt="draggable-display"
        onClick={onClick}
        style={{ maxWidth: '100%', borderRadius: '10px', position: 'absolute', cursor: 'pointer' }}
      />
    </Draggable>
  );
};

export default DraggableImage;
