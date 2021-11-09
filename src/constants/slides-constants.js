import { assetsDomain } from "../api/appProvider";
//const flipbookConstants = window.flipbookConstants;

  const totalPageNum = 13;
  
  const flipbookConstants = {
    catalogName: "Staff-meeting",
    titleName: "Staff-meeting 2078 Shrawan",
    hasExplorugPopUp: false,
    mainPageVideoPath: "",
    mainPageImagesPath: "Shrawan-slides-assets/mainPages",
    customCatalogImagesPath: "Shrawan-slides-assets/pages",
    catalog_eachPageSize: { w: 1920, h: 2160 },
    totalPageNumber: totalPageNum,
    mainPageImages: ["0_L.jpg", "0_R.jpg"],
    customCatalogImages: window.getImagesNameArray(totalPageNum),
    mainPageThumbs: [],
    CustomCatalogPageThumbs: [],
    customCatalogThumbsPath: ``,
    mainPageImages_text: [],
    customCatalogImages_text: [],
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
export const mainPageVideoPath = getAssetsPath(flipbookConstants.mainPageVideoPath); //path of the video if main page has a video overlay
export const mainPageImagesPath = getAssetsPath(flipbookConstants.mainPageImagesPath); // path to mainpage images
export const customCatalogImagesPath = getAssetsPath(flipbookConstants.customCatalogImagesPath); // path to flipbook images

export const catalog_eachPageSize = flipbookConstants.catalog_eachPageSize; //size of 1 mainpage image (eg: 01 - L.jpg size)
export const totalPageNumber = flipbookConstants.totalPageNumber;
export const customCatalog_eachPageSize = catalog_eachPageSize;

export const mainPageImages = flipbookConstants.mainPageImages;

export const customCatalogImages = flipbookConstants.customCatalogImages;

export const mainPageThumbs = flipbookConstants.mainPageThumbs || [];

export const CustomCatalogPageThumbs = flipbookConstants.CustomCatalogPageThumbs || [];
export const customCatalogThumbsPath = flipbookConstants.customCatalogThumbsPath || ``; //`${assetsDomain}/Slides-assets/thumbs/`;

export const mainPageImages_text = flipbookConstants.mainPageImages_text || [];
export const customCatalogImages_text = flipbookConstants.customCatalogImages_text || [];

const GetExplorugLinks = (initdesign = "") => {
  var link = "https://v3.explorug.com/explorug.html?page=beyonddreams&mode=ecat&initdesign=" + initdesign;
  return link;
};
export const customRugsLinks = [];
