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
  catalogName: "HRI-catalog",
  titleName: "HRI Interactive Catalog",
  hasExplorugPopUp: true,
  mainPageVideoPath: `HRI-assets/videos/Flip Catalog Cover.mp4`,
  mainPageImagesPath: "HRI-assets/mainPages",
  customCatalogImagesPath: "HRI-assets/pages",
  catalog_eachPageSize: { w: 1920, h: 2160 },
  customCatalog_eachPageSize: { w: 1241, h: 1749 },
  totalPageNumber: totalPageNum,
  mainPageImages: ["00 - L.jpg", "00 - R.jpg"],
  customCatalogImages: window.getImagesNameArray(totalPageNum),
  mainPageThumbs: [],
  CustomCatalogPageThumbs: window.getThumbsNameArray(totalPageNum),
  customCatalogThumbsPath: `HRI-assets/thumbs`,
  mainPageImages_text: [],
  customCatalogImages_text: [],
  OverlayVideos:{
    hasOverlayVideos:true,
    videos:[{
      page:7,
      videoSrc:"HRI-assets/videos/PLAID A LIGHT GREY in Roman Passage.mp4",
      imageSrc:"HRI-assets/pages/07 - R_text.png"
    }]
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
export const customRugsLinks = [
  {
    page: 1,
    values: [
      {
        Width: "23.788%",
        Height: "10.1%",
        Left: "5.088%",
        Top: "83.401%",
        Link: "https://hri.explorug.net/?dts=5&dname=PLAID%20B%20DARK%20GREY",
      },
    ],
  },
  {
    page: 2,
    values: [
      {
        Width: "25.391%",
        Height: "10.219%",
        Left: "4.732%",
        Top: "83.28%",
        Link: "https://hri.explorug.net/?dts=5&dname=PLAID%20B%20DARK%20GREY",
      },
    ],
  },
  {
    page: 3,
    values: [
      {
        Width: "24.88%",
        Height: "10.113%",
        Left: "70.198%",
        Top: "83.823%",
        Link: "https://v3.explorug.com/explorug.html?page=dgd&mode=ecat&initdesign=PLAID%20A%20LIGHT%20GREY&initview=Lounge",
      },
    ],
  },
  {
    page: 4,
    values: [
      {
        Width: "28.017%",
        Height: "10.113%",
        Left: "4.81%",
        Top: "83.605%",
        Link: "https://hri.explorug.net/?dts=0&dname=2L%202C%20SLATE",
      },
    ],
  },
  {
    page: 5,
    values: [
      {
        Width: "30.065%",
        Height: "9.474%",
        Left: "66.063%",
        Top: "83.496%",
        Link: "https://v3.explorug.com/explorug.html?page=dgd&mode=ecat&initdesign=Network Gravel.ctf&initview=myroom",
      },
    ],
  },
  {
    page: 6,
    values: [
      {
        Width: "33.122%",
        Height: "11.148%",
        Left: "62.081%",
        Top: "82.174%",
        Link: "https://v3.explorug.com/explorug.html?page=dgd&mode=ecat&initdesign=3L 3C CLOUD.ctf&initview=perspectiveview",
      },
    ],
  },
  {
    page: 7,
    values: [
      {
        Width: "26.816%",
        Height: "10.149%",
        Left: "69.023%",
        Top: "83.043%",
        Link: "newtab:-https://v3.explorug.com/explorug.html?page=dgd&initdesign=PLAID%20A%20LIGHT%20GREY.ctf&initview=Roman%20Passage",
      },
    ],
  },
  {
    page: 8,
    values: [
      {
        Width: "34.722%",
        Height: "17.928%",
        Left: "0.079%",
        Top: "74.025%",
        Link: "https://v3.explorug.com/explorug.html?page=dgd&mode=ecat&initdesign=SOLID%20TIP%20SHEARED%20GREY.ctf&initview=Living%20Room%20Dotinus",
      },
    ],
  },
];
