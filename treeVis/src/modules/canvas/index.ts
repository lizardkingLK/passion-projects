import { CircleShape } from "../drawing/circle";
import {
  LineNode,
  TBoxConfiguration,
  TDrawCircleNode,
  TDrawEdge,
  TNode,
} from "../types";
import {
  LINE_WIDTH,
  SCREEN_UNIT,
  SMOOTHING_ENABLED,
  SMOOTHING_QUALITY,
  STROKE_STYLE,
  TREE_VISUAL,
} from "../constants";
import { LineShape } from "../drawing/line";
import { GridShape } from "../drawing/grid";
import { TextShape } from "../drawing/text";

export class Canvas {
  // canvas elements
  #canvas: HTMLCanvasElement;
  #context: CanvasRenderingContext2D;

  // composed drawing items
  #grid: GridShape;
  #circle: CircleShape;
  #line: LineShape;
  #text: TextShape;

  // nodes tree
  #rootNode: TNode | null;

  constructor() {
    this.#canvas = document.querySelector(TREE_VISUAL)!;
    this.#setCanvasSize(0, 0);

    this.#context = this.#canvas.getContext("2d")!;
    this.#initializeContext();

    this.#grid = new GridShape(this.#context);
    this.#circle = new CircleShape(this.#context);
    this.#line = new LineShape(this.#context);
    this.#text = new TextShape(this.#context);

    this.#rootNode = null;
  }

  #setCanvasSize(width: number, height: number) {
    this.#canvas.width = width;
    this.#canvas.height = height;
  }

  #initializeContext() {
    this.#context.lineWidth = LINE_WIDTH;
    this.#context.strokeStyle = STROKE_STYLE;
    this.#context.imageSmoothingEnabled = SMOOTHING_ENABLED;
    this.#context.imageSmoothingQuality = SMOOTHING_QUALITY;
  }

  // nodes
  drawNodes(width: number, rootNode: TNode) {
    const radius = SCREEN_UNIT / 2 - LINE_WIDTH;
    const canvasWidth = width * SCREEN_UNIT;
    const boxConfig: TBoxConfiguration = {
      boxStartX: 0,
      boxStartY: 0,
      boxEndX: canvasWidth,
    };

    this.#rootNode = rootNode;

    this.#drawNode(radius, rootNode, boxConfig);
  }

  #drawNode(
    radius: number,
    rootNode: TNode,
    { boxEndX, boxStartX, boxStartY }: TBoxConfiguration
  ) {
    const { value, left, right, parentX, parentY } = rootNode;

    const circleConfig: TDrawCircleNode = {
      cordinateX: boxStartX + (boxEndX - boxStartX) / 2,
      cordinateY: boxStartY + radius + LINE_WIDTH,
      radius,
    };

    rootNode = Object.assign(rootNode, { ...circleConfig });

    this.drawCircle(circleConfig);
    this.drawValue(circleConfig, value);
    this.drawEdge({
      radius,
      startX: parentX,
      startY: parentY,
      endX: circleConfig.cordinateX,
      endY: circleConfig.cordinateY,
    });

    if (left) {
      const leftBoxConfig: TBoxConfiguration = {
        boxStartX,
        boxEndX: circleConfig.cordinateX - radius - LINE_WIDTH,
        boxStartY: circleConfig.cordinateY + radius + LINE_WIDTH,
      };
      left.parentX = circleConfig.cordinateX;
      left.parentY = circleConfig.cordinateY;
      this.#drawNode(radius, left, leftBoxConfig);
    }

    if (right) {
      const rightBoxConfig: TBoxConfiguration = {
        boxStartX: circleConfig.cordinateX + radius + LINE_WIDTH,
        boxEndX,
        boxStartY: circleConfig.cordinateY + radius + LINE_WIDTH,
      };
      right.parentX = circleConfig.cordinateX;
      right.parentY = circleConfig.cordinateY;
      this.#drawNode(radius, right, rightBoxConfig);
    }
  }

  drawValue({ cordinateX, cordinateY }: TDrawCircleNode, value: number) {
    this.#text.drawText(cordinateX, cordinateY, value.toString());
  }

  clearNodes(rootNode: TNode | null = this.#rootNode) {
    if (!rootNode) {
      return;
    }

    this.clearNodes(rootNode.left);
    this.clearNodes(rootNode.right);

    this.clearCircle({
      cordinateX: rootNode.cordinateX!,
      cordinateY: rootNode.cordinateY!,
      radius: rootNode.radius!,
    });

    // TODO: clear nodes function implementation
    // use post order traversal lrn);
  }

  // circles
  drawCircle(circleConfig: TDrawCircleNode) {
    this.#circle.drawCircle(circleConfig);
  }

  clearCircle(circleConfig: TDrawCircleNode) {
    this.#circle.clearCircle(circleConfig);
  }

  // grids
  drawGrid(height: number, width: number) {
    this.#setCanvasSize(width * SCREEN_UNIT, height * SCREEN_UNIT);
    this.#grid.drawGrid(
      height,
      width,
      height * SCREEN_UNIT,
      width * SCREEN_UNIT
    );
  }

  clearGrid() {
    this.#grid.clearGrid();
  }

  // edges
  drawEdge({ startX, startY, endX, endY, radius }: TDrawEdge) {
    if (!startX || !startY || !endX || !endY || !radius) {
      return;
    }

    const cordinateXDifference = endX - startX;
    const cordinateYDifference = endY - startY;

    const hypotenuse =
      (cordinateXDifference ** 2 + cordinateYDifference ** 2) ** (1 / 2);
    const centerToBorder = LINE_WIDTH + radius;

    const cordinateX1 =
      startX + (centerToBorder * cordinateXDifference) / hypotenuse;
    const cordinateY1 =
      startY + (centerToBorder * cordinateYDifference) / hypotenuse;

    const cordinateX2 =
      endX - (centerToBorder * cordinateXDifference) / hypotenuse;
    const cordinateY2 =
      endY - (centerToBorder * cordinateYDifference) / hypotenuse;

    this.#line.drawLine({
      startX: cordinateX1,
      startY: cordinateY1,
      endX: cordinateX2,
      endY: cordinateY2,
      clearHeight: 0,
      clearWidth: 0,
      clearStartX: 0,
      clearStartY: 0,
      lineWidth: LINE_WIDTH,
    });
  }

  clearEdges(edges: LineNode[]) {
    edges.forEach((edge) => {
      this.#line.clearLine(edge);
    });
  }
}
