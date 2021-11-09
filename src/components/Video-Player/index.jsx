import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { getTouchedPoints } from "../../utils/domutils";

const VideoPlayer = (props) => {
  const {
    id = "bd_video_player",
    className = "",
    pauseVideo = false,
    src = "./videos/slideshow.mp4",
    videoType = "video/mp4",
  } = props;
  const vidRef = React.useRef();

  useEffect(() => {
    if (pauseVideo) {
      vidRef.current.pause();
    } else {
      vidRef.current.play();
    }
  }, [pauseVideo]);

  const videoLoad = () => {
    // vidRef.current.play();
    const playPromise = vidRef.current.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          console.log("audio played auto");
        })
        .catch(() => {
          console.log("playback prevented");
        });
    }
  };

  return (
    <div id={id} className={classNames("bd-video-content video", className)}>
      <video ref={vidRef} autoPlay muted loop onLoad={videoLoad}>
        <source src={src} type={videoType} />
        Sorry, your browser doesn't support embedded videos.
      </video>
    </div>
  );
};

VideoPlayer.propTypes = {};

export default VideoPlayer;
