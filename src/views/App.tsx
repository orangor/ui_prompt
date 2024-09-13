{ /*import React, { useState } from "react";
import { HashRouter as Router, Route, Link } from "react-router-dom";

import { GET_COLOR,HEADE } from "../const/const";
import { routers } from "../router/index";
import "./app.less";

interface TagProps {
    data: any;
    onTouch: (value: string) => void;
    isTouch: string;
    css: string;
  }
  
  const Tag: React.FC<TagProps> = (props) => {
    const { data, onTouch, isTouch, css } = props;
  
    return (
      <div className={`${css} tag`}>
        <Link to={data.link} onClick={() => onTouch(data.name)}>
          <button
            className={`custom-btn btn-17 ${
              isTouch === data.name ? "isTouchBar" : ""
            }`}
          >
            <span>{data.name}</span>
          </button>
        </Link>
        <div className={`cell-list`}>
          {data.list.map((item:any, i:any) => {
            return (
              <div
                key={i}
                className={`cell`}
                onClick={() => {
                  if (item.url) {
                    const w: any = window.open("about:blank");
                    w.location.href = item.url;
                  }
                }}
              >
                {item.name}
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  
  const MenuToggle: React.FC<{ onClick: () => void; isOpen: boolean }> = ({
    onClick,
    isOpen,
  }) => (
    <button className={`menu-toggle ${isOpen ? "open" : ""}`} onClick={onClick}>
      <span></span>
      <span></span>
      <span></span>
    </button>
  );
  
  const Head: React.FC = () => {
    const [isTouch, setTouch] = useState(HEADE[0].name);
    const [isMenuOpen, setMenuOpen] = useState(false);
  
    function onTouch(value: string) {
      setTouch(value);
    }
  
    function handleMenuToggle() {
      setMenuOpen(!isMenuOpen);
    }
  
    return (
      <div className={`heade`}>
        <MenuToggle onClick={handleMenuToggle} isOpen={isMenuOpen} />
        <div className={`nav-container ${isMenuOpen ? "open" : ""}`}>
          {HEADE.map((item: any, index: any) => {
            return (
              <Tag
                data={item}
                onTouch={onTouch}
                isTouch={isTouch}
                css={`${"color_" + GET_COLOR().name}`}
                key={index}
              ></Tag>
            );
          })}
        </div>
      </div>
    );
  };
  
  const App: React.FC = () => {
    return (
      <div>
        <Router>
          <Head />
          <div className={`seed-content`}>
            {routers.map((router, i) => {
              return (
                <Route
                  key={i}
                  exact
                  path={router.path}
                  component={router.component}
                ></Route>
              );
            })}
          </div>
        </Router>
      </div>
    );
  };
  
  export { App };
*/}
import React, { useState } from "react";
import { HashRouter as Router, Route, Link } from "react-router-dom";

import { GET_COLOR, HEADE } from "../const/const";
import { routers } from "../router/index";
import "./app.less";

interface Item {
  name: string;
  link: string;
  url?: string;
  list: Item[];
}

interface TagProps {
  data: Item;
  onTouch: (value: string) => void;
  isTouch: string;
  css: string;
  closeMenu: () => void;  // 新增此行
}

const Tag: React.FC<TagProps> = ({ data, onTouch, isTouch, css, closeMenu  }) => {
  const { name, list } = data;

  return (
    <div className={`${css} tag`}>
        <Link to={data.link} onClick={() => {
   onTouch(name);
   closeMenu();  // 使用新的属性
}}>  {/* 使用 data.link */}
        <button className={`custom-btn btn-17 ${isTouch === name ? "isTouchBar" : ""}`}>
          <span>{name}</span>
        </button>
      </Link>
      <div className={`cell-list`}>
        {list.map((item, i) => (
          <div
            key={i}
            className={`cell`}
            onClick={() => {
              if (item.url) {
                const w: Window | null = window.open("about:blank");
                if (w) {  // 非空检查
                  w.location.href = item.url;
                }
              }
            }}
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
};


const MenuToggle: React.FC<{ onClick: () => void; isOpen: boolean }> = ({
  onClick,
  isOpen,
}) => (
  <button className={`menu-toggle ${isOpen ? "open" : ""}`} onClick={onClick}>
    <span></span>
    { !isOpen && <span></span> }  {/* Hide middle line when menu is open */}
    <span></span>
  </button>
);

const Head: React.FC = () => {
  const [isTouch, setTouch] = useState(HEADE[0].name);
  const [isMenuOpen, setMenuOpen] = useState(false);
  
  const handleMenuToggle = () => setMenuOpen(prev => !prev);

  return (
    <div className={`heade`}>
      <MenuToggle onClick={handleMenuToggle} isOpen={isMenuOpen} />
      <div className={`nav-container ${isMenuOpen ? "open" : ""}`}>
        {HEADE.map((item: Item, index: React.Key | null | undefined) => (
          <Tag
            data={item}
            onTouch={setTouch}
            isTouch={isTouch}
            css={`color_${GET_COLOR().name}`}
            closeMenu={() => setMenuOpen(false)}  // 新增此行
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

const App: React.FC = () => (
  <div>
    <Router>
      <Head />
      <div className={`seed-content`}>
        {routers.map((router, i) => (
          <Route key={i} exact path={router.path} component={router.component} />
        ))}
      </div>
    </Router>
  </div>
);

export { App };
