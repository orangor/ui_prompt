import React, { useState, useEffect, useRef } from "react";
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { SONG_PICK } from "../../const/const"
import {RollBox}from "../../components/roll/roll"
import { fetchGoodSentences,fetchGoodSentencesLike } from "../../axios/client"
import "../screencap/screencap.less"
import { Pagination,Input ,Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

const { Search } = Input;
const Screencap = function () {
     let cn: SONG_PICK[] = []
let c:SONG_PICK={ id:0,
                 text:"",  
                 type:"",  
                 label:""
                };     
    let [songs, setSongs] = useState(cn)
    let [CooKey, setCooKey] = useState(true)
    let [song_count,setSongCount]=useState(10)
    let [page,setPage]=useState(1)
    let [pageSize,setPageSize]=useState(20)
    let [songCell,setSongCell]=useState(c)
  const columns: ColumnsType<SONG_PICK> = [
    {
      title: 'text',
      dataIndex: 'text',
      key: 'text'
    }
  
  ]
function startSongList(){
  if (CooKey) {
    fetchGoodSentences({like_total:"", start: (page-1)*pageSize,size:pageSize }).then((rex: any) => {
           console.log(rex.data.data)
           setSongs(rex.data.data.list)
           setSongCount(rex.data.data.count)
    })  
    setCooKey(false)
}
}
startSongList()

function onChange(index:number,size:number){
 setPage(index)
 setPageSize(size)
  setCooKey(true)

}
function  cellClick(cell:any){
  setSongCell(cell)

}
function onSearch (value: string){
  
  if(value!==""){
    fetchGoodSentencesLike({like_total:value}).then((rex: any) => {
    console.log(rex.data.data)
    setSongs(rex.data.data.list)
    setSongCount(rex.data.data.list.length)

}) 
 }else{
  setCooKey(true)
  startSongList()
 }
} 
    return (<div className={`screencap`}>
      <div className={`left-box`}> <Search placeholder="input search text" onSearch={onSearch} style={{ width: 200 }} />
      <Table dataSource={songs}  columns={columns} rowKey={"id"}></Table>
      </div>
      <div className={`grid`} >
        <div className={`song_box`}>
      {
         songs?.map((s,index)=>{
           return <div   key={index+"s"}>
          <button onClick={()=>{
            cellClick(s)
          }}><span>{s.label}</span></button>
         </div>
         })
     }
     </div>
       <div className={`pagination_box`}><Pagination defaultCurrent={1} total={song_count} onChange={onChange}  pageSizeOptions={["20","50"]} pageSize={pageSize}/></div>
     </div>
   
     <div className={`right-box`}>
       <div className={`labelText`}>{songCell.text}</div>
       <div className={`labelLabel`}>{(songCell.label?"---------":"")+songCell.label+(songCell.label?"---------":"")}</div>
     </div>
    </div>)
}
export { Screencap }