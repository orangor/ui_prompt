import React, { useState, useEffect, useRef } from "react";
import { message } from 'antd'; // 假设你使用的是Ant Design库
import { Input, Select } from 'antd';
import { fetchTag } from "../../axios/client";
import { TAG_NODE, CHECK_TAG, TYPE_VALUE, TAG_TYPE2 } from "../../const/const";
import "./tag.less";
const { Search } = Input;
//这段代码定义了一个接收一个对象参数的函数，对象中有两个属性：options 和 handleChange。options 是一个包含任意类型元素的数组，而 handleChange 是一个函数，它接收两个任意类型的参数 (value 和 op)，并且没有返回值。
const OptionTags = ({ options, handleChange }: { options: any[], handleChange: (value: any, op: any) => void }) => (
  <div className={`option_tag`}>
    {options.map((op: any) => (
      <Select
        className="custom-ant-select"
        mode="tags"
        allowClear
        style={{ width: '120px' }}
        placeholder={[op.name]}
        defaultValue={[]}
        onChange={(o, opx) => handleChange(op.name, opx)}
        options={op.sheet_data}
        key={op.name}
      />
    ))}
  </div>
);

const CheckTags = ({ ckOptions }: { ckOptions: CHECK_TAG[] }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [showCopyPrompt, setShowCopyPrompt] = useState(false);

  const getValuesToCopy = () => {
    let values: (string | null)[] = [];
    if (contentRef.current) {
      const tags = contentRef.current.querySelectorAll('span[data-value]');
      tags.forEach(tag => {
        values.push(tag.getAttribute('data-value'));
      });
    }
    return values.join(',');
  };

  const handleCopyClick = () => {
    const contentToCopy = getValuesToCopy();
    navigator.clipboard.writeText(contentToCopy)
      .then(() => {
        message.success("内容已复制到剪贴板");
      })
      .catch(err => {
        message.error("复制失败");
      });
  };

  return (
    <div 
      className="check_tag" 
      onClick={handleCopyClick}
      onMouseEnter={() => setShowCopyPrompt(true)}
      onMouseLeave={() => setShowCopyPrompt(false)}
    >
      <div ref={contentRef}>
        {ckOptions.map((m: CHECK_TAG) => (
          <span key={m.field}>
            {m.data.map((d: TAG_NODE) => (
              <span key={d.id} data-value={d.value}>
                {/* 展示label */}
                {d.type2 === TYPE_VALUE.F2
                  ? d.label + TAG_TYPE2.Second
                  : d.label + TAG_TYPE2.First}
              </span>
            ))}
          </span>
        ))}
      </div>
      {showCopyPrompt && <span>点击复制</span>}
    </div>
  );
};
const DrawTag = () => {
  const [tags, setTags] = useState<TAG_NODE[]>([]);
  const [CooKey, setCooKey] = useState(true);
  const [list, setList] = useState<any[]>([]);
  const [ckOptions, setCkOptions] = useState<CHECK_TAG[]>([]);

  useEffect(() => {
    if (CooKey) {
      startList();
    }
  }, [CooKey]);
  


  async function startList() {
    const tag: any = await fetchTag("");
    const tagData = tag.data.data;
    setList(tagData);
    creatTags(tagData)
  }

function creatTags(tagData :any){
  let  data_filter: any[] = [];
  let  opx: CHECK_TAG[] = [];
  tagData.forEach((t: any) => {
      data_filter.push(...t.sheet_data);
    opx.push({ field: t.name, data: [] });
  });
  setTags(data_filter);
  setCkOptions(opx);
  setCooKey(false);
}
  function onSearch(value: string) {
    setCooKey(true);
    startList();
  }
  function handleChange(value: any, op: any) {
    const opData: TAG_NODE[] = JSON.parse(JSON.stringify(op));
    const ckos: CHECK_TAG[] = JSON.parse(JSON.stringify(ckOptions));

    ckos.forEach((m: CHECK_TAG, i: number) => {
      if (m.field === value) {
        ckos[i].data = opData;
        setCkOptions(JSON.parse(JSON.stringify(ckos)));
      }
    });
  }
  
  return (
    <div className={`selectmom`}>
      <div className={`left-box`}>
      </div>
      <OptionTags options={list} handleChange={handleChange} />
      <CheckTags ckOptions={ckOptions} />
    </div>
  );
};

export {DrawTag }