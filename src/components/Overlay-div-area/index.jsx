import classNames from "classnames";
import { fabric } from "fabric";

import React, { PropTypes, useEffect, useRef, useState } from "react";
import FlipPageConstants from "../../constants/constants";
import { useUiDispatch, useUiState } from "../../reducers/mainUI.reducer";
import Knobs from "../Knobs";
import OverlayDivEditor from "../Overlay-div-editor";
import DraggableBox from "../DraggableBox";
import { mainEditorActions, useEditorDispatch, useEditorState } from "../../reducers/overlayEditor.reducer";

const OverlayDivArea = (props) => {
  const { currentPageNumber, overlayDivHover, overlayMouseOut, onLinkClick, pageState } = props;
  //const [pageLinks, setPageLinks]= useState(links);

  const [activeDivValues, setActiveDivValues] = useState(null);
  // const { editor, onReady } = useFabricJSEditor();

  const [active, setActive] = useState(false);

  const [showCanvas, setShowCanvas] = useState(false);
  const [mouseDown, setMouseDown] = useState(false);
  const [fabricCanvas, setFabricCanvas] = useState(null);

  const mainUIDispatch = useUiDispatch();
  const overlayEditorDispatch = useEditorDispatch();
  const overlayEditorState = useEditorState();
  const {links: customRugsLinks} =  overlayEditorState;//FlipPageConstants.customRugsLinks;
  
  const mainUIState = useUiState();
  
  const editorState = useEditorState();

  const overlayDivRef = useRef(null);
  const [canvasSize, setCanvasSize] = useState({ w: 500, h: 500 });

  useEffect(() => {
    setTimeout(() => {
      setCanvasHeight();
    }, 500);
    const links = JSON.parse(JSON.stringify(FlipPageConstants.customRugsLinks));
   
    overlayEditorDispatch({
        type: mainEditorActions.SET_OVERLAYDIVLINKS,
        payload: links,
    })
  }, []);
  const setCanvasHeight = () => {
    if (!overlayDivRef || !overlayDivRef.current) return;
    window.overlayDivRef = overlayDivRef;
    setCanvasSize({
      w: overlayDivRef.current.offsetWidth,
      h: overlayDivRef.current.offsetHeight,
    });
  };
  const addRectangle = (divElement) => {
    //if(!divElement) return;
    const canvas = new fabric.Canvas("sample-canvas");
    setCanvasHeight();
    let rect;
    if (!divElement) {
      rect = new fabric.Rect({
        width: 50,
        height: 50,
        fill: "blue",
        angle: 0,
        top: 50,
        left: 50,
      });
    } else {
      const percentStrToPxVal = percentStrToPx(divElement);
      rect = new fabric.Rect({
        width: percentStrToPxVal.Width,
        height: percentStrToPxVal.Height,
        fill: "blue",
        angle: 0,
        top: percentStrToPxVal.Top,
        left: percentStrToPxVal.Left,
      });
    }
    canvas.add(rect);

    let newDivElement = divElement
      ? { ...divElement }
      : { Width: "6%", Height: "9%", Left: "60%", Top: "65%", Link: "" };

    function objectMovedListener(ev) {
      let target = ev.target;
      newDivElement = {
        ...newDivElement,
        Width: target.width * target.scaleX,
        Height: target.height * target.scaleY,
        Left: target.left,
        Top: target.top,
      };
      setActiveDivValues(newDivElement);
    }

    canvas.on("object:modified", objectMovedListener);
    setFabricCanvas(canvas);
  };
  const percentStrToPx = (divElement) => {
    const totalWid = overlayDivRef.current.offsetWidth;
    const totalHgt = overlayDivRef.current.offsetHeight;
    const divElem_ = { ...divElement };

    const percentVal = parseFloat(divElement.Width);
    const px_w = (parseFloat(divElement.Width) * totalWid) / 100;
    const px_h = (parseFloat(divElement.Height) * totalHgt) / 100;
    const px_l = (parseFloat(divElement.Left) * totalWid) / 100;
    const px_t = (parseFloat(divElement.Top) * totalHgt) / 100;

    return { ...divElem_, Width: px_w, Height: px_h, Top: px_t, Left: px_l };
  };
  const pxToPercentStr = (activeDivValues) => {
    const totalWid = overlayDivRef.current.offsetWidth;
    const totalHgt = overlayDivRef.current.offsetHeight;
    const divElem_ = { ...activeDivValues };

    const percent_w = Math.round(((activeDivValues.Width * 100) / totalWid) * 1000) / 1000 + "%";
    const percent_h = Math.round(((activeDivValues.Height * 100) / totalHgt) * 1000) / 1000 + "%";
    const percent_l = Math.round(((activeDivValues.Left * 100) / totalWid) * 1000) / 1000 + "%";
    const percent_t = Math.round(((activeDivValues.Top * 100) / totalHgt) * 1000) / 1000 + "%";

    return { ...divElem_, Width: percent_w, Height: percent_h, Top: percent_t, Left: percent_l };
  };

  const createNewDiv = () => {
    disposeFabricCanvas();
    setShowCanvas(true);
    addRectangle();
  };
  const handleOverlayDivClick = (divElement, e, divIndex) => {
    const link = divElement.Link;
    //if (pageState !== "fold_corner") {
    if (editorState.editorMode) {
      setActive(divIndex);
      setShowCanvas(true);
      setActiveDivValues(percentStrToPx(divElement));
      addRectangle(divElement);
   
    } else if (onLinkClick) {
      onLinkClick(link);
    } else {
      window.open(link, "_blank");
    }
    e.stopPropagation();
    //}
  };
  const handleActionKnobClick = (e, link) => {
    if (onLinkClick) {
      onLinkClick(link);
    } else {
      window.open(link, "_blank");
    }
    e.stopPropagation();
  };

  const ChangeActiveDivValues = ({ Width, Height, Top, Left, Link }) => {
    const wid = Width ? Width : activeDivValues.Width;
    const hgt = Height ? Height : activeDivValues.Height;
    const top = Top ? Top : activeDivValues.Top;
    const left = Left ? Left : activeDivValues.Left;
    const link = Link ? Link : activeDivValues.Link;

    setActiveDivValues({ ...activeDivValues, Width: wid, Height: hgt, Top: top, Left: left, Link: link });
  };

  const onOverlayDivsValueConfirm = () => {
    const links =  overlayEditorState.links; //[...FlipPageConstants.customRugsLinks];

    let currentPageElement = links.filter((pageElement) => pageElement.page === currentPageNumber);
    if (!currentPageElement || !currentPageElement.length) {
      currentPageElement = { page: currentPageNumber, values: [pxToPercentStr(activeDivValues)] };
      links.push(currentPageElement)
    } else {
      if (active || active === 0) {
        currentPageElement[0].values.splice(active, 1);
        currentPageElement[0].values.splice(active, 0, pxToPercentStr(activeDivValues));
      } else {
        currentPageElement[0].values.push(pxToPercentStr(activeDivValues));
      }
    }

    overlayEditorDispatch({
      type: mainEditorActions.SET_OVERLAYDIVLINKS,
      payload: links,
  })
    setActive(null);
    setShowCanvas(false);
    disposeFabricCanvas();
  };
  const onDelete  =()=>{
    const links =  overlayEditorState.links; //[...FlipPageConstants.customRugsLinks];

    let currentPageElement = links.filter((pageElement) => pageElement.page === currentPageNumber);
    if(currentPageElement.length){
      if (active || active === 0) {
        currentPageElement[0].values.splice(active, 1); 
      }
    }
    
    overlayEditorDispatch({
      type: mainEditorActions.SET_OVERLAYDIVLINKS,
      payload: links,
  })
      setActive(null);
    setShowCanvas(false);
    disposeFabricCanvas();
    
  }
  const disposeFabricCanvas = () => {
    if (fabricCanvas) {
      try {
        fabricCanvas.dispose();
      } catch (err) {
        console.error("disposeFabricCanvas -> err", err);
      }
    }
  };
  const onMouseMove = () => {
    if (!mouseDown) return;
  };
  const onComplete = () => {
    const links = overlayEditorState.links;
    console.log("onComplete -> links", JSON.stringify(links));
  };
  return (
    <>
      <div className={classNames("overlay-div-area", {"editor-mode": editorState.editorMode})} ref={overlayDivRef}>
        {customRugsLinks &&
          customRugsLinks.map(
            (pageElement, index) =>
              pageElement.values && (
                <div
                  className={classNames(
                    "overlay-divs-container",
                    `${pageElement.page}div`,
                    {
                      hidden: Number(pageElement.page) !== currentPageNumber,
                    },
                    {
                      editorMode: editorState.editorMode,
                    }
                  )}
                  key={index}
                >
                  {pageElement.values.map((divElement, divIndex) => (
                    <React.Fragment>
                      <div
                        id={`custom-rugs-overlay-divs-${pageElement.page}-${divIndex}div`}
                        className={classNames(
                          "custom-rugs-overlay-divs",
                          `${pageElement.page}div`,
                          { card: divElement.Card },
                          { hidden: Number(pageElement.page) !== currentPageNumber },
                          {
                            activeDiv:
                            editorState.editorMode &&
                              divIndex === active &&
                              Number(pageElement.page) === currentPageNumber,
                          }
                        )}
                        key={divIndex}
                        style={{
                          width: divElement.Width || "",
                          height: divElement.Height || "",
                          left: divElement.Left || "",
                          top: divElement.Top || "",
                        }}
                        onClick={(e) => handleOverlayDivClick(divElement, e, divIndex)}
                        onMouseEnter={(e) => overlayDivHover(e, divElement)}
                        onMouseOut={(e) => overlayMouseOut(e, divElement)}
                        onMouseDown={(e) => setMouseDown(true)}
                        onMouseMove={(e) => onMouseMove(e)}
                        onMouseUp={(e) => setMouseDown(false)}
                      ></div>
                    </React.Fragment>
                  ))}
                </div>
              )
          )}

        {customRugsLinks && pageState!=='flipping' && (
          <Knobs
            customRugsLinks={customRugsLinks}
            currentPageNumber={currentPageNumber}
            handleActionKnobClick={handleActionKnobClick}
          ></Knobs>
        )}
      </div>

      <>
        {
          editorState.editorMode && (
            <DraggableBox>
            <OverlayDivEditor
              ChangeActiveDivValues={ChangeActiveDivValues}
              onOverlayDivsValueConfirm={onOverlayDivsValueConfirm}
              activeDivValues={activeDivValues}
              createNewDiv={createNewDiv}
              onComplete={onComplete}
              onDelete={onDelete}
              //onConfirm
            ></OverlayDivEditor>
          </DraggableBox>
          )
        }
      </>

      {
        <div className={classNames("fabric-canvas", { invisible: !showCanvas })}>
          {/* <FabricJSCanvas className="sample-canvas" onReady={onReady} /> */}
          <canvas className="sample-canvas" id="sample-canvas" width={canvasSize.w} height={canvasSize.h} />
        </div>
      }
    </>
  );
};

OverlayDivArea.propTypes = {};

export default OverlayDivArea;
