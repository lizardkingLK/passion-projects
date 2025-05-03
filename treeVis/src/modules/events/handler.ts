import { Tracker } from "../observer/tracker";
import { validateJson } from "../utility";

export class Handler {
  #tracker: Tracker = new Tracker();

  constructor() {
    this.#tracker = new Tracker();
  }

  inputChanged(event: Event) {
    this.#tracker.resetNodes();

    const { isSuccess, data } = validateJson(
      (<HTMLTextAreaElement>event.target).value
    );

    if (!isSuccess || !data) {
      return;
    }

    this.#tracker.setNodes(data);
  }

  elementDragged(
    previousLeft: number,
    currentLeft: number,
    previousTop: number,
    currentTop: number
  ) {
    return {
      dragStart: (event: DragEvent) => {
        previousLeft = event.pageX;
        previousTop = event.pageY;
      },
      dragEnd: (event: DragEvent) => {
        currentLeft = event.pageX;
        currentTop = event.pageY;

        const target = event.currentTarget as HTMLElement;
        const bcr = target.getBoundingClientRect();

        const newCenterX =
          bcr.left + bcr.width / 2 + (currentLeft - previousLeft) + "px";
        target.style.left = newCenterX;

        const newCenterY =
          bcr.top + bcr.height / 2 + (currentTop - previousTop) + "px";
        target.style.top = newCenterY;
      },
    };
  }
}
