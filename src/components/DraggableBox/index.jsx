import React from "react";

const DraggableBox = (props) => {
  let offsetX, offsetY;
  let mouseDown = false;
  const move = (e) => {
    if(!mouseDown) return;
    const el = e.target;
    el.style.left = `${e.pageX - offsetX}px`;
    el.style.top = `${e.pageY - offsetY}px`;
  };
  const add = (e) => {
    mouseDown = true;
    const el = e.target;
    offsetX = e.clientX - el.getBoundingClientRect().left;
    offsetY = e.clientY - el.getBoundingClientRect().top;

    el.addEventListener("mousemove", move);
  };
  const remove = (e) => {
    mouseDown = false;
    const el = e.target;
    el.removeEventListener("mousemove", move);
  };

  return (
    <div className="Draggable-box-wrapper" onMouseDown={add} onMouseUp={remove}>
      {props.children}
    </div>
  );
};

DraggableBox.propTypes = {};

export default DraggableBox;
