import React, { useEffect, useRef, useState } from "react";

import classNames from "classnames";

import FlipPageConstants from "../../constants/constants";

import { postMessageToExplorugIframe } from "../../utils/domutils";
import PageFlip from "../PageFlip";
import { Tooltip2 } from "@blueprintjs/popover2";
import { assetsDomain } from "../../api/appProvider";
import { mainUiActions, useUiDispatch, useUiState } from "../../reducers/mainUI.reducer";
import PagePreviewBar from "../Page-preview-bar";
import { flipPage, setPageDims } from "../../utils/utils";
import { useWindowSize } from "react-use";
import FullscreenButton from "../FullscreenButton";
import OverlayDivArea from "../Overlay-div-area";
import { useEditorState } from "../../reducers/overlayEditor.reducer";

const Flipbook = (props) => {
  const {
    className,
    showCustomRugs = true,
    disableFlipOnRandomClick = true,
    pageWidth = 1920,
    pageHeight = 2160,
    showCover = false,
    onClose,
    //onLinkClick
  } = props;
  const customRugsRef = React.useRef(); // React.createRef();   use React.useRef() for functional component;
  window.customRugsRef = customRugsRef;
  const containerref = useRef(null);
  const [pageState, setPageState] = useState("");
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  //console.log("Flipbook -> currentPageNumber", currentPageNumber);
  const [activeDivValues, setActiveDivValues] = useState(null);

  const [active, setActive] = useState(false);
  const mainUIDispatch = useUiDispatch();
  const mainUIState = useUiState();
  const editorState = useEditorState();

  const { width: windowWidth, height: windowHeight } = useWindowSize();
  const [pageSize, setPageSize] = useState({ w: windowWidth, h: windowHeight });

  const customRugsLinks = FlipPageConstants.customRugsLinks;
  const customCatalog_eachPageSize = FlipPageConstants.customCatalog_eachPageSize;

  useEffect(() => {
    const pageDims = setPageDims(windowWidth, windowHeight, customCatalog_eachPageSize);
    setPageSize(pageDims);
  }, []);

  useEffect(() => {
    const pageDims = setPageDims(windowWidth, windowHeight, customCatalog_eachPageSize);
    setPageSize(pageDims);
  }, [windowWidth, windowHeight]);

  const onPage = (e) => {
    //console.log("currentPageNumber", currentPageNumber);
    
    if (customRugsRef && customRugsRef.current)
    {
      const pageNUM =customRugsRef.current.pageFlip().getCurrentPageIndex() / 2 + 1;
      setCurrentPageNumber(pageNUM);
      mainUIDispatch({
        type: mainUiActions.SET_PAGENUM,
        payload: pageNUM,
      });
      //console.log("currentPageNumber", currentPageNumber, pageNUM, customRugsRef.current.pageFlip().getCurrentPageIndex());
    }
   
  };
  const onChangeOrientation = (e) => {
    //console.log("customrugs onChangeOrientation", e.data);
  };
  const onChangeState = (e) => {
    //console.log("customrugs onChangeState---", customRugsRef.current.pageFlip());
    setPageState(e.data);
    if (e.data === "flipping") {
      //setCurrentPage(pageViews.OTHER);
      mainUIDispatch({
        type: mainUiActions.SET_PAGENUM,
        payload: 0,
      });
    }
  };

  const onLinkClick = (url) => {
    try {
      if (url.indexOf("newtab:-") !== -1) {
        window.open(url.replace('newtab:-',''), "_blank");
      } else if (url.indexOf("initdesign") > 0) {
        postMessageToExplorugIframe(url);
        setTimeout(() => {
          mainUIDispatch({
            type: mainUiActions.SET_EXPLORUGPOPUP,
            payload: true,
          });
        }, 1000);
      } else throw url;
    } catch {
      window.open(url, "_blank");
    }
  };
  // const handleOverlayDivClick = (divElement, e, divIndex) => {
  //   //console.log("handleOverlayDivClick -> link", link);
  //   const link = divElement.Link;
  //   if (pageState !== "fold_corner") {
  //     if (editorState.editorMode) {
  //       setActive(divIndex);
  //       setActiveDivValues(divElement);
  //       console.log("handleOverlayDivClick -> divElement", divElement);
  //     } else if (onLinkClick) {
  //       onLinkClick(link);
  //     } else {
  //       window.open(link, "_blank");
  //     }
  //     e.stopPropagation();
  //   }
  // };

  const overlayDivHover = (e) => {
    if (!customRugsRef) return;
    const currentState = customRugsRef.current.pageFlip().getSettings().showPageCorners;
    if (currentState) {
      customRugsRef.current.pageFlip().flipController.showCorner("TOP");
      customRugsRef.current.pageFlip().getSettings().showPageCorners = false;
    }
  };
  const overlayMouseOut = (e) => {
    if (!customRugsRef) return;
    const currentState = customRugsRef.current.pageFlip().getSettings().showPageCorners;
    if (!currentState) {
      customRugsRef.current.pageFlip().getSettings().showPageCorners = true;
    }
  };

  const handleActionKnobClick = (e, link) => {
    console.log("handleActionKnobClick");
    if (onLinkClick) {
      onLinkClick(link);
    } else {
      window.open(link, "_blank");
    }
    e.stopPropagation();
  };

  const onFlipBookClick = (e) => {
    e.stopPropagation();
    if (e.target.className === "stf__block") {
      if (onClose) onClose();
    }
  };

  const handlePageThumbClick = (index) => {
    let number = Math.round(index * 2);
    number = number === 0 ? 1 : number;

    setCurrentPageNumber(number);
    // setPageName(number);
    customRugsRef.current.pageFlip().turnToPage(number);
    setTimeout(() => {
      //
    }, 1000);
  };
  const turnPage = (direction) => {
    flipPage(direction, customRugsRef);
  };

  return (
    <>
      <div
        id="flipbook"
        className={classNames("flipbook-custom-catalog fullview", className, { hideCustomCatalog: !showCustomRugs })}
        onClick={(e) => onFlipBookClick(e)}
        style={{
          width: pageSize.w,
          height: pageSize.h,
        }}
        ref={containerref}
      >
        {/* <div className="bd-actionButtons-container">
         <FullscreenButton containerref={containerref}/>
      </div> */}
        <PageFlip
          className="custom-catalog"
          size="stretch"
          minWidth={pageWidth / 100}
          minHeight={pageHeight / 100}
          width={pageWidth / 10}
          height={pageHeight / 10}
          maxWidth={pageWidth}
          maxHeight={pageHeight}
          maxShadowOpacity={0.5}
          mobileScrollSupport={true}
          onFlip={onPage}
          onChangeOrientation={onChangeOrientation}
          onChangeState={onChangeState}
          useportrait={false}
          imageClassname={"custom-catalog-image"}
          imageUrlPrefix={FlipPageConstants.customCatalogImagesPath}
          imgAltText="custom-catalog-page"
          images={FlipPageConstants.customCatalogImages}
          changePageWithArrowKey={false}
          ref={customRugsRef}
          pageState={pageState}
          disableFlipOnRandomClick={disableFlipOnRandomClick}
          textsOverlays={FlipPageConstants.customCatalogImages_text}
          showCover={showCover}
        ></PageFlip>

        {/* <div className="overlay-div-area">
          {customRugsLinks &&
            customRugsLinks.map(
              (pageElement, index) =>
                pageElement.values && (
                  <div
                    className={classNames(
                      "overlay-divs-container",
                      `${pageElement.page}div`,
                      {
                        hidden: Number(pageElement.page) !== currentPageNumber,
                      },
                      {
                        editorMode: mainUIState.editorMode,
                      }
                    )}
                    key={generateKey(index)}
                  >
                    {pageElement.values.map((divElement, divIndex) => (
                      <React.Fragment>
                        <div
                          id={`custom-rugs-overlay-divs-${pageElement.page}-${divIndex}div`}
                          className={classNames(
                            "custom-rugs-overlay-divs",
                            `${pageElement.page}div`,
                            { card: divElement.Card },
                            { hidden: Number(pageElement.page) !== currentPageNumber },
                            {
                              activeDiv:
                                mainUIState.editorMode &&
                                divIndex === active &&
                                Number(pageElement.page) === currentPageNumber,
                            }
                          )}
                          key={generateKey(divIndex)}
                          style={{
                            width: divElement.Width || "",
                            height: divElement.Height || "",
                            left: divElement.Left || "",
                            top: divElement.Top || "",
                          }}
                          onClick={(e) => handleOverlayDivClick(divElement, e, divIndex)}
                          onMouseEnter={(e) => overlayDivHover(e, divElement)}
                          onMouseOut={(e) => overlayMouseOut(e, divElement)}
                         // onMouseDown={(e)=>setMouseDown(true)}
                        ></div>
                      </React.Fragment>
                    ))}
                  </div>
                )
            )}

          {customRugsLinks && (
            <CustomRugsLinkKnobs
              customRugsLinks={customRugsLinks}
              currentPageNumber={currentPageNumber}
              pageState={pageState}
              handleActionKnobClick={handleActionKnobClick}
            ></CustomRugsLinkKnobs>
          )}
        </div>
      */}

        <OverlayDivArea
          currentPageNumber={currentPageNumber}
          overlayDivHover={overlayDivHover}
          overlayMouseOut={overlayMouseOut}
          onLinkClick={onLinkClick}
          pageState={pageState}
        ></OverlayDivArea>
      </div>

      <PagePreviewBar
        className={classNames(FlipPageConstants.catalogName, { hidden: !showCustomRugs })}
        thumbs={FlipPageConstants.CustomCatalogPageThumbs}
        handlePageThumbClick={handlePageThumbClick}
        currentPageNumber={currentPageNumber}
        flipPage={turnPage}
        idleThresholdTime={FlipPageConstants.idleThresholdTime}
      />
    </>
  );
};

export default Flipbook;

const generateKey = (pre) => {
  const key = `${pre}_${new Date().getTime()}`;
  //console.log("generateKey -> key", key);

  return key;
};
