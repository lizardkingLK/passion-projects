import type { TArcProps } from "./types";

export class Arc {
    static draw(
        context: CanvasRenderingContext2D,
        { center, radius, fromAngle, toAngle, lineStyle }: TArcProps
    ) {
        if (lineStyle) {
            const { width, color } = lineStyle;
            context.lineWidth = width;
            context.strokeStyle = color;
        }

        context.beginPath();
        context.arc(
            center.x,
            center.y,
            radius,
            fromAngle,
            toAngle);
        context.stroke();
    }
}