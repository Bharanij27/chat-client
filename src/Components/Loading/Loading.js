import React from 'react';
import ReactLoading from "react-loading";
import './Loading.css'

const Loading = () => {
    console.log('Loading');
    return(
        <ReactLoading  className="loading" type='bubbles' color='black' height={'8%'} width={'8%'}/>
    )
}

export default Loading;