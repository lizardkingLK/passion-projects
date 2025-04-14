import { Canvas } from "./canvas";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./constants";
import { Circle, Json, Result, Shape } from "./types";

export class Listener {
  #shapes: Shape[];

  constructor() {
    this.#shapes = [];
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

    if (!isSuccess) {
      return;
    }

    this.handle(treeStructure, canvas);
    console.log(this.#shapes);
  }

  handle(treeStructure: Json | null, canvas: Canvas) {
    if (treeStructure instanceof Array) {
      this.handleArray(treeStructure, canvas);
    } else if (treeStructure instanceof Object) {
      this.handleObject(treeStructure, canvas);
    }
  }

  handleArray(array: Json[], canvas: Canvas) {
    array.forEach((element) => {
      this.handle(element, canvas);
    });
  }

  handleObject(object: Json, canvas: Canvas, level: number = 0) {
    if (object === null) {
      return;
    }

    for (var property in object) {
      this.handleObject(object[property as keyof object], canvas, level + 1);
    }

    if (!(object instanceof Object)) {
      console.log(object, level);

      this.insertShape(canvas, level);
    }
  }

  insertShape(canvas: Canvas, level: number | null) {
    const config: Circle = {
      cordinateX: Math.random() * CANVAS_WIDTH,
      cordinateY: Math.random() * CANVAS_HEIGHT,
      radius: 20,
    };

    this.#shapes.push(config);

    console.log(config);

    canvas.drawCircle(config);
  }

  clearShapes(canvas: Canvas) {
    this.#shapes.forEach((shape) => {
      if (shape as Circle satisfies Shape) {
        console.log(shape);
        canvas.clearCircle(shape as Circle);
      }
    });

    this.#shapes = [];
  }
}
