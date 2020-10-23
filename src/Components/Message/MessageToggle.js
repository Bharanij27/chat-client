import React from 'react';

const MessageToggle =  React.forwardRef(({ onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={e => {
        e.preventDefault();
        onClick(e);
      }}
    >
        <i className="fa fa-chevron-down"></i>
    </a>
  ));

export default MessageToggle;