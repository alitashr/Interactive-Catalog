import classNames from "classnames";
import React, { PropTypes, useEffect, useState } from "react";
import { usePrevious } from "../../utils/hooks";
import { AtSpinner, AtSpinnerOverlay } from "../AtSpinner";

const PopupContainer = (props) => {
  const { showIframePopup = false, 
    iframeUrl = "", 
    onLoad, onClose,  
    iframeID="popupIframe", 
    onIframeLoadSuccess, className='', iframeContainerClassName ='' } = props;

  const previousIframeUrl = usePrevious(iframeUrl);
  
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const onIframeClick = (e) => {
    if(!e.target.className || typeof e.target.className!=='string') return;
  
    const target = e.target.className.indexOf("bd-popup-wrapper");
    if (target === 0) {
      onIframeClose();
    }
  };

  const onIframeLoad = () => {
    setIframeLoaded(true);
    if (onLoad) onLoad();
  };
  const onIframeClose = () => {
    if (onClose) onClose();
  };
  useEffect(() => {
    //console.log("iframeUrl", iframeUrl, "previousIframeUrl", previousIframeUrl);
    if (iframeUrl !== previousIframeUrl) {
      setIframeLoaded(false);
    }
  }, [iframeUrl]);

    

  useEffect(() => {
    if(!onIframeLoadSuccess) return;

    const childWindow =  document.getElementById(iframeID).contentWindow;
    
    const handler = message => {

     //console.log("useEffect -> message.source !== childWindow", iframeID, message.source === childWindow, message)
           
        if (message.source !== childWindow) {
            return; // Skip message in this event listener
        }
        console.log("useEffect -> message.data", message.data)
         
        if (message.data === "success" || message.data === "explorug loaded" ) {
          if(onIframeLoadSuccess) onIframeLoadSuccess();
        }

      }
    window.addEventListener("message",  handler);
    // clean up
    return () => window.removeEventListener("message", handler);
  }, []); // empty array => run only once

  return (
    <div
      className={classNames("bd-popup-wrapper", className, { invisible: !showIframePopup }, { visible: showIframePopup })}
      onClick={onIframeClick}
    >
      <div className="bd-popup-content">
        <button
          className="modal-video-close-btn"
          onClick={onIframeClose}
          aria-label="Close the modal by clicking here"
        ></button>
        {<AtSpinner className={classNames("atCenter popupSpinner", {"hidden": iframeLoaded})}></AtSpinner>}
       
          <div className={classNames("iframe-container", iframeContainerClassName)}>
          <iframe
            id={iframeID}
            className={classNames('popupIframe')}
            src={iframeUrl}
            title="exploRUG"
            frameBorder="0"
            allowFullScreen
            onLoad={onIframeLoad}
          />
          </div>
      
      </div>
    </div>
  );
};

PopupContainer.propTypes = {};

export default PopupContainer;
