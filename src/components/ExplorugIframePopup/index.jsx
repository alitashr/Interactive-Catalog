import React, { PropTypes } from 'react';
import { mainUiActions, useUiDispatch, useUiState } from '../../reducers/mainUI.reducer';
import PopupContainer from '../Popup-Container';

const ExplorugIframePopup = props => {
  
  const { iframeID = "explorugIframe"} = props;
  const mainUiState = useUiState();
  const mainUIDispatch = useUiDispatch();
  
  const onIframeLoad = () => {
    console.log("loaded.....explorugIframe...... iframe");
    mainUIDispatch({
      type: mainUiActions.SET_SHOWMAINPAGELOADING,
      payload: false,
    });
  };

  const onPopupClose=(e)=>{
    mainUIDispatch({
      type: mainUiActions.SET_EXPLORUGPOPUP,
      payload: false
    })
  }

  return (
    <React.Fragment>
    <PopupContainer
    className="explorugIframe-wrapper"
     showIframePopup={mainUiState.showExplorugPopup}
      iframeUrl = {mainUiState.explorugPopUpUrl}
       onLoad={onIframeLoad}
       onIframeLoadSuccess = {onIframeLoad}
       onClose={onPopupClose} 
       isMosaic={false}
       iframeID={iframeID}

    ></PopupContainer>
    </React.Fragment>
  );
};

ExplorugIframePopup.propTypes = {
  
};

export default ExplorugIframePopup;