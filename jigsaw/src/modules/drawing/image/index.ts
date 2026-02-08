import { LINE_WIDTH } from "../../../shared/constants";
import { CanvasState } from "../state";

export class CanvasImage {
    static draw(
        canvas: HTMLCanvasElement,
        context: CanvasRenderingContext2D,
        image: HTMLImageElement) {

        const unit = window.innerHeight / 10;
        CanvasState.unit = unit;

        const rows = Math.round(Math.ceil(image.height / unit));
        CanvasState.grid.rows = rows;

        const columns = Math.round(Math.ceil(image.width / unit));
        CanvasState.grid.columns = columns;

        const height = rows * unit;
        CanvasState.grid.height = height;

        const width = columns * unit;
        CanvasState.grid.width = width;

        canvas.height = LINE_WIDTH  + Math.max(height, document.documentElement.clientHeight);
        CanvasState.height = canvas.height;

        canvas.width = LINE_WIDTH  + Math.max(width, document.documentElement.clientWidth);
        CanvasState.width = canvas.width;

        context.drawImage(image, LINE_WIDTH, LINE_WIDTH, width, height);
    }
}