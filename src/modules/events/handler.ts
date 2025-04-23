import { Canvas } from "../canvas";
import { Tracker } from "../drawing/tracker";
import { validateJson } from "../utility";

export class Handler {
  #tracker: Tracker;

  constructor() {
    this.#tracker = new Tracker();
  }

  inputChanged(event: Event, canvas: Canvas) {
    this.#tracker.clearNodes(canvas);

    const { isSuccess, data } = validateJson(
      (<HTMLTextAreaElement>event.target).value
    );

    if (!isSuccess || !data) {
      return;
    }

    this.#tracker.setNodes(data, canvas);
  }
}
