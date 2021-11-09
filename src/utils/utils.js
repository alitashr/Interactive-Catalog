
export const setPageDims = (windowWidth, windowHeight, catalog_eachPageSize) => {
  var pageWidth, pageHeight;
  var imageSize = { w: catalog_eachPageSize.w*2, h: catalog_eachPageSize.h };
  var padding = 20; //15//windowWidth % 2 ===1 ? :21;
  if (windowWidth > windowHeight) {
    pageHeight = windowHeight - padding;
    pageWidth = pageHeight * (imageSize.w / imageSize.h);
    if (pageWidth > windowWidth) {
      pageWidth = windowWidth - padding;
      pageHeight = pageWidth * (imageSize.h / imageSize.w);
    }
  } else {
    pageWidth = windowWidth - padding;
    pageHeight = pageWidth * (imageSize.h / imageSize.w);
  }

  pageWidth = pageWidth % 2 === 1 ? pageWidth - 1 : pageWidth;

  return { w: pageWidth, h: pageHeight };
};

export const flipPage = (direction, pageRef) => {
  if (!direction) return;
  direction += "";
  if (direction.toLowerCase() === "next") {
    pageRef.current.pageFlip().flipNext();
  } else if (direction.toLowerCase() === "prev") {
    pageRef.current.pageFlip().flipPrev();
  } else if (parseFloat(direction)) {
    const pageNumber = parseFloat(direction);
    pageRef.current.pageFlip().turnToPage(pageNumber);
  }
};
