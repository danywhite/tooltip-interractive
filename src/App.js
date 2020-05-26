import React from "react";
import TooltipInterractive from "./components/tooltip-interractive/TooltipInterractive.js";
import { createUseStyles } from "react-jss";

const popupContent =
  '       <div style="font-weight: bold;color:black">Your subscription level doesn\'t allow you to modify the value' +
  "            options." +
  "        </div><br>" +
  '        <div style="display:flex">' +
  '            <div style="margin-top:1px">' +
  '                <div style="width:24px"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">' +
  "                    <path" +
  '                        d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z" />' +
  "                </svg>" +
  "                </div>" +
  "            </div>" +
  '            <div style="color:grey;padding-left: 5px;">' +
  "                With your gold access, you get additionnal services such as" +
  '                <p style="margin-top: 5px;content:""">' +
  "                    &#x2022; tennis court access" +
  "                    <br>&#x2022; swimming pool access" +
  "                    <br>&#x2022; free drinks" +
  "                    <br>&#x2022; a present" +
  "                    <br>&#x2022; higher internet rate access" +
  "                </p>" +
  '                <a style="color:#00c" href="https://www.nuagesurf.com/">Learn more</a>' +
  "            </div>" +
  "        </div>";

const useStyles = createUseStyles({
  superContainer: {
    top: "50px",
    left: "50px",
    position: "relative"
  },

  main: {
    top: "50px",
    left: "50px",
    position: "relative"
  },
  row: {
    display: "flex"
  }
});

function App() {
  const classes = useStyles();

  function onChange() {
    console.log("onChange");
  }

  return (
    <div className={classes.main}>
      <div>
        <button>fake button</button>
        <button>fake button</button>
        <button>fake button</button>
        <button>fake button</button>
        <button>fake button</button>
        <button>fake button</button>
      </div>
      <div className={classes.row}>
        <button>fake button</button>
        <TooltipInterractive
          content={popupContent}
          width="400px"
          appearTimeout="200"
          closeTimeout="200"
        >
          <button>hover me</button>
        </TooltipInterractive>
        <button>fake button</button>
        <button>fake button</button>
      </div>
      <div>
        <button>fake button</button>
        <button>fake button</button>
        <button>fake button</button>
        <button>fake button</button>
        <button>fake button</button>
      </div>
    </div>
  );
}

export default App;
