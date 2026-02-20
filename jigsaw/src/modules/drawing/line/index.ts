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

    static drawPath(
        context: CanvasRenderingContext2D,
        path: Path2D,
        { color, width }: TLineProps) {
            
        context.beginPath();
        context.lineWidth = width;
        context.strokeStyle = color;

        context.stroke(path);
    }

    static replace(
        contexts: {
            fromContext: CanvasRenderingContext2D,
            toContext: CanvasRenderingContext2D,
        },
        positions: {
            fromPosition: TPosition,
            toPosition: TPosition,
        }
    ) {
        const { fromContext, toContext } = contexts;
        const { fromPosition, toPosition } = positions;

        const imageData = fromContext.getImageData(
            fromPosition.x,
            fromPosition.y,
            toPosition.x - fromPosition.x,
            toPosition.y - fromPosition.y);

        toContext.putImageData(
            imageData,
            fromPosition.x,
            fromPosition.y);
    }
}