import { assetsDomain } from "../api/appProvider";
//const flipbookConstants = window.flipbookConstants;
window.getImagesNameArray = (totalPagesNum) => {
  let arr = [];
  for (var i = 1; i <= totalPagesNum; i++) {
    let num = i < 10 ? "0" + i : i;
    const L = num + " - L.jpg";
    const R = num + " - R.jpg";
    arr.push(L);
    arr.push(R);
  }
  return arr;
};
window.getThumbsNameArray = (totalPagesNum) => {
  let arr = [];
  for (var i = 1; i <= totalPagesNum; i++) {
    let num = i < 10 ? "0" + i : i;
    const thumbName = num + "_thumb.jpg";
    arr.push(thumbName);
  }
  return arr;
};

const totalPageNum = 8;

const flipbookConstants = {
  catalogName: "StudioP-catalog",
  titleName: "Studiop Interactive Catalog",
  hasExplorugPopUp: false,
  mainPageVideoPath: `Studiop-assets/videos/Flip Catalog Cover.mp4`,
  mainPageImagesPath: "Studiop-assets/mainPages",
  customCatalogImagesPath: "Studiop-assets/pages",
  catalog_eachPageSize: { w: 1920, h: 2160 },
  customCatalog_eachPageSize: { w: 1241, h: 1749 },
  totalPageNumber: totalPageNum,
  mainPageImages: ["00 - L.jpg", "00 - R.jpg"],
  customCatalogImages: window.getImagesNameArray(totalPageNum),
  mainPageThumbs: [],
  CustomCatalogPageThumbs: window.getThumbsNameArray(totalPageNum),
  customCatalogThumbsPath: `Studiop-assets/thumbs`,
  mainPageImages_text: [],
  mainPageCatalogImage:'Studiop-assets/mainPages/01.jpg',
  customCatalogImages_text: [],
  OverlayVideos:{
    hasOverlayVideos:false,
    videos:[]
  },
};

const getAssetsPath = (path) => {
  if (!path || path === "") return "";
  if (typeof path !== "string") return "";
  path = path[0] === "/" ? path : "/" + path;
  path = path[path.length - 1] === "/" ? path : path + "/";
  const fullpath = `${assetsDomain}${path}`;
  return fullpath;
};

export const cdnFolderName = "";

export const catalogName = flipbookConstants.catalogName || "Staff-meeting";

export const titleName = flipbookConstants.titleName; //title of the page
export const hasExplorugPopUp = flipbookConstants.hasExplorugPopUp; //set to true if explorug opens in popup
export const mainPageVideoPath = `${assetsDomain}/${flipbookConstants.mainPageVideoPath}`; //path of the video if main page has a video overlay
export const mainPageImagesPath = getAssetsPath(flipbookConstants.mainPageImagesPath); // path to mainpage images
export const customCatalogImagesPath = getAssetsPath(flipbookConstants.customCatalogImagesPath); // path to flipbook images
export const mainPageCatalogImage = `${assetsDomain}/${flipbookConstants.mainPageCatalogImage}`; // path to flipbook images

export const catalog_eachPageSize = flipbookConstants.catalog_eachPageSize; //size of 1 mainpage image (eg: 01 - L.jpg size)
export const totalPageNumber = flipbookConstants.totalPageNumber;
export const customCatalog_eachPageSize = flipbookConstants.customCatalog_eachPageSize;

export const mainPageImages = flipbookConstants.mainPageImages;

export const customCatalogImages = flipbookConstants.customCatalogImages;

export const mainPageThumbs = flipbookConstants.mainPageThumbs || [];

export const CustomCatalogPageThumbs = flipbookConstants.CustomCatalogPageThumbs || [];
export const customCatalogThumbsPath = getAssetsPath(flipbookConstants.customCatalogThumbsPath) || ``; //`${assetsDomain}/Slides-assets/thumbs/`;

export const mainPageImages_text = flipbookConstants.mainPageImages_text || [];
export const customCatalogImages_text = flipbookConstants.customCatalogImages_text || [];
export const OverlayVideos = flipbookConstants.OverlayVideos;

const GetExplorugLinks = (initdesign = "") => {
  var link = "https://v3.explorug.com/explorug.html?page=beyonddreams&mode=ecat&initdesign=" + initdesign;
  return link;
};

export const customRugsLinks=[]