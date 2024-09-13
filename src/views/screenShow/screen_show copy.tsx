import React, { useRef, useState } from 'react';
import ScreenshotArea from "../../components/ScreenshotArea";
import { MOM_TEXT, ORDINALS, KEYS_ARRAY } from "../../const/const";
import BeautifulDisplay, { BeautifulDisplayHandle } from "../../components/mom/BeautifulDisplay";
import  { CoverCreator } from "../../components/mom/CoverCreator";
import  { NoteComponent } from "../../components/mom/NoteComponent";

import "./screen_show.less"
const ScreenShow = () => {
  const ref = useRef<BeautifulDisplayHandle | null>(null);
  const [textNodeKey, setTextNodeKey] = useState("FIRST"); // 使用 key，它是 string 类型

  const handleAddText = () => {
    ref.current?.addText({ text_node: ORDINALS[textNodeKey], text: "新的文本内容" });
  };

  const handleDeleteText = () => {
    ref.current?.deleteText(0); 
  };

  return (
    <div>
       {/**
      <select 
        value={textNodeKey} 
        onChange={(e) => setTextNodeKey(e.target.value)}
      >
        {KEYS_ARRAY.map(([key], index) => (
           <option key={index} value={key}>{ORDINALS[key].title}</option>
        ))}
      </select>
 <button onClick={handleAddText}>添加文本</button>
      <button onClick={handleDeleteText}>删除文本</button> */}
      
<div  className='ScreenshotAreaBox'>
      <ScreenshotArea>
      <CoverCreator defaultText=""></CoverCreator>
      </ScreenshotArea>
      <ScreenshotArea>
      <NoteComponent defaultTitle='' defaultContent='' ></NoteComponent>     
      </ScreenshotArea> 
   
      {/* 
      <ScreenshotArea>
      <BeautifulDisplay ref={ref} initialText={{ text_node: ORDINALS[textNodeKey], text: "新的文本内容" }} />
      <NoteComponent defaultTitle='精神能量耗尽的表现' defaultContent='男子开12小时跑160公里才刚出省' ></NoteComponent>
      <CoverCreator defaultText=""></CoverCreator>
      </ScreenshotArea>
      
      * */}
     
      </div>
    </div>
  );
};

export { ScreenShow };
