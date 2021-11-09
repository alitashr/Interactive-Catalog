import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import { useWindowSize } from "react-use";
import FlipPageConstants from "../../constants/constants";

import { useUiDispatch, useUiState } from "../../reducers/mainUI.reducer";
import { AtSpinnerOverlay } from "../AtSpinner";
import ExplorugIframePopup from "../ExplorugIframePopup";
import Flipbook from "../Flipbook-CustomRugs";
import PageFlip from "../PageFlip";

import { setPageDims } from "../../utils/utils";
import VideoPlayer from "../Video-Player";
import FullscreenButton from "../FullscreenButton";
import { Helmet } from "react-helmet";
import { mainEditorActions, useEditorDispatch, useEditorState } from "../../reducers/overlayEditor.reducer";
import { assetsDomain } from "../../api/appProvider";
import OverlayVideos from "../OverlayVideos";

const MainPage = (props) => {
  const mainPageRef = React.useRef(); //React.createRef();
  const containerref = useRef(null);
  const { width: windowWidth, height: windowHeight } = useWindowSize();
  const [pageSize, setPageSize] = useState({ w: windowWidth, h: windowHeight });
  const [showCustomRugs, setShowCustomRugs] = useState(false);

  const mainUiState = useUiState();
  const editorState = useEditorState();
  const overlayEditorDispatch = useEditorDispatch();
  const catalog_eachPageSize = FlipPageConstants.catalog_eachPageSize;
  //const customCatalog_eachPageSize = FlipPageConstants.customCatalog_eachPageSize;

  useEffect(() => {
    window.ref = mainPageRef;
    const pageDims = setPageDims(windowWidth, windowHeight, catalog_eachPageSize);
    setPageSize(pageDims);
    document.addEventListener("keydown", handleKeyDown, false);
  }, []);

  useEffect(() => {
    const pageDims = setPageDims(windowWidth, windowHeight, catalog_eachPageSize);
    setPageSize(pageDims);
  }, [windowWidth, windowHeight]);

  const onMainpageClick = (e) => {
    console.log(e, e.target);
    if (e.target.className === "flipbook-overlay" || e.target.className === "pageFlip-container") {
      setShowCustomRugs(false);
    }
  };
  const handleKeyDown = (event) => {
    const key = event.keyCode;
    if (key === 69) {
      console.log("handleKeyDown -> editorState.editorMode", editorState.editorMode);
      overlayEditorDispatch({
        type: mainEditorActions.SET_EDITORMODE,
        payload: true,
      });
    }
  };
  return (
    <React.Fragment>
      {FlipPageConstants.titleName && FlipPageConstants.titleName !== "" && (
        <Helmet>
          <title>{FlipPageConstants.titleName}</title>
        </Helmet>
      )}
      <div
        className="bd-main-page"
        id="bd-main-page"
        onClick={onMainpageClick}
        // style={{
        //   width: pageSize.w,
        //   height: pageSize.h,
        // }}
        ref={containerref}
      >
        <div className="bd-actionButtons-container">
          <FullscreenButton containerref={containerref} className="bd-actionButtons fullscreen-button" />
          {/* <button
          className="modal-video-close-btn"
          onClick={()=>{console.log('close')}}
          aria-label="Close the modal by clicking here"
        ></button> */}
        </div>

        <div
          className={classNames("pageFlip-container", FlipPageConstants.catalogName)}
          style={{
            width: pageSize.w,
            height: pageSize.h,
            display: showCustomRugs ? "none" : "flex",
          }}
        >
          <PageFlip
            className={classNames("mainPage", { hidden: showCustomRugs })}
            size="stretch"
            minWidth={catalog_eachPageSize.w / 100}
            minHeight={catalog_eachPageSize.h / 100}
            width={catalog_eachPageSize.w / 10}
            height={catalog_eachPageSize.h / 10}
            maxWidth={catalog_eachPageSize.w}
            maxHeight={catalog_eachPageSize.h}
            maxShadowOpacity={0.5}
            useportrait={false}
            mobileScrollSupport={true}
            // onFlip={hanldePageChange}
            // onChangeOrientation={onChangeOrientation}
            // onChangeState={onChangeState}
            // onInit={onInit}
            imageClassname={"bd-main-image"}
            imageUrlPrefix={FlipPageConstants.mainPageImagesPath}
            imgAltText="beyond-dreams-pages"
            images={FlipPageConstants.mainPageImages}
            textsOverlays={FlipPageConstants.mainPageImages_text}
            changePageWithArrowKey={true}
            ref={mainPageRef}
            //showPageCorners={false}
            startPage={0}
            //arrowKeyPress={onArrowKeyPress}
          ></PageFlip>

          {FlipPageConstants && FlipPageConstants.mainPageVideoPath !== "" && (
            <VideoPlayer
              id="coverPageVideoIframe"
              className={classNames({ hidden: showCustomRugs })}
              pauseVideo={showCustomRugs}
              src={FlipPageConstants.mainPageVideoPath}
              videoType="video/mp4"
            ></VideoPlayer>
          )}
          {FlipPageConstants &&
            FlipPageConstants.mainPageCatalogImage &&
            FlipPageConstants.mainPageCatalogImage !== "" && (
              <div className="mainPageCatalogImage-container">
                <img
                  className={classNames("flipage-mainPageCatalogImage")}
                  src={FlipPageConstants.mainPageCatalogImage}
                  alt={"mainPageCatalogImage"}
                />
              </div>
            )}

          <div
            className={classNames("custom-catalog-btn", FlipPageConstants.catalogName)}
            onClick={() => setShowCustomRugs(true)}
          ></div>
        </div>

        <Flipbook
          className={classNames("custom-catalog", FlipPageConstants.catalogName, { shown: showCustomRugs })}
          showCustomRugs={showCustomRugs}
          pageWidth={FlipPageConstants.customCatalog_eachPageSize.w}
          pageHeight={FlipPageConstants.customCatalog_eachPageSize.h}
          showCover={false}
          onClose={() => setShowCustomRugs(false)}
        />
        {FlipPageConstants.OverlayVideos &&
          FlipPageConstants.OverlayVideos.hasOverlayVideos &&
          FlipPageConstants.OverlayVideos.videos.map((video, index) => (
            <>
              <OverlayVideos
                key={index}
                page={video.page}
                videoSrc={video.videoSrc}
                imageSrc={video.imageSrc}
              ></OverlayVideos>
            </>
          ))}
        {
          // <iframe
          //   src="https://v3rc.explorug.com/build/explorug.html?page=dgd&customdesignurl=PLAID A LIGHT GREY.jpg&initview=Roman Passage"
          //   title="hriweb-demo"
          //   className="demo-iframe"
          //   style={{ display: mainUiState.pageNum === 6 ? "block" : "none" }}
          // ></iframe>
        }
        {/* {
          <iframe
            src="https://hriweb.explorug.com/"
            title="hriweb-demo"
            className="demo-iframe"
            style={{ display: mainUiState.pageNum === 6 ? "block" : "none" }}
          ></iframe>
        }
        
        {
          <iframe
            src="https://demo.explorug.net/regencehome/"
            title="hriweb-demo"
            className="demo-iframe regencehome"
            style={{ display: mainUiState.pageNum === 7 ? "block" : "none" }}
          ></iframe>
        }
         {
          <iframe
            src="https://entry.explorug.com/roomview/1/"
            title="hriweb-demo"
            className="demo-iframe roomview1"
            style={{ display: mainUiState.pageNum === 8 ? "block" : "none" }}
          ></iframe>
        } */}
        {FlipPageConstants.hasExplorugPopUp && (
          <>
            <ExplorugIframePopup></ExplorugIframePopup>

            <AtSpinnerOverlay
              show={mainUiState.showMainPageLoading}
              className={classNames("atCenter", { hidden: !mainUiState.showMainPageLoading })}
            ></AtSpinnerOverlay>
          </>
        )}
      </div>
    </React.Fragment>
  );
};

MainPage.propTypes = {};

export default MainPage;
