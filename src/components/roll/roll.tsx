import React, { useState, useEffect, useRef } from "react";
import { Modal, Button } from 'antd';

import { ROLL_BOX } from "../../const/const"

function RollBox(parps: any) {


    let rb: ROLL_BOX = {w:10,h:10}
    let li :String[]=[]

    function addNode(val: string) {
     
    }
   
    

    return (<div className={`roll-box`} >
        <div className={`title`}>{parps.name}</div>
     
       

    </div >)
}
export { RollBox }