import { CanvasEvents } from "../../events";
import { Files } from "../../helpers/files";
import { CanvasGrid } from "../grid";
import { CanvasImage } from "../image";

export class Canvas {
    // TODO: add layering logic in section and in the chains hensforth
    static layers: Map<number, HTMLCanvasElement>;
    static canvas: HTMLCanvasElement;
    static context: CanvasRenderingContext2D;
    static image: HTMLImageElement;

    static async draw(file: File) {
        this.canvas = document.querySelector("#canvas") as HTMLCanvasElement;
        this.context = this.canvas.getContext('2d')!;
        this.image = await Files.getImage(file, this.process);
    }

    static process() {
        CanvasImage.draw(Canvas.canvas, Canvas.context, Canvas.image);
        CanvasGrid.draw(Canvas.context);
        CanvasEvents.set(Canvas.canvas);
    }
}