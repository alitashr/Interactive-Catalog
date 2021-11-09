// import cdnFolder from '../constants/constants';
// console.log("cdnFolder" , cdnFolder)

const cdnFolder= process.env.REACT_APP_CDNFOLDER || "HRI"; //"CustomRugs"
console.log('public url ', process.env.PUBLIC_URL)

export const domain = `https://v3.explorug.com`;
export const explorugLinkDomain = "https://v3.explorug.com/"; //"https://v3dev.explorug.com/build/"; // 



export const assetsDomain = './Assets';// process.env.PUBLIC_URL===''? './Assets' : 'https://cdn.explorug.com/catalogs/'+cdnFolder+'/Assets'; //'https://cdn.explorug.com/scripts/catalogs/CustomRugs/Assets'; //'./Assets'; 
