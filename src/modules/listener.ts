import { Canvas } from "./canvas";
import { CircleNode, Json, Result } from "./types";

export class Listener {
  #nodes: CircleNode[];

  constructor() {
    this.#nodes = [];
  }

  validate(input: string): Result<Json> {
    try {
      const parsed = JSON.parse(input);

      return {
        data: parsed,
        isSuccess: true,
        message: null,
      };
    } catch (error) {
      return {
        data: null,
        isSuccess: false,
        message: "Input could not be parsed.",
      };
    }
  }

  listen(event: Event, canvas: Canvas) {
    this.clearShapes(canvas);

    const { isSuccess, data: treeStructure } = this.validate(
      (<HTMLTextAreaElement>event.target).value
    );

    if (!isSuccess || !(treeStructure instanceof Object)) {
      return;
    }

    this.handleObject(treeStructure, canvas);

    console.log(this.#nodes);
  }

  // TODO: set hLevel
  // TODO: set wLevel
  // TODO: set visitor
  handleObject(object: Json, canvas: Canvas, level: number = 0) {
    if (object === null) {
      return;
    }

    for (var property in object) {
      this.handleObject(object[property as keyof object], canvas, level + 1);
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
    let config:CircleNode = {
      cordinateX: 0,
      cordinateY: 0,
      radius: 20,
    };

    
    

    return config;
  }

  clearShapes(canvas: Canvas) {
    this.#nodes.forEach((node) => {
      if (node as CircleNode) {
        console.log(node);
        canvas.clearCircle(node as CircleNode);
      }
    });

    this.#nodes = [];
  }
}
