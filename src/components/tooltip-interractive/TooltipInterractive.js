import React, { useState, useCallback } from "react";
import { createUseStyles } from "react-jss";
import ReactHtmlParser from "react-html-parser";
import PropTypes from "prop-types";

const useStyles = createUseStyles({
  superContainer: {
    top: (sizeAndCoordinate) => sizeAndCoordinate.popupTop,
    left: (sizeAndCoordinate) => sizeAndCoordinate.popupLeft,
    position: "absolute",
    ":hover": {
      visibility: "visible",
    },
  },
  container: {
    marginLeft: "2px",
    position: "relative",
    top: "-3px",
    width: (sizeAndCoordinate) => sizeAndCoordinate.width,
    "border-radius": "2px",
    "background-color": "#ffffff",
    "box-shadow": "0 0 8px 0 rgba(97, 97, 97, 0.5)",
    "font-family": "Helvetica",
    "font-weight": "normal",
    "font-style": "normal",
    "font-stretch": "normal",
    "font-size": "12px",
    "line-height": "normal",
    "letter-spacing": "normal",
    zIndex: 1000,
    ":hover": {
      visibility: "visible",
    },
  },
  arrowUp: {
    position: "relative",
    width: 0,
    height: 0,
    top: "2px",
    left: 20,
    boxSizing: "border-box",
    border: "5px solid black",
    borderColor: "transparent transparent white white",
    transform: "rotate(135deg)",
    boxShadow: "-1px 3px 3px -2px rgba(97, 97, 97, 0.5)",
    zIndex: 1001,
  },

  content: {
    paddingLeft: "20px",
    paddingRight: "20px",
    paddingTop: "10px",
    paddingBottom: "20px",
  },
});

function TooltipInterractive({
  children,
  content,
  width = "300px",
  appearTimeout = "500",
  closeTimeout = "100",
}) {
  const [visible, setVisible] = useState(false);
  let popupContent;
  const [popupTop, setPopupTop] = useState(0);
  const [popupLeft, setPopupLeft] = useState(0);
  const classes = useStyles({ popupTop, popupLeft, width });

  const measuredRef = useCallback((node) => {
    if (node !== null) {
      let top = node.offsetTop + node.getBoundingClientRect().height;
      setPopupTop(top);
      let left = node.offsetLeft;
      setPopupLeft(left);
    }
  }, []);

  function onMouseEnter() {
    setTimeout(() => {
      setVisible(true);
    }, appearTimeout);
  }

  function onMouseLeave() {
    setTimeout(() => {
      setVisible(false);
    }, closeTimeout);
  }

  function buildPopupContent() {
    return (
      <div className={classes.superContainer}>
        <div className={classes.arrowUp} />
        <div className={classes.container}>
          <div className={classes.content} data-testid="tooltipContentId">
            {ReactHtmlParser(content)}
          </div>
        </div>
      </div>
    );
  }

  if (visible) {
    popupContent = buildPopupContent();
  } else {
    popupContent = "";
  }

  return (
    <div
      onMouseLeave={(event) => onMouseLeave()}
      onMouseEnter={(event) => onMouseEnter()}
    >
      <div ref={measuredRef}>{children}</div>
      {popupContent}
    </div>
  );
}

TooltipInterractive.prototype = {
  content: PropTypes.string.isRequired,
  width: PropTypes.string,
  appearTimeout: PropTypes.string,
  closeTimeout: PropTypes.string,
};

export default TooltipInterractive;
