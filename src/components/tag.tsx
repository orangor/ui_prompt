import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
//   <div className={`title ${props.isTouch === props.data.name ? "isTouchBar" : ""}`} onClick={() => { props.onTouch(props.data.name) }}>{props.data.name}</div>
const Tag = function Tag(props: any) {


    return (<div className={`${props.css} tag`}>
        <Link to={props.data.link}>
         
            <button className={`custom-btn btn-17  ${props.isTouch === props.data.name ? "isTouchBar" : ""}`   }onClick={() => { props.onTouch(props.data.name) }} ><span>{props.data.name}</span></button>
        </Link>
        <div className={`cell-list `}>{
            props.data.list.map((item: any, i: any) => {
                return <div key={i} className={`cell`} onClick={() => {
                    if (item.url) {
                        const w: any = window.open('about:blank');
                        w.location.href = item.url
                    }
                }}>{item.name}</div>
            })
        }
        </div>
    </div >)
}
export { Tag }