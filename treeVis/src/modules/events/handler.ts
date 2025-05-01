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

  elementDragged(left: number, top: number) {
    return {
      dragOver: (event: DragEvent) => {
        left = event.pageX;
        top = event.pageY;
      },
      dragEnd: (event: DragEvent) => {
        const target = event.target as HTMLElement;

        target.style.left = `${left}px`;
        target.style.top = `${top}px`;
      },
    };
  }
}
