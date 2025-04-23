import { Canvas } from "../canvas";
import { CircleNode, Json, TNode } from "../types";

export class Tracker {
  #nodes: TNode[];

  constructor() {
    this.#nodes = [];
  }

  // TODO: set hLevel
  // TODO: set wLevel
  // TODO: set visitor
  setNodes(object: Json, canvas: Canvas, level: number = 0) {
    if (object === null) {
      return;
    }

    for (var property in object) {
      this.setNodes(object[property as keyof object], canvas, level + 1);
    }

    if (!(object instanceof Object)) {
      console.log(object, level);

      this.insertNode(canvas, level);
    }
  }

  insertNode(canvas: Canvas, level: number | null) {
    const config: CircleNode = this.getCircleConfig(level);

    this.#nodes.push(config);

    console.log(config);

    console.log(level);

    canvas.drawCircle(config);
  }

  getCircleConfig(level: number | null): CircleNode {
    // TODO: set cordinateX and cordinateY actuals
    let config: CircleNode = {
      cordinateX: Math.random() * window.innerWidth,
      cordinateY: Math.random() * window.innerHeight,
      radius: 20,
    };

    return config;
  }

  clearNodes(canvas: Canvas) {
    this.#nodes.forEach((node) => {
      if (node as CircleNode) {
        console.log(node);
        canvas.clearCircle(node as CircleNode);
      }
    });

    this.#nodes = [];
  }
}
