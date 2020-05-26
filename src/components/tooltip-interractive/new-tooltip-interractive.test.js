import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import TooltipInterractive from "./TooltipInterractive";

jest.useFakeTimers();

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

const popupContent = "Hello my friend";
it("renders with or without a name", () => {
  act(() => {
    render(
      <TooltipInterractive
        content={popupContent}
        width="400px"
        appearTimeout="2000"
        closeTimeout="200"
      >
        <button>hover me</button>
      </TooltipInterractive>,
      container
    );
  });
  expect(container.textContent).toBe("hover me");
});

it("check tooltip appears", async () => {
  const onChange = jest.fn();
  const buttonLabel = "hover me";
  act(() => {
    render(
      <TooltipInterractive
        content={popupContent}
        width="400px"
        appearTimeout="100"
        closeTimeout="0"
        data-testid="tooltipId"
      >
        <button data-testid="hoverId">{buttonLabel}</button>
      </TooltipInterractive>,
      container
    );
  });

  const hoverButton = document.querySelector("[data-testid=hoverId]");
  expect(hoverButton.innerHTML).toBe(buttonLabel);

  act(() => {
    hoverButton.dispatchEvent(new MouseEvent("mouseover", { bubbles: true }));
  });

  // let time to the popup to appear
  act(() => {
    jest.advanceTimersByTime(200);
  });

  const popup = container.querySelector("[data-testid='tooltipContentId']");
  expect(popup.innerHTML).toBe(popupContent);
});
