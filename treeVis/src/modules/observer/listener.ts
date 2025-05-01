import { Canvas } from "../canvas";
import { CircleNode, TNode, TNodeAnalyzed } from "../types";

export class Listener {
  // this.#canvas.clearGrid();
  #nodes: TNode[];
  #canvas: Canvas;

  constructor() {
    this.#nodes = [];
    this.#canvas = new Canvas();
  }

  setNodes({ width, height, nodes }: TNodeAnalyzed) {
    // TODO: clean nodes with array
    this.#canvas.drawGrid(height, width);
    console.log(nodes);
  }

  clearGrid() {
    this.#canvas.clearGrid();
  }

  clearNodes() {
    let circleNode;
    for (let index = 0; index < this.#nodes.length; index++) {
      circleNode = this.#nodes[index] as CircleNode;
      this.#canvas.clearCircle(circleNode);
      this.#canvas.clearEdges(circleNode.edges);
    }
  }
}
