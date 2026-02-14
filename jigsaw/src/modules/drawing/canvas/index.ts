import { Files } from "../../helpers/files";
import { CanvasBoard } from "./strategy/board";
import { CanvasPuzzle } from "./strategy/puzzle";
import { CanvasTarget } from "./strategy/target";

export class Canvas {
    static image: HTMLImageElement;

    static async load(file: File) {
        Canvas.image = await Files.getImage(file, Canvas.process);
    }

    static process() {
        CanvasTarget.draw(Canvas.image);
        CanvasBoard.draw();
        CanvasPuzzle.draw(Canvas.image);
    }
}