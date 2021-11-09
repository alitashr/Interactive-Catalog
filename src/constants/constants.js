import { assetsDomain } from "../api/appProvider";

import {
  cdnFolderName,
  catalogName,
  titleName,
  mainPageImagesPath,
  customCatalogImagesPath,
  customCatalogThumbsPath,
  catalog_eachPageSize,
  customCatalog_eachPageSize,
  mainPageImages,
  mainPageThumbs,
  CustomCatalogPageThumbs,
  mainPageImages_text,
  customCatalogImages,
  customCatalogImages_text,
  mainPageVideoPath,
  customRugsLinks,
  hasExplorugPopUp,
  totalPageNumber,
  OverlayVideos,
  mainPageCatalogImage
} from "./InTheClouds-catalog-constants";

export const cdnFolder = cdnFolderName;

const idleThresholdTime = 3000;

export const fullscreenbtnsrc = [
  `${assetsDomain}/icons/enter-fullscreen.svg`,
  `${assetsDomain}/icons/exit-fullscreen.svg`,
];

const FlipPageConstants = {
  catalogName,
  titleName,
  mainPageVideoPath,
  mainPageImagesPath,
  customCatalogImagesPath,
  customCatalogThumbsPath,
  catalog_eachPageSize,
  customCatalog_eachPageSize,
  mainPageImages,
  mainPageThumbs,
  CustomCatalogPageThumbs,
  mainPageImages_text,
  customCatalogImages,
  customRugsLinks,
  customCatalogImages_text,
  idleThresholdTime,
  hasExplorugPopUp,
  totalPageNumber,
  OverlayVideos,
  mainPageCatalogImage
};
export default FlipPageConstants;
