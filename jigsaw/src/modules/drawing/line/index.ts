import type { TPosition } from "../../../shared/types/state/position";
import type { TLineProps } from "./types";

export class CanvasLine {
    static draw(
        context: CanvasRenderingContext2D,
        from: TPosition,
        to: TPosition,
        { color, width }: TLineProps) {

        context.beginPath();
        context.lineWidth = width;
        context.strokeStyle = color;

        context.moveTo(from.x, from.y);
        context.lineTo(to.x, to.y);
        context.stroke();
    }
}