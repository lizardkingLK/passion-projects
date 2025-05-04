import { CircleShape } from "../drawing/circle";
import { CircleNode, LineNode, TDrawCircleNode, TNode } from "../types";
import { SCREEN_UNIT, TREE_VISUAL } from "../constants";
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
    this.#context.lineWidth = 1;
    this.#context.strokeStyle = "black";
    this.#context.imageSmoothingEnabled = true;
    this.#context.imageSmoothingQuality = "high";
  }

  // nodes
  drawNodes(width: number, height: number, nodes: Map<number, TNode>) {
    const radius = SCREEN_UNIT / 2 - 1;
    const rootX = (width * SCREEN_UNIT) / 2;
    const rootY = 0;

    nodes.forEach(({ hLevel, vLevel }) => {
      console.log(hLevel);
      
      this.drawCircle({
        cordinateX: rootX + hLevel! * SCREEN_UNIT,
        cordinateY: 1 + rootY + radius + vLevel! * SCREEN_UNIT,
        radius,
      });
    });
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
    // this.#setCanvasSize(10 * SCREEN_UNIT, 10 * SCREEN_UNIT);
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
