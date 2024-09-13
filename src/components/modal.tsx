import React, { useState,useRef,useEffect } from 'react';
import { Modal, Button,Input } from 'antd';
const { TextArea } = Input;



const Modal1 = (data:any) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>{data.name}</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};
const Modal2 = ( parps:any) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
  
   
  
    const handleOk = () => {
      setIsModalVisible(false);
    };
  
    function handleCancel  () {
      setIsModalVisible(false);
    };
    const [isModalVisible2, setIsModalVisible2] = useState(false);
 
    const showModal= (e:any) => {
      console.log(e.button)
      var elef = e.clientX
      var etop = e.clientY
      document.oncontextmenu = function(e){
        return false
        //或者 e.preventDefault()
      }
      if(e.button==2){
      setIsModalVisible2(true);
      }else if(e.button==0){
        setIsModalVisible(true);
      }
    };
  
    const handleOk2 = () => {
      setIsModalVisible2(false);
    };
  
    const handleCancel2 = () => {
      setIsModalVisible2(false);
    };
    function change(event: any) {
      console.log("vv",event.target.value) 
  }

    return (
      <>
      <div id={parps.item.cell_id} onClick={showModal}   onMouseUp={showModal}  draggable="true"className={`card-cell`}>{parps.item.name}
      
      </div>
   
        <Modal title="任务详情" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} okText="确认"
          cancelText="取消">
          <p>主题：{parps.item.name}</p>
          <p>描述：{parps.item.context}</p>
          <p>开始时间:{parps.item.create_time} </p>
        </Modal>
        <Modal title="任务详情" visible={isModalVisible2} onOk={handleOk2} onCancel={handleCancel2} okText="保存"
          cancelText="取消">
          <Input  defaultValue={parps.item.name}/>
          <TextArea rows={4} defaultValue={parps.item.context}  onChange={change} />
        </Modal>
      </>
    );
  };
export  {Modal1, Modal2};