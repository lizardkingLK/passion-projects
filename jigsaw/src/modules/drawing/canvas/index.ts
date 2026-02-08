import { Files } from "../../files";
import { CanvasGrid } from "../grid";
import { CanvasImage } from "../image";

export class Canvas {
    static async drawImage(file: File) {
        const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
        const context = canvas.getContext('2d')!;
        const image = new Image() as HTMLImageElement;

        image.addEventListener("load", () => {
            CanvasImage.draw(canvas, context, image);
            CanvasGrid.draw(canvas, context);
        });
        image.src = await Files.getDataUrl(file) as string;
    }
}