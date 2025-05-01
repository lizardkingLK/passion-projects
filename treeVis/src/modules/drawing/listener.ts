import { Canvas } from "../canvas";
import { CircleNode, TNode, TNodeAnalyzed } from "../types";

export class Listener {
  #nodes: TNode[];
  #canvas: Canvas;

  constructor() {
    this.#nodes = [];
    this.#canvas = new Canvas();
  }

  setNodes({ maxNodesInLine, maxVLevel, nodes }: TNodeAnalyzed) {
    // TODO: drawGrid
    this.#canvas.drawGrid(maxVLevel, maxNodesInLine);
    console.log(nodes);
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
