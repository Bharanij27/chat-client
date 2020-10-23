import React from 'react';
import ReactLoading from "react-loading";
import './Loading.css'

const Loading = () => {
    return(
        <div className="load-container">
            <ReactLoading  className="loading" type='bubbles' color='black' height={'8%'} width={'8%'}/>
        </div>
    )
}

export default Loading;