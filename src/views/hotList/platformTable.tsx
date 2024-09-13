import React, { useState, useEffect } from 'react'; // 引入useState和useEffect
import { Table, Tooltip, Row, Col, message,Button, Modal  } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as Tooltip_rh, Legend } from 'recharts';
import dayjs from 'dayjs';

export type HostList = {
  entry_id: number;
  platform: string;
  date: string;
  title: string;
  url: string;
  description: string;
  rank: string;
  heat: string;
  startdate: string;
  enddate: string;
  times:string;
}

interface HotEntriesTableProps {
  entries: HostList[];
}

export const HotEntriesTable: React.FC<HotEntriesTableProps> = ({ entries }) => {
  // 复制标题到剪贴板
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      message.success("标题已复制到剪贴板"); // 当复制成功时显示成功消息
    }).catch(err => {
      message.error("复制失败"); // 当复制失败时显示错误消息
    });
  }
  const platforms = Array.from(new Set(entries.map(d => d.platform)));
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  //对话框
  const [heatList, setHeatList] = useState([{
    name: `Point ${1 + 1}`,
    rank: 100,
  }]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pickHot, setPickHot] = useState({
    entry_id: 1,
    platform: "",
    date: "",
    title: "",
    url: "",
    description: "",
    rank: "",
    heat: "",
    startdate: "",
    enddate: "",
    times:""
  });

  const showModal = (hotdata: HostList) => {
     // 设置 `pickHot` 的状态
     setPickHot(hotdata);

     // 直接使用 `hotdata` 而不是 `pickHot`，以避免异步状态更新问题
     let rankArray = hotdata.heat.split(',').map((num) => parseInt(num.trim(), 10));
     let timeArray = hotdata.times ? hotdata.times.split(',').map((num) => parseInt(num.trim(), 10)) : [];
 
     // 将数组转换为所需的数据格式
     let data = rankArray.map((rank, index) => ({
         name: timeArray[index] ? dayjs(timeArray[index] * 1000).format('HH:mm') : `热度 ${index + 1}`,
         rank: rank,
     }));
 
     // 设置热度列表数据
     setHeatList(data);
 
     // 打开模态框，稍微延迟一下（可选）
    setIsModalOpen(true)
  };

  const handleOk = () => {
    
    setIsModalOpen(false);
    setPickHot({
      entry_id: 1,
      platform: "",
      date: "",
      title: "",
      url: "",
      description: "",
      rank: "",
      heat: "",
      startdate: "",
      enddate: "",
      times:""
    })
  };

  const handleCancel = () => {

    setIsModalOpen(false);
    setPickHot({
      entry_id: 1,
      platform: "",
      date: "",
      title: "",
      url: "",
      description: "",
      rank: "",
      heat: "",
      startdate: "",
      enddate: "",
      times:""
    })
  };



  const isMobile = windowWidth <= 768; // 假设屏幕宽度小于或等于768px则为移动设备

  return (
    <div style={{ width: platforms.length === 1 ? '200%' : '100%' }}>
      <Row gutter={16}>
        {platforms.map((platform) => {
          const dataSource = entries.filter(d => d.platform === platform);
          return (
            <Col key={platform} span={isMobile ? 24 : (platforms.length === 1 ? 24 : 12)} style={{ marginBottom: 20 }}>
              <h2>{platform}</h2>
              <Table dataSource={dataSource} rowKey="entry_id" style={{ width: '100%' }} pagination={{ pageSize: 10 }}>
                { !isMobile && 
                  <Table.Column
                    title="Date"
                    dataIndex="date"
                    key="date"
                    render={(date: string) => dayjs(date).format('MM-DD')}
                    width={100}
                  /> 
                }
                <Table.Column
                  title="Title"
                  dataIndex="title"
                  key="title"
                  render={(text: string) => (
                    <span onClick={() => copyToClipboard(text)} style={{ cursor: 'pointer' }}>
                      {text}
                    </span>
                  )}
                  width={350}
                />
                <Table.Column 
                  title="Heat"
                  dataIndex="heat"
                  key="heat"
                  width={50}
                  sorter={
                    
                    (a: HostList, b: HostList) =>   Math.max(...a.heat.split(',').map(Number))-Math.max(...b.heat.split(',').map(Number))
                  }
                  defaultSortOrder="descend"
                  render={(text: string, record: HostList) => (
                    <span   rel="noopener noreferrer">
                       {Math.max(...text.split(',').map(Number))}
                    </span>
                  )}
                />

                { !isMobile && 
                  <Table.Column
                    title="Description"
                    dataIndex="description"
                    key="description"
                    render={(text: string, record: HostList) => (
                      <Tooltip title={record.description}>
                        <div style={{ maxWidth: 50, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {text}
                        </div>
                      </Tooltip>
                    )}
                    width={50}
                  />
                }
                { !isMobile && 
                  <Table.Column 
                    title="Rank" 
                    dataIndex="rank" 
                    key="rank" 
                    width={50} 
                    render={(text: string, record: HostList) => (
                      <a href={record.url} target="_blank" rel="noopener noreferrer">
                         {text.split(',').map(Number)[text.split(',').map(Number).length-1]}
                      </a>
                    )}
                  />
                }
                  { !isMobile &&    <Table.Column 
                  title="Heat"
                  dataIndex="heat"
                  key="heat"
                  width={50}
                 
                
                  render={(text: string, record: HostList) => (
                    <span onClick={()=>showModal(record)}   rel="noopener noreferrer">
                       {"详情"}
                    </span>
                  )}
                />
                  
                  }
              </Table>
            </Col>
          );
        })}
      </Row>
      <Modal title={"["+pickHot.platform+"]" +"["+dayjs(pickHot.date).format('MM-DD')+"]"+"---"+ pickHot.title} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
       width={1100}
      >
        <div>{}</div>
      <LineChart
      width={1000}
      height={400}
      data={heatList}
      margin={{ top: 30, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip_rh />
      <Legend />
      <Line type="monotone" dataKey="rank" stroke="#8884d8" activeDot={{ r: 8 }} />
    </LineChart>
      </Modal>
    </div>
  );
};
