import { CircleShape } from "../drawing/circle";
import {
  CircleNode,
  LineNode,
  TBoxConfiguration,
  TDrawCircleNode,
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

export class Canvas {
  // canvas elements
  #canvas: HTMLCanvasElement;
  #context: CanvasRenderingContext2D;

  // composed drawing items
  #grid: GridShape;
  #circle: CircleShape;
  #line: LineShape;

  // nodes map
  #nodes: Map<number, TNode>;

  constructor() {
    this.#canvas = document.querySelector(TREE_VISUAL)!;
    this.#setCanvasSize(0, 0);

    this.#context = this.#canvas.getContext("2d")!;
    this.#initializeContext();

    this.#grid = new GridShape(this.#context);
    this.#circle = new CircleShape(this.#context);
    this.#line = new LineShape(this.#context);

    this.#nodes = new Map<number, TNode>();
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

    this.#drawNode(radius, rootNode, boxConfig);
  }

  #drawNode(
    radius: number,
    { value, left, right }: TNode,
    { boxEndX, boxStartX, boxStartY }: TBoxConfiguration
  ) {
    const circleConfig: TDrawCircleNode = {
      cordinateX: boxStartX + (boxEndX - boxStartX) / 2,
      cordinateY: boxStartY + radius + LINE_WIDTH,
      radius,
    };

    this.drawCircle(circleConfig);

    if (left) {
      const leftBoxConfig: TBoxConfiguration = {
        boxStartX,
        boxEndX: circleConfig.cordinateX - radius - LINE_WIDTH,
        boxStartY: circleConfig.cordinateY + radius + LINE_WIDTH,
      };
      this.#drawNode(radius, left, leftBoxConfig);
    }

    if (right) {
      const rightBoxConfig: TBoxConfiguration = {
        boxStartX: circleConfig.cordinateX + radius + LINE_WIDTH,
        boxEndX,
        boxStartY: circleConfig.cordinateY + radius + LINE_WIDTH,
      };
      this.#drawNode(radius, right, rightBoxConfig);
    }
  }

  clearNodes() {
    let circleNode;
    for (let index = 0; index < this.#nodes.size; index++) {
      circleNode = this.#nodes.get(index + 1) as CircleNode;
      this.clearCircle(circleNode);
      this.clearEdges(circleNode.edges);
    }
  }

  // circles
  drawCircle(circleConfig: TDrawCircleNode) {
    this.#circle.drawCircle(circleConfig);
  }

  clearCircle(circleConfig: CircleNode) {
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
  drawEdge() {}

  clearEdges(edges: LineNode[]) {
    edges.forEach((edge) => {
      this.#line.clearLine(edge);
    });
  }
}
