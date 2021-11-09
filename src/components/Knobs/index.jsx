import React, { PropTypes } from 'react';

import { Tooltip2 } from "@blueprintjs/popover2";
import { assetsDomain } from "../../api/appProvider";
import classNames from 'classnames';

const Knobs = props => {
  const { customRugsLinks, currentPageNumber, handleActionKnobClick } = props;

   return (
    <React.Fragment>
      {customRugsLinks && (
        <div className="knobs-container">
          {customRugsLinks &&
            customRugsLinks.map(
              (pageElement, index) =>
                pageElement.values &&
                pageElement.values.map((divElement, divIndex) => (
                  <React.Fragment>
                    {divElement.Knob && currentPageNumber === pageElement.page && (
                      <div
                        key={divIndex}
                        id={`action-knob-${index}-${divIndex}`}
                        className={classNames("bd-action-knob-points", {
                          "action-knob-animation": currentPageNumber === pageElement.page,
                        })}
                        style={{
                          left: divElement.Knob.Left || "",
                          top: divElement.Knob.Top || "",
                        }}
                        onClick={(e) => handleActionKnobClick(e, divElement.Link)}
                      >
                        <Tooltip2
                          content="Customize this design"
                          placement="top"
                          hoverCloseDelay={1000}
                          inheritDarkTheme={false}
                        >
                          <img alt="action-knob" src={assetsDomain + "/Action-knob.svg"} />
                        </Tooltip2>
                      </div>
                    )}
                  </React.Fragment>
                ))
            )}
        </div>
      )}
    </React.Fragment>
  );
};

Knobs.propTypes = {
  
};

export default Knobs;