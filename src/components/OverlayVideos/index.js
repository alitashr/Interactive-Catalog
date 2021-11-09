import classNames from "classnames";
import React, { PropTypes, useEffect, useState } from "react";
import { useWindowSize } from "react-use";
import { assetsDomain } from "../../api/appProvider";
import FlipPageConstants from "../../constants/constants";
import { useUiState } from "../../reducers/mainUI.reducer";
import { setPageDims } from "../../utils/utils";
import VideoPlayer from "../Video-Player";

const OverlayVideos = (props) => {
  const { className, page, imageSrc, videoSrc } = props;

  const mainUiState = useUiState();
  const { width: windowWidth, height: windowHeight } = useWindowSize();
  const [pageSize, setPageSize] = useState({ w: windowWidth, h: windowHeight });
  const customCatalog_eachPageSize = FlipPageConstants.customCatalog_eachPageSize;

  useEffect(() => {
    const pageDims = setPageDims(windowWidth, windowHeight, customCatalog_eachPageSize);
    setPageSize(pageDims);
  }, []);

  useEffect(() => {
    const pageDims = setPageDims(windowWidth, windowHeight, customCatalog_eachPageSize);
    setPageSize(pageDims);
  }, [windowWidth, windowHeight]);

  return (
    <div
      className={classNames("flipbook-custom-catalog-videos", className)}
      style={{
        width: pageSize.w,
        height: pageSize.h,
      }}
    >
      <VideoPlayer
        id="seashoreVideoIframe"
        className={classNames({ hidden: mainUiState.pageNum !== page }, { shown: mainUiState.pageNum === page })}
        pauseVideo={mainUiState.pageNum !== page}
        src={`${assetsDomain}/${videoSrc}`}
        videoType="video/mp4"
      ></VideoPlayer>

      <img
        src={`${assetsDomain}/${imageSrc}`}
        alt={"text"}
        className={classNames("bd-overlay-image seashoreVideoIframe", { shown: mainUiState.pageNum === page })}
      />
    </div>
  );
};

OverlayVideos.propTypes = {};

export default OverlayVideos;
