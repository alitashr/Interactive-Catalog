import React, { PropTypes } from "react";
import { useFullscreen, useToggle } from "react-use";
import { fullscreenbtnsrc } from "../../constants/constants";

const FullscreenButton = (props) => {
  const { containerref, className='' } = props;
  //const containerref = useRef(null);
  const [show, toggle] = useToggle(false);

  const isFullscreen = useFullscreen(containerref, show, {
    onClose: () => toggle(false),
  });
  return (
    <>
      <img className={className} src={isFullscreen ? fullscreenbtnsrc[1] : fullscreenbtnsrc[0]} onClick={() => toggle()} alt="fullscreen" />
    </>
  );
};

FullscreenButton.propTypes = {};

export default FullscreenButton;
