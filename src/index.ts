import {
  CANVAS_WIDTH as cWidth,
  CANVAS_HEIGHT as cHeight,
} from "./modules/constants";

export function drawCanvas() {
  // get canvas by id
  const canvas: HTMLCanvasElement = document.querySelector("#treeVisual")!;

  // set width and height
  canvas.width = cWidth;
  canvas.height = cHeight;

  // get canvas context
  const context = canvas.getContext("2d")!;

  // move to 0,0
  context.moveTo(0, 0);

  // line to center
  context.lineTo(cWidth, cHeight);

  // add stroke style
  context.strokeStyle = "black";
  context.lineWidth = 1;
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";

  // draw with stroke
  context.stroke();

  // move to center
  context.moveTo(cWidth / 2, cHeight / 2);

  // draw a circle
  const startAngle = Math.atan(cHeight / cWidth);
  console.log(startAngle);
  context.arc(
    cWidth / 2,
    cHeight / 2,
    500,
    startAngle,
    2 * Math.PI + startAngle
  );

  context.stroke();
}
