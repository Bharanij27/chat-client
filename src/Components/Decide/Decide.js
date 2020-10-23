import React from 'react';

const Decide = ({ user, decision }) => {
    
    return(
        <div className="friendreq">
        <i className="fa fa-check-circle fa-lg bg-green mr-3" onClick ={() => decision('true', user)}></i> 
        <i className="fa fa-times-circle fa-lg bg-red" onClick={() => decision('false', user)}></i>
    </div>
    )
}

export default Decide;