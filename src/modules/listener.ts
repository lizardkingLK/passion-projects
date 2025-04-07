import { Canvas } from "./canvas";
import { validateInput } from "./operations";

export class Listener {
  listen(event: Event, canvas: Canvas) {
    const { isSuccess, message, data } = validateInput(
      (<HTMLTextAreaElement>event.target).value
    );

    if (!isSuccess) {
      console.error(message);
    }

    const treeStructure = data;
    console.log(treeStructure);

    canvas.drawCircle();
  }
}
