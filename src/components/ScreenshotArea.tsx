// ScreenshotArea.tsx

import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';

const ScreenshotArea: React.FC = ({ children }) => {
  const [width, setWidth] = useState<number>(720);  // 默认宽度
  const [height, setHeight] = useState<number>(960);  // 默认高度
  const [currentPage, setCurrentPage] = useState<number>(0);  // 当前页面索引

  const containerRef = useRef<HTMLDivElement>(null);

  const handleGenerateImage = async () => {
    if (containerRef.current) {
      const canvas = await html2canvas(containerRef.current);
      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement('a');
      link.href = imgData;
      link.download = 'screenshot.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const containerStyle: React.CSSProperties = {
    width: `${width}px`,
    height: `${height}px`,
    border: '0px solid #000',
    overflow: 'hidden'
  };

  const pages = React.Children.toArray(children);  // 将children转换为数组

  return (
    <div className='ScreenshotArea'>
      <div>
        Width: <input type="number" value={width} onChange={e => setWidth(Number(e.target.value))} />
        Height: <input type="number" value={height} onChange={e => setHeight(Number(e.target.value))} />
        <button onClick={handleGenerateImage}>Capture</button>
        <button disabled={currentPage === 0} onClick={() => setCurrentPage(prev => prev - 1)}>Previous</button>
        <button disabled={currentPage === pages.length - 1} onClick={() => setCurrentPage(prev => prev + 1)}>Next</button>
      </div>
      <div style={containerStyle} ref={containerRef}>
        {pages[currentPage]}
      </div>
    </div>
  );
}

export default ScreenshotArea;
