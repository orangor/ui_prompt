import React, { useState, useEffect } from 'react';

import { fetchHotlistEntriesByQuery } from "../../axios/client"; 
import './hotlist.less';  // Assuming you have a CSS module for styling
import{HostList,HotEntriesTable} from "./platformTable"
const Hotlist = () => {
  const today = new Date();
  const formattedDate = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
      
    const [data, setData] =  useState<HostList[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [platformFilter, setPlatformFilter] = useState('all');
    const [query, setQuery] = useState<Partial<HostList>>({});
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(2000);
    const handleInputChange = (field: keyof HostList) => (e: { target: { value: any; }; }) => {
      setQuery({
        ...query,
        [field]: e.target.value,
      });
    }

    const fetchData = async () => {
      // 执行查询
      try {
        const results = await fetchHotlistEntriesByQuery({ ...query, page, limit });
        if (Array.isArray(results.data)) {
          setData(results.data);
        } else {
          console.error('接收到意外的数据格式:', results);
          setData([]);
        }
      } catch (err) {
        console.error(err.message || '查询时发生错误');
      }
    }

    const filteredData = data.filter((item:any) =>
        (platformFilter === 'all' || item.platform === platformFilter) &&
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="hotlist-container">
   <div>
    <div className="input-group">
      <label>标题：</label>
      <input type="text" value={query.title || ''} onChange={handleInputChange('title')} />
    </div>
    

    <div className="input-group">
      <label>平台：</label>
      <input type="text" value={query.platform || ''} onChange={handleInputChange('platform')} />
    </div>
    <div className="input-group">
      <label>开始日期：</label>
      <input type="date" className="full-width-date-picker" value={query.startdate || ''} onChange={handleInputChange('startdate')} />
    </div>

    <div className="input-group">
      <label>结束日期：</label>
      <input type="date" className="full-width-date-picker" value={query.enddate || ''} onChange={handleInputChange('enddate')} />
    </div>
    
{/** 
 * <div className="input-group">
      <label>ID：</label>
      <input type="number" value={query.entry_id || ''} onChange={handleInputChange('entry_id')} />
    </div>
    <div className="input-group">
      <label>描述：</label>
      <input type="text" value={query.description || ''} onChange={handleInputChange('description')} />
    </div>
    <div className="input-group">
      <label>地址：</label>
      <input type="text" value={query.rank || ''} onChange={handleInputChange('rank')} />
    </div>
    <div className="input-group">
      <label>热度：</label>
      <input type="text" value={query.heat || ''} onChange={handleInputChange('heat')} />
    </div> */}
   
    <div className="input-group">
      <label>页面：</label>
      <input type="number" value={page} onChange={(e) => setPage(Number(e.target.value))} />
    </div>

    <div className="input-group">
      <label>查询数量：</label>
      <select value={limit} onChange={(e) => setLimit(Number(e.target.value))}>
        <option value={100}>100</option>
        <option value={500}>500</option>
        <option value={1000}>1000</option>
        <option value={1500}>1500</option>
        <option value={2000}>2000</option>
        <option value={20000}>20000</option>
        {/* 可以根据需求添加更多的选项 */}
      </select>
    </div>
    
    <div className="query-button-container">
    <button onClick={fetchData}>查询</button>
</div>
    </div>

    <div>
    
    <HotEntriesTable entries={filteredData} />
         
            {
      /** 
            {filteredData.map((item:any) => (
                <div key={item.entry_id} className="hotlist-item">
                    <h2>{item.title}</h2>
                    <p>{item.description}</p>
                    <a href={item.url} target="_blank" rel="noopener noreferrer">Read more</a>
                    <span>{item.platform} </span>
                </div>
            ))}*/}
          </div>
     
        </div>
    );
};

export { Hotlist,HostList };
