import { LINE_WIDTH } from "../../../../../shared/constants";
import { CanvasState } from "../../state";
import { StrokeWidth, UnitCount } from "../puzzle/values";

export class CanvasTarget {
    static canvas: HTMLCanvasElement;
    static context: CanvasRenderingContext2D;

    static draw(image: HTMLImageElement) {
        CanvasTarget.canvas = document.querySelector("#canvasTarget") as HTMLCanvasElement;
        CanvasTarget.context = this.canvas.getContext("2d", {
            willReadFrequently: true
        }) as CanvasRenderingContext2D;

        const unit = window.innerHeight / UnitCount;
        CanvasState.unit = unit;

        const rows = Math.round(Math.ceil(image.height / unit));
        CanvasState.grid.rows = rows;

        const columns = Math.round(Math.ceil(image.width / unit));
        CanvasState.grid.columns = columns;

        CanvasState.grid.height = rows * unit;

        CanvasState.grid.width = columns * unit;

        CanvasState.height = LINE_WIDTH + Math.max(
            CanvasState.grid.height + StrokeWidth,
            document.documentElement.clientHeight);
        this.canvas.height = CanvasState.height;

        CanvasState.width = LINE_WIDTH + Math.max(
            CanvasState.grid.width + StrokeWidth,
            document.documentElement.clientWidth);
        this.canvas.width = CanvasState.width;

        this.context.drawImage(
            image,
            StrokeWidth,
            StrokeWidth,
            CanvasState.grid.width,
            CanvasState.grid.height);
    }
}