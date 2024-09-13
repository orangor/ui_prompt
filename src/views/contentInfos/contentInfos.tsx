import React, { useState } from 'react';
import { fetchContentInfosByQuery } from "../../axios/client"; 
import "./contentInfos.less";
type ContentInfo = {
  id: number;
  filePath: string;
  filename: string;
  directoryChain: string;
  fileType: string;
  content: string;
  sentenceFeature: string;
  tags: string;
};

const ContentInfoComponent = () => {
  const [data, setData] = useState<ContentInfo[]>([]);
  const [query, setQuery] = useState<Partial<ContentInfo>>({});
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  //复制
  const [showCopySuccess, setShowCopySuccess] = useState(false);

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content).then(() => {
      setShowCopySuccess(true);
      setTimeout(() => setShowCopySuccess(false), 2000); // 2秒后隐藏
    });
  }

  const fetchData = async () => {
    // 执行查询
    try {
      const results = await fetchContentInfosByQuery({ ...query, page, limit });
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

  const handleInputChange = (field: keyof ContentInfo) => (e: { target: { value: any; }; }) => {
    setQuery({
      ...query,
      [field]: e.target.value,
    });
  }

  return (
    <div className="content-info-container">
  <div>
  <div className="input-group">
      <label>内容：</label>
      <input type="text" value={query.content || ''} onChange={handleInputChange('content')} />
    </div>
    <div className="input-group">
      <label>标签：</label>
      <input type="text" value={query.tags || ''} onChange={handleInputChange('tags')} />
    </div>
    <div className="input-group">
      <label>ID：</label>
      <input type="number" value={query.id || ''} onChange={handleInputChange('id')} />
    </div>

    <div className="input-group">
      <label>文件路径：</label>
      <input type="text" value={query.filePath || ''} onChange={handleInputChange('filePath')} />
    </div>

    <div className="input-group">
      <label>文件：</label>
      <input type="text" value={query.filename || ''} onChange={handleInputChange('filename')} />
    </div>

    <div className="input-group">
      <label>目录：</label>
      <input type="text" value={query.directoryChain || ''} onChange={handleInputChange('directoryChain')} />
    </div>

    <div className="input-group">
      <label>文件类型：</label>
      <input type="text" value={query.fileType || ''} onChange={handleInputChange('fileType')} />
    </div>

    

    <div className="input-group">
      <label>特性：</label>
      <input type="text" value={query.sentenceFeature || ''} onChange={handleInputChange('sentenceFeature')} />
    </div>

   

    <div className="input-group">
      <label>页面：</label>
      <input type="number" value={page} onChange={(e) => setPage(Number(e.target.value))} />
    </div>

    <div className="input-group">
      <label>查询数量：</label>
      <select value={limit} onChange={(e) => setLimit(Number(e.target.value))}>
        <option value={10}>10</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
        <option value={500}>500</option>
        <option value={1000}>1000</option>
        {/* 可以根据需求添加更多的选项 */}
      </select>
    </div>

    <div className="query-button-container">
    <button onClick={fetchData}>查询</button>
</div>
     {/*<h3>{item.tags}</h3>*/}  
  </div>
  <div>
  {showCopySuccess && <div className="copy-success">复制成功!</div>}
  {data.map(item => (
    <div key={item.id} className="content-info-item">
      <p className="content" title="点击复制" onClick={() => handleCopy(item.content)}>{item.content}</p>
      <div className="footer">
        <div className="filename">{item.filename}</div>
        <div className="tags">
          {item.tags.split(',').map((tag, index) => <span key={index} className="tag">{tag.trim()}</span>)}
        </div>
      </div>
    </div>
    
  ))}
</div>


  
{/*
  <div>
    {data.map(item => (
      <div key={item.id} className="content-info-item">
   
        <p>{item.filename}</p>
        <p>{item.content}</p>
        <p>{item.tags}</p>
      </div>
    ))}
  </div>*/
}
</div>
  );
}

export { ContentInfoComponent };
