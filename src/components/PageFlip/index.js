import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useKey, useWindowSize } from "react-use";
import HTMLFlipBook from "react-pageflip";
import classNames from "classnames";
//import PageHtml from "../PageHtml";

const Page = React.forwardRef((props, ref) => {
  const { id = "", key, imageUrl, imageClassname = "", imageUrlPrefix = "", imgAltText = "", textOverlay, textOverlayClassName="" } = props;
  return (
    <div id={id} className="page" ref={ref}>
      <img className={classNames("flipage-image", imageClassname)} src={imageUrlPrefix + imageUrl} alt={imgAltText} />
      {textOverlay && (
        <img
          className={classNames("flipage-image-text", imageClassname, textOverlayClassName)}
          src={imageUrlPrefix + textOverlay}
          alt={imgAltText}
        />
      )}
    </div>
  );
});

const PageHTML = React.forwardRef((props, ref) => {
  return (
      <div className="demoPage" ref={ref}>
          <h1>Page Header</h1>
          <p>{props.children}</p>
          <p>Page number: {props.number}</p>
      </div>
  );
});

const PageFlip = React.forwardRef((props, ref) => {
  const {
    className,
    onFlip,
    onChangeOrientation,
    onChangeState,
    onInit,
    images = [],
    width,
    height,
    minWidth,
    maxWidth,
    minHeight,
    maxHeight,
    maxShadowOpacity = 0.5,
    mobileScrollSupport = true,
    useportrait = false,
    showPageCorners = true,
    imageClassname='',
    imageUrlPrefix,
    imgAltText,
    changePageWithArrowKey,
    startPage = 0,
    disableFlipOnRandomClick = true,
    textsOverlays = [],
    arrowKeyPress,
    showCover
  } = props;
  
  const { width: windowWidth, height: windowHeight } = useWindowSize();

  useKey("ArrowRight", (e) => {
    if(changePageWithArrowKey && e.target.nodeName!=="INPUT" && arrowKeyPress){
      arrowKeyPress(e,'next');
    }

    // if (changePageWithArrowKey && ref.current && e.target.nodeName !== "INPUT" && mainUiState.allowPageFlipByArrowKey)
    //   ref.current.pageFlip().flipNext();
    
  });

  useKey("ArrowLeft", (e) => {
    if (changePageWithArrowKey && ref.current && e.target.nodeName !== "INPUT")
      ref.current.pageFlip().flipPrev();
  });

  useKey("ArrowUp", () => {
    if (ref.current) {
      ref.current.pageFlip().update();
    }
  });
  useEffect(() => {
    if (!ref) return;
    setTimeout(() => {
    if(ref.current)
     ref.current.pageFlip().update();
    }, 200); 
  }, [windowWidth, windowHeight]);

  const handlePageStateChange = (e) => {
    if (onChangeState) onChangeState(e);
  };
  const onPageInit = (e) => {
    if (onInit) onInit(e);
  };
  return (
    <React.Fragment>
      <HTMLFlipBook
        className={classNames("flip-book", className)}
        width={width}
        height={height}
        size="stretch"
        minWidth={minWidth}
        maxWidth={maxWidth}
        minHeight={minHeight}
        maxHeight={maxHeight}
        maxShadowOpacity={maxShadowOpacity}
        mobileScrollSupport={mobileScrollSupport}
        useportrait={useportrait}
        onFlip={(e) => (onFlip ? onFlip(e) : null)}
        onFold={(e) => console.log("flip", e)}
        onChangeOrientation={(e) => {
          if (onChangeOrientation) onChangeOrientation(e);
        }}
        onChangeState={handlePageStateChange}
        onInit={onPageInit}
        ref={ref}
        //showPageCorners={false}
        swipeDistance={10}
        startPage={startPage}
        showCover={showCover}
      >
        {images &&
          images.map((imageUrl, index) => (
            <Page
              className="page"
              id={`${className}-page-${index}`}
              key={index}
              imageUrl={imageUrl}
              imageClassname={imageClassname}
              imageUrlPrefix={imageUrlPrefix}
              imgAltText={imgAltText}
              textOverlay={
                textsOverlays.length > 0 && textsOverlays[index] && textsOverlays[index] !== ""
                  ? textsOverlays[index]
                  : null
              }
              textOverlayClassName="text_overlay"
            ></Page>

          ))}
      </HTMLFlipBook>

      {disableFlipOnRandomClick && <div className="flipbook-overlay"></div>}
    </React.Fragment>
  );
});

PageFlip.propTypes = {
  className: PropTypes.string,
  onFlip: PropTypes.func,
  onChangeOrientation: PropTypes.func,
  onChangeState: PropTypes.func,
  images: PropTypes.array,
  width: PropTypes.number,
  height: PropTypes.number,
  minWidth: PropTypes.number,
  maxWidth: PropTypes.number,
  minHeight: PropTypes.number,
  maxHeight: PropTypes.number,
  maxShadowOpacity: PropTypes.number,
  mobileScrollSupport: PropTypes.bool,
  useportrait: PropTypes.bool,
  imageClassname: PropTypes.string,
  imageUrlPrefix: PropTypes.string,
  imgAltText: PropTypes.string,
  changePageWithArrowKey: PropTypes.bool,
};

export default PageFlip;
