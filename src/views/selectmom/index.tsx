import React, { useState, useEffect, useRef } from "react";
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { SONG_PICK } from "../../const/const"
import {RollBox}from "../../components/roll/roll"
import { fetchGoodSentences,fetchGoodSentencesLike } from "../../axios/client"
import "../selectmom/index.less"
import { Pagination,Input ,Table,Tag  } from 'antd';
import type { ColumnsType } from 'antd/es/table';

const { Search } = Input;
const Selectmom = function () {
     let cn: SONG_PICK[] = []
let c:SONG_PICK={ id:0,
                 text:"",  
                 type:"",  
                 label:""};
                 
    let [songs, setSongs] = useState(cn)
    let [CooKey, setCooKey] = useState(true)
    let [song_count,setSongCount]=useState(10)
    let [page,setPage]=useState(1)
    let [pageSize,setPageSize]=useState(10)
   
  let [searchValue,setSearchValue]=useState("")

  const columns: ColumnsType<SONG_PICK> = [
    {
      title: '名字',
      dataIndex: 'label',
      key: 'label',
      width: 200,
    },{
      title: '内容',
      dataIndex: 'text',
      key: 'text',
     
      render:text => <div title={text}> {text}</div>
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      width: 200,
      render: (_, { type, }) => (
        <>
          {[type].map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
   
    }
  
  ]
function startSongList(){
  if (CooKey) {
    fetchGoodSentences({like_total:searchValue, start: (page-1)*pageSize,size:pageSize }).then((rex: any) => {
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

function onSearch (value: string){
  setCooKey(true)
  setPage(1)
  startSongList()
 
} 
function serchChange(e:any){
  e.persist();
  setTimeout(() => {
    console.log(e.target.value); // Too late!
    setSearchValue(e.target.value)
  }, 100);
}
    return (<div className={`selectmom`}>
      <div className={`left-box`}> <Search placeholder="input search text" onSearch={onSearch} style={{ }} onChange={(e)=>{

        
serchChange(e)
      }} />
      <Table dataSource={songs}  columns={columns} rowKey={"id"} pagination={ false  }  ></Table>
      <Pagination current={page} total={song_count} onChange={onChange}  pageSizeOptions={[String(10),String(20)]} pageSize={pageSize}  />
      </div>
   
    </div>)
}
export { Selectmom }