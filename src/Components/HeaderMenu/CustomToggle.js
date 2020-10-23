import React from 'react';

const CustomToggle =  React.forwardRef(({ onClick }, ref) => (
    <a
      className="threedotref"
      href=""
      ref={ref}
      onClick={e => {
        e.preventDefault();
        onClick(e);
      }}
    >
      <span className="threedots" />
    </a>
  ));

  export default CustomToggle;