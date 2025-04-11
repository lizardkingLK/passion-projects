import { Canvas } from "./canvas";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./constants";
import { validateInput } from "./operations";
import { Shape } from "./types";

export class Listener {
  #shapes: Shape[];

  constructor() {
    this.#shapes = [];
  }

  listen(event: Event, canvas: Canvas) {
    const {
      isSuccess,
      message,
      data: treeStructure,
    } = validateInput((<HTMLTextAreaElement>event.target).value);

    if (!isSuccess) {
      console.error(message);
      return;
    }

    console.log(treeStructure);
    const circle = {
      centerX: CANVAS_WIDTH / 2,
      centerY: CANVAS_HEIGHT / 2,
      radius: 20,
    };
    canvas.drawCircle(circle);
    this.#shapes.push(circle);
    console.log(this.#shapes);
  }
}
