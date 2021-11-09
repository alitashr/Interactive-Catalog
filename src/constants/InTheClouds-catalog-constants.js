import { assetsDomain } from "../api/appProvider";
export const cdnFolderName = "InTheClouds";

export const catalogName = "inTheClouds-catalog";

export const titleName = "Catalog - In The Clouds";
export const hasExplorugPopUp = true;
export const mainPageVideoPath = `${assetsDomain}/InTheClouds-assets/videos/Flip Catalog Cover.mp4`;
export const mainPageImagesPath = `${assetsDomain}/InTheClouds-assets/mainPages/`;
export const customCatalogImagesPath = `${assetsDomain}/InTheClouds-assets/pages/`;

export const catalog_eachPageSize = {w: 1920, h:2160} 
export const totalPageNumber = 11;
export const customCatalog_eachPageSize = catalog_eachPageSize;
export const  mainPageCatalogImage = '';
 
export const mainPageImages = [
  "01 - L.jpg",
  "01 - R.jpg"
];

export const mainPageThumbs=[
  "01.jpg"
];

export const CustomCatalogPageThumbs=[];
export const customCatalogThumbsPath = ``;

export const mainPageImages_text=[
  "",
  "01 - R_Text.png",
]
export const customCatalogImages_text = []

export const customCatalogImages = [
  "01 - L.jpg",
  "01 - R.jpg",
  "02 - L.jpg",
  "02 - R.jpg",
  "03 - L.jpg",
  "03 - R.jpg",
  "04 - L.jpg",
  "04 - R.jpg",
  "05 - L.jpg",
  "05 - R.jpg",
  "06 - L.jpg",
  "06 - R.jpg",
  "07 - L.jpg",
  "07 - R.jpg",
  "08 - L.jpg",
  "08 - R.jpg",
  "09 - L.jpg",
  "09 - R.jpg",
  "10 - L.jpg",
  "10 - R.jpg",
  "11 - L.jpg",
  "11 - R.jpg",
];
export const  OverlayVideos={
  hasOverlayVideos:false,
  videos:[]
};
const GetExplorugLinks = (initdesign='')=>{
  var link = 'https://v3.explorug.com/explorug.html?page=beyonddreams&mode=ecat&initdesign='+initdesign;
  return link
}
export const customRugsLinks = [
  {
    page: 1,
    values: [
      {
        Width: "0%",
        Height: "0%",
        Left: "0%",
        Top: "0%",
        Link: "",
      },
    ],
  },
  {
    page: 2,
    values: [
      {
        Width: "80%",
        Height: "100%",
        Left: "10%",
        Top: "0%",
        Link:
        GetExplorugLinks('2021%20EPI2/designs/Distant%20Waves'), //"https://v3.explorug.com/explorug.html?page=beyonddreams&mode=ecat&initdesign=2021%20EPI2/designs/Distant%20Waves",
        Knob: {
          Left: "21.5%",
          Top: "80%",
        },
      }
    ],
  },
  {
    page: 4,
    values: [
      {
        Width: "30.2%",
        Height: "71.6%",
        Left: "3.1%",
        Top: "12.34%",
        Link:
        GetExplorugLinks('Designs/2021 EPI2/designs/.Fiji Sands/Fiji Sands Coral.ctf'), //"https://v3.explorug.com/explorug.html?page=beyonddreams&mode=ecat&initdesign=Designs/2021 EPI2/designs/.Fiji Sands/Fiji Sands Coral.ctf",
        Knob: {
          Left: "17.5%",
          Top: "83.3%",
        },
      },
      {
        Width: "30.2%",
        Height: "71.6%",
        Left: "34.97%",
        Top: "12.34%",
        Link:
        GetExplorugLinks('Designs/2021 EPI2/designs/.Fiji Sands/Fiji Sands Fluorescence.ctf'),
        Knob: {
          Left: "49.5%",
          Top: "83.3%",
        },
      },
      {
        Width: "30.2%",
        Height: "71.6%",
        Left: "66.7%",
        Top: "12.9%",
        Link:
        GetExplorugLinks('Designs/2021 EPI2/designs/.Fiji Sands/Fiji Sands Royal.ctf'),
          //"https://v3.explorug.com/explorug.html?page=beyonddreams&mode=ecat&initdesign=Designs/2021 EPI2/designs/.Fiji Sands/Fiji Sands Royal.ctf",
        Knob: {
          Left: "81.5%",
          Top: "83.3%",
        },
      },
    ],
  },
  {
    page: 6,
    values: [
      {
        Width: "31.14%",
        Height: "72.98%",
        Left: "3.1%",
        Top: "12.34%",
        Link:
        GetExplorugLinks('Designs/2021 EPI2/designs/.Stars Trailing Laguna/Stars Trailing Jade.ctf'),
        //"https://v3.explorug.com/explorug.html?page=beyonddreams&mode=ecat&initdesign=Designs/2021 EPI2/designs/.Stars Trailing Laguna/Stars Trailing Jade.ctf",
        Knob: {
          Left: "17.5%",
          Top: "83.3%",
        },
      },
      {
        Width: "31.14%",
        Height: "72.98%",
        Left: "34.97%",
        Top: "12.34%",
        Link:
        GetExplorugLinks('Designs/2021 EPI2/designs/.Stars Trailing Laguna/Stars Trailing Umber.ctf'),
        Knob: {
          Left: "49.5%",
          Top: "83.3%",
        },
      },
      {
        Width: "31.14%",
        Height: "72.98%",
        Left: "67.1%",
        Top: "11.7%",
        Link:
        GetExplorugLinks('Designs/2021 EPI2/designs/.Stars Trailing Laguna/Stars Trailing Wood.ctf'),
            Knob: {
          Left: "81.5%",
          Top: "83.3%",
        },
      },
    ],
  },
  {
    page: 8,
    values: [
      {
        Width: "31.14%",
        Height: "72.98%",
        Left: "2.40%",
        Top: "12.13%",
        Link:
        GetExplorugLinks('Designs/2021 EPI2/designs/.Estuary/Estuary Dragon.ctf'),
          //"https://v3.explorug.com/explorug.html?page=beyonddreams&mode=ecat&initdesign=Designs/2021 EPI2/designs/.Estuary/Estuary Dragon.ctf",
          Knob: {
            Left: "17.5%",
            Top: "83.3%",
          },
      },
      {
        Width: "31.14%",
        Height: "72.98%",
        Left: "34.73%",
        Top: "12.13%",
        Link: 
        GetExplorugLinks('Designs/2021 EPI2/designs/.Estuary/Estuary Ocean.ctf'),
        //"https://v3.explorug.com/explorug.html?page=beyonddreams&mode=ecat&initdesign=Designs/2021 EPI2/designs/.Estuary/Estuary Ocean.ctf",
        Knob: {
          Left: "49.5%",
          Top: "83.3%",
        },
      },
      {
        Width: "31.14%",
        Height: "72.98%",
        Left: "67.07%",
        Top: "12.13%",
        Link:
        GetExplorugLinks('Designs/2021 EPI2/designs/.Estuary/Estuary Topaz.ctf'),
          Knob: {
            Left: "81.5%",
          Top: "83.3%",
          },
      },
    ],
  },
  {
    page: 10,
    values: [
      {
        Width: "30.42%",
        Height: "67.5%",
        Left: "3.1%",
        Top: "16%",
        Link:
        GetExplorugLinks('Designs/2021 EPI2/designs/Twigs and Tropes.ctf'),
          Knob: {
            Left: "17.5%",
            Top: "82.5%",
          },
      },
      {
        Width: "30.42%",
        Height: "67.5%",
        Left: "35.21%",
        Top: "16%",
        Link:
        GetExplorugLinks('Designs/2021 EPI2/designs/.Twigs and Tropes/Twigs and Tropes~Sunbleached.ctf'),
          Knob: {
            Left: "49.5%",
            Top: "82.5%",
          },
      },
      {
        Width: "30.42%",
        Height: "67.5%",
        Left: "67.66%",
        Top: "16%",
        Link:
        GetExplorugLinks('Designs/2021 EPI2/designs/.Twigs and Tropes/Twigs and Tropes~Noon.ctf'),
          Knob: {
            Left: "81.5%",
            Top: "82.5%",
          },
      },
    ],
  },
];
