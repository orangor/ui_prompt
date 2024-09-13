import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
const Tip = function (props: any) {
    const [css, setCss] = useState("");
    useEffect(() => {
        // Update the document title using the browser API 

    });
    return (
        <Link to={props.data.link}>
            <div className={`${props.css} tip`}>
            <div className={`title`}></div>
            </div >
        </Link >)
}
export { Tip }