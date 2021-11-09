import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import { useIdle } from "react-use";
import { assetsDomain } from "../../api/appProvider";
import FlipPageConstants from "../../constants/constants";

const PagePreviewBar = (props) => {
  const { thumbs, handlePageThumbClick, currentPageNumber, flipPage, className, idleThresholdTime= 10000 } = props;
  const [showPreviewBar, setShowPreviewBar] = useState(true);
  const thumbContainerRef= useRef(null);

  const isIdle = useIdle(idleThresholdTime, false, ["mousemove", "mousedown", "resize", "keydown", "touchstart", "wheel"]);
  useEffect(() => {
    if (isIdle && showPreviewBar) setShowPreviewBar(!showPreviewBar);
  }, [isIdle]);

  const handleToggleIcon = () => {
    setShowPreviewBar(!showPreviewBar);
  };
  const handleMainPageThumbClick = (index) => {
    if (handlePageThumbClick) handlePageThumbClick(index);
  };
  const isActive = (currentPageNumber, index) => {
    const isActivePage = currentPageNumber-1 === index;// Math.round(currentPageNumber / 2) === index;
    return isActivePage;
  };
  const handleNavigator = (direction) => {
    let offsetValue = direction === 'right' ? thumbContainerRef.current.offsetWidth/2: -1*thumbContainerRef.current.offsetWidth/2; 
    thumbContainerRef.current.scrollLeft += offsetValue;
  };
  return (
    <div className={classNames("bg-page-preview-bar", { "pull-down": !showPreviewBar }, className)}>
      <div className="bd-page-preview-icons">
      {
        FlipPageConstants && FlipPageConstants.customCatalogThumbsPath!=='' &&
        (
          <>
          <img
          alt="hidethumb-icon"
          src={`${assetsDomain}/icons/hidethumbpanel.svg`}
          className={classNames("toggleicons hide-thumb", { pullUp: !showPreviewBar })}
          onClick={handleToggleIcon}
        />
       
         <img
          alt="toleft-icon"
          src={`${assetsDomain}/icons/toleft.svg`}
          className="navigator left pagethumbNavigator"
          onClick={() => handleNavigator("left")}
        ></img>
        <img
          alt="toleft-icon"
          src={`${assetsDomain}/icons/toright.svg`}
          className="navigator right pagethumbNavigator"
          onClick={() => handleNavigator("right")}
        ></img>
        </>
        )}
      
        <img
          alt="toleft-icon"
          src={`${assetsDomain}/icons/hidethumbpanel.svg`}
          className={classNames("navigator left pageflip-navigators", {
            hidden: currentPageNumber === 1,
          })}
          onClick={() => flipPage("prev")}
        ></img>
        <img
          alt="toright-icon"
          src={`${assetsDomain}/icons/hidethumbpanel.svg`}
          className= {classNames("navigator right pageflip-navigators", {
            hidden: currentPageNumber=== FlipPageConstants.totalPageNumber,
          })}
          onClick={() => flipPage("next")}
        ></img>

       
      </div>
      {
        FlipPageConstants && FlipPageConstants.customCatalogThumbsPath!=='' &&
        (
       
        <div className="bd-page-preview" ref={thumbContainerRef}>
          <div className={classNames("bd-page-preview-container")}>
            {thumbs &&
              thumbs.map((thumb, index) => (
                <div
                  className={classNames("bd-page-preview-thumb", { active: isActive(currentPageNumber, index) })}
                  key={index}
                  onClick={() => handleMainPageThumbClick(index)}
                >
                  <img src={`${FlipPageConstants.customCatalogThumbsPath}/${thumb}`} alt="" />
                </div>
              ))}
          </div>
        </div>
        )}
    </div>
  );
};

PagePreviewBar.propTypes = {};

export default PagePreviewBar;
