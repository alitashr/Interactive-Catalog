import { Button, Col, Divider, Input, Row, Space } from "antd";
import React, { PropTypes, useState } from "react";
import FlipPageConstants from "../../constants/constants";
import { useUiState } from "../../reducers/mainUI.reducer";
import { useEditorState } from "../../reducers/overlayEditor.reducer";

const OverlayDivEditor = (props) => {
  const { ChangeActiveDivValues, onOverlayDivsValueConfirm, activeDivValues, createNewDiv, onComplete,onDelete } = props;
  const mainUIState = useUiState();

  const editorState = useEditorState();

  return (
    <>
      {/* {mainUIState.editorMode && (
        <div id="wrapper">
          <canvas id="c"></canvas>
        </div>
      )} */}
      <div className="overlayEditBoard">
        {editorState.editorMode && createNewDiv && (
          <div className="overlayEditBoard-btn-container">
            <Button type="primary" onClick={createNewDiv}>
              Create new div
            </Button>
            <Divider />
          </div>
        )}
        {editorState.editorMode && activeDivValues && (
          <div>
            <EditableRow
              label="Width :"
              placeholder={"Width of the div"}
              value={activeDivValues.Width}
              onChange={(val) => ChangeActiveDivValues({ Width: val })}
            ></EditableRow>
            <EditableRow
              label="Height :"
              placeholder={"Height of the div"}
              value={activeDivValues.Height}
              onChange={(val) => ChangeActiveDivValues({ Height: val })}
            ></EditableRow>
            <EditableRow
              label="Top :"
              placeholder={"Top of the div"}
              value={activeDivValues.Top}
              onChange={(val) => ChangeActiveDivValues({ Top: val })}
            ></EditableRow>
            <EditableRow
              label="Left :"
              placeholder={"Left of the div"}
              value={activeDivValues.Left}
              onChange={(val) => ChangeActiveDivValues({ Left: val })}
            ></EditableRow>
            <EditableRow
              label="Link :"
              placeholder={"Link of the div"}
              value={activeDivValues.Link}
              onChange={(val) => ChangeActiveDivValues({ Link: val })}
              inputWid={24}
            ></EditableRow>
            <div className="overlayEditBoard-btn-container">
              <Space size={"middle"}>
                <Button type="primary" onClick={onOverlayDivsValueConfirm}>
                  OK
                </Button>

                {onDelete && (
                  <Button type="danger" onClick={onDelete}>
                    Delete div
                  </Button>
                )}
              </Space>
            </div>

            {onComplete && (
              <div className="overlayEditBoard-btn-container">
                <Button type="primary" onClick={onComplete}>
                  Save to file
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

OverlayDivEditor.propTypes = {};

export default OverlayDivEditor;

const EditableRow = (props) => {
  const { label, placeholder, value, onChange, labelWid = 6, inputWid = 12 } = props;
  return (
    <Row className="editArea">
      <Col span={labelWid}>{label} </Col>
      <Col span={inputWid}>
        <Input
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            if (onChange) onChange(e.target.value);
          }}
        />
      </Col>
    </Row>
  );
};
