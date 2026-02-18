import { StrokeWidth } from "../../../line/values";
import { CanvasState } from "../../state";

export class CanvasBoard {
    static canvas: HTMLCanvasElement;
    static context: CanvasRenderingContext2D;

    static draw() {
        CanvasBoard.canvas = document.querySelector("#canvasBoard") as HTMLCanvasElement;
        CanvasBoard.context = this.canvas.getContext("2d") as CanvasRenderingContext2D;

        this.canvas.height = CanvasState.height;
        this.canvas.width = CanvasState.width;

        this.context.fillStyle = "white";
        this.context.fillRect(
            StrokeWidth,
            StrokeWidth,
            CanvasState.width,
            CanvasState.height);
    }
}