import { CircleShape } from "../drawing/circle";
import { TDrawCircleNode, TDrawEdge, TEdge, TNode } from "../types";
import {
  SMOOTHING_ENABLED,
  SMOOTHING_QUALITY,
  STROKE_STYLE,
  TREE_VISUAL,
} from "../constants";
import { LineShape } from "../drawing/line";
import { GridShape } from "../drawing/grid";
import { TextShape } from "../drawing/text";
import { Drawing } from "../drawing";

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
    this.setSize(0, 0);

    this.#context = this.#canvas.getContext("2d")!;
    this.#initializeContext();

    this.#grid = new GridShape(this.#context);
    this.#circle = new CircleShape(this.#context);
    this.#line = new LineShape(this.#context);
    this.#text = new TextShape(this.#context);

    this.#rootNode = null;
  }

  #initializeContext() {
    this.#context.lineWidth = Drawing.getLineWidth();
    this.#context.strokeStyle = STROKE_STYLE;
    this.#context.imageSmoothingEnabled = SMOOTHING_ENABLED;
    this.#context.imageSmoothingQuality = SMOOTHING_QUALITY;
  }

  setSize(width: number, height: number) {
    this.#canvas.width = width;
    this.#canvas.height = height;
  }

  setStyle(styleString: string) {
    this.#canvas.style = styleString;
  }

  // nodes
  drawNodes(nodesList: TNode[], nodesMap: Map<number, TNode>) {
    const lineWidth = Drawing.getLineWidth();
    const screenUnit = Drawing.getScreenUnit();
    const radius = screenUnit / 2 - lineWidth;
    let cordinateX;
    let cordinateY;
    let node;
    let i;
    let l = nodesList.length;
    let circleConfig: TDrawCircleNode;
    for (i = 0; i < l; i++) {
      node = nodesList[i];
      cordinateX = i * screenUnit + radius + lineWidth;
      cordinateY = node.cordinateY!;
      circleConfig = {
        cordinateX,
        cordinateY,
        radius,
      };
      this.drawCircle(circleConfig, node);
      this.drawValue(circleConfig, node.value);
      nodesMap.set(node.index!, node);
    }

    let edgeConfig: TDrawEdge;
    let parentNode: TNode;
    for (i = 0; i < l; i++) {
      node = nodesList[i];
      if (!node.parentIndex) {
        continue;
      }

      parentNode = nodesMap.get(node.parentIndex)!;
      edgeConfig = {
        radius,
        startX: parentNode.cordinateX,
        startY: parentNode.cordinateY,
        endX: node.cordinateX,
        endY: node.cordinateY,
        lineWidth,
      };

      this.drawEdge(edgeConfig, node);
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

    if (rootNode.edge) {
      this.clearEdge(rootNode.edge);
    }
  }

  // circles
  drawCircle(circleConfig: TDrawCircleNode, rootNode: TNode) {
    rootNode.cordinateX = circleConfig.cordinateX;
    rootNode.cordinateY = circleConfig.cordinateY;
    rootNode.radius = circleConfig.radius;
    this.#circle.drawCircle(circleConfig);
  }

  clearCircle(circleConfig: TDrawCircleNode) {
    this.#circle.clearCircle(circleConfig);
  }

  // grids
  drawGrid(treeHeight: number, treeWidth: number) {
    if (Drawing.useGrid()) {
      const screenUnit = Drawing.getScreenUnit();

      this.#grid.drawGrid(
        treeHeight,
        treeWidth,
        treeHeight * screenUnit,
        treeWidth * screenUnit
      );
    }
  }

  clearGrid() {
    if (Drawing.useGrid()) {
      this.#grid.clearGrid();
    }
  }

  // edges
  drawEdge(
    { startX, startY, endX, endY, radius, lineWidth }: TDrawEdge,
    rootNode: TNode
  ) {
    if (!startX || !startY || !endX || !endY || !radius) {
      return;
    }

    const cordinateXDifference = endX - startX;
    const cordinateYDifference = endY - startY;

    const hypotenuse =
      (cordinateXDifference ** 2 + cordinateYDifference ** 2) ** (1 / 2);
    const centerToBorder = +radius;

    const cordinateX1 =
      startX + (centerToBorder * cordinateXDifference) / hypotenuse;
    const cordinateY1 =
      startY + (centerToBorder * cordinateYDifference) / hypotenuse;

    const cordinateX2 =
      endX - (centerToBorder * cordinateXDifference) / hypotenuse;
    const cordinateY2 =
      endY - (centerToBorder * cordinateYDifference) / hypotenuse;

    const drawLineConfig = {
      startX: cordinateX1,
      startY: cordinateY1,
      endX: cordinateX2,
      endY: cordinateY2,
      clearStartX: cordinateX1,
      clearStartY: cordinateY1,
      clearHeight: cordinateY2 - cordinateY1,
      clearWidth: cordinateX2 - cordinateX1,
      lineWidth: lineWidth!,
      radius,
    };

    rootNode.edge = drawLineConfig;

    this.#line.drawLine(drawLineConfig);
  }

  clearEdge(edge: TEdge) {
    this.#line.clearLine(edge);
  }
}
