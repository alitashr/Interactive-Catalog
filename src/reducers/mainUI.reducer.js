import React from "react";
import {explorugPopUpUrl} from "../constants/InTheClouds-catalog-constants";

const UiStateContext = React.createContext();
const UiDispatchContext = React.createContext();

const SET_RUGINROOMPOPUP = "SET_RUGINROOMPOPUP";
const SET_EXPLORUGPOPUP = "SET_EXPLORUGPOPUP";
const SET_EXPLORUGPOPUPURL = "SET_EXPLORUGPOPUPURL";
const SET_EXHIBITIONPOPUP = "SET_EXHIBITIONPOPUP";
const SET_EXHIBITIONPOPUPURL = "SET_EXHIBITIONPOPUPURL";
const SET_SHOWMAINPAGELOADING = "SET_SHOWMAINPAGELOADING";
const SET_POPUPIFRAMEURL = "SET_POPUPIFRAMEURL";
const SET_SHOWPOPUPIFRAME = "SET_SHOWPOPUPIFRAME";
const SET_SHOWMOSAICDESIGNPOPUP = "SET_SHOWMOSAICDESIGNPOPUP";
const SET_MOSAICDESIGNURL = "SET_MOSAICDESIGNURL";
const SET_SHOWCONTACTPOPUP = "SET_SHOWCONTACTPOPUP";
const SET_ALLOW_PAGEFLIP_BYARROWKEY = "SET_ALLOW_PAGEFLIP_BYARROWKEY";
const SET_MAILTO_EMAILADDRESS = "SET_MAILTO_EMAILADDRESS";
const SET_RUGINROOM_IFRAMELOADED = "SET_RUGINROOM_IFRAMELOADED";
const SET_PAGENUM = "SET_PAGENUM";

const mainUiActions = {
  SET_RUGINROOMPOPUP,
  SET_EXPLORUGPOPUP,
  SET_EXPLORUGPOPUPURL,
  SET_EXHIBITIONPOPUP,
  SET_EXHIBITIONPOPUPURL,
  SET_SHOWMAINPAGELOADING,
  SET_POPUPIFRAMEURL,
  SET_SHOWPOPUPIFRAME,
  SET_SHOWMOSAICDESIGNPOPUP,
  SET_MOSAICDESIGNURL,
  SET_ALLOW_PAGEFLIP_BYARROWKEY,
  SET_SHOWCONTACTPOPUP,
  SET_MAILTO_EMAILADDRESS,
  SET_RUGINROOM_IFRAMELOADED,
  SET_PAGENUM
};
const initialUiState = {
  showRugInRoomPopup: false,
  rugInRoomIframeLoaded: false,
  showExplorugPopup: false,
  explorugPopUpUrl:
    //"https://v3dev.explorug.com/build/explorug.html?page=beyonddreams2&?&initdesign=Designs/Artwork/Bamboo.ctf&mode=ecat&customclass=no-color-customization"
    //"https://v3dev.explorug.com/build/explorug.html?page=beyonddreams2&?&initdesign=Designs/Artwork/Assorted Design/Tappeto Classico.ctf&mode=ecat&customclass=no-color-cust selected-views-only view-tappeto",
  //"http://localhost:23456/?page=beyonddreams2",
  explorugPopUpUrl,
  //"https://v3.explorug.com/explorug.html?page=beyonddreams&mode=ecat&initdesign=2021%20EPI2/designs/Distant%20Waves",
  //"https://v3.explorug.com/explorug.html?page=dgd&mode=ecat&initdesign=PLAID%20A%20LIGHT%20GREY&initview=Lounge",

  showExhibitionPopup: false,
  exhibitionPopUpUrl: "",
  showMainPageLoading: true,
  popupIframeUrl: "",
  showPopupIframe: false,
  showMosaicDesignIframe: false,
  mosaicDesignUrl: "",
  allowPageFlipByArrowKey: true,
  showContactPopup: false,
  mailToEmailAddress: "",
  pageNum:1

  //"https://v3.explorug.com/explorug.html?page=beyonddreams2&initdesign=Designs/Artwork/Assorted%20Design/Tappeto%20Classico.ctf&mode=ecat&customclass=no-color-cust"
};
const mainUiReducer = (state, action) => {
  const { type, payload } = action;
  // console.log(type)
  switch (type) {
    case SET_RUGINROOMPOPUP:
      return { ...state, showRugInRoomPopup: payload, allowPageFlipByArrowKey: !payload };
    case SET_EXPLORUGPOPUP:
      return { ...state, showExplorugPopup: payload, allowPageFlipByArrowKey: !payload };
    case SET_EXPLORUGPOPUPURL:
      return { ...state, explorugPopUpUrl: payload };
    case SET_EXHIBITIONPOPUP:
      return { ...state, showExhibitionPopup: payload, allowPageFlipByArrowKey: !payload };
    case SET_EXHIBITIONPOPUPURL:
      return { ...state, exhibitionPopUpUrl: payload };
    case SET_SHOWMAINPAGELOADING:
      return { ...state, showMainPageLoading: payload };
    case SET_POPUPIFRAMEURL:
      return { ...state, popupIframeUrl: payload, allowPageFlipByArrowKey: !payload };
    case SET_SHOWPOPUPIFRAME:
      return { ...state, showPopupIframe: payload, allowPageFlipByArrowKey: !payload };
    case SET_SHOWMOSAICDESIGNPOPUP:
      return { ...state, showMosaicDesignIframe: payload, allowPageFlipByArrowKey: !payload };
    case SET_MOSAICDESIGNURL:
      return { ...state, mosaicDesignUrl: payload };
    case SET_SHOWCONTACTPOPUP:
      return { ...state, showContactPopup: payload, allowPageFlipByArrowKey: !payload };
    case SET_MAILTO_EMAILADDRESS:
      return { ...state, mailToEmailAddress: payload };
    case SET_RUGINROOM_IFRAMELOADED:
      return { ...state, rugInRoomIframeLoaded: payload };
    case SET_PAGENUM:
      return {...state, pageNum: payload}
    default:
      return state;
  }
};
function UiStateProvider({ children }) {
  const [state, dispatch] = React.useReducer(mainUiReducer, initialUiState);
  return (
    <UiStateContext.Provider value={state}>
      <UiDispatchContext.Provider value={dispatch}>{children}</UiDispatchContext.Provider>
    </UiStateContext.Provider>
  );
}
function useUiState() {
  const context = React.useContext(UiStateContext);
  if (context === undefined) {
    throw new Error("useCountState must be used within a CountProvider");
  }
  return context;
}
function useUiDispatch() {
  const context = React.useContext(UiDispatchContext);
  if (context === undefined) {
    throw new Error("useCountDispatch must be used within a CountProvider");
  }
  return context;
}
export { UiStateProvider, useUiState, useUiDispatch, mainUiActions };
