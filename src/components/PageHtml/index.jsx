import React, { PropTypes } from "react";


const PageHtml = (props, ref) => {
  return (
    <div className="demoPage" ref={ref}>
      <h1>Page Header</h1>
      <p>{props.children}</p>
    </div>
  );
};

PageHtml.propTypes = {};

export default PageHtml;
