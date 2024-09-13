import React, { useRef, useState } from 'react';
import ScreenshotArea from "../../components/ScreenshotArea";
import { MOM_TEXT, ORDINALS, KEYS_ARRAY } from "../../const/const";
import BeautifulDisplay, { BeautifulDisplayHandle } from "../../components/mom/BeautifulDisplay";
import  { CoverCreator } from "../../components/mom/CoverCreator";
import  { NoteComponent } from "../../components/mom/NoteComponent";
import  { DisplayCard } from "../../components/mom/DisplayCard";

import "./screen_show.less"
const ScreenShow = () => {
  return (
    <div>

      <div  className='ScreenshotAreaBox'>
      <ScreenshotArea>
      <CoverCreator defaultText=""></CoverCreator>
      </ScreenshotArea>
      <ScreenshotArea>
      <NoteComponent defaultTitle='' defaultContent='' ></NoteComponent>     
      </ScreenshotArea> 
      <ScreenshotArea>
     <DisplayCard defaultTitle=""  defaultContent=""></DisplayCard> 
      </ScreenshotArea> 
   
     
      </div>
    </div>
  );
};

export { ScreenShow };
