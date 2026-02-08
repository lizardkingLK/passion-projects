import { LINE_WIDTH } from "../../../shared/constants";
import type { TPosition } from "../../../shared/types/state/position";
import { CanvasLine } from "../line";
import type { TLineProps } from "../line/types";
import { CanvasState } from "../canvas/state";
import { CanvasEvents } from "../../events";
import type { TPiece } from "../../../shared/types/state/tile";

export class CanvasGrid {
    static draw(
        canvas: HTMLCanvasElement,
        context: CanvasRenderingContext2D) {

        const style: TLineProps = { width: LINE_WIDTH, color: "red", commit: true };

        const { rows, columns } = CanvasState.grid;

        // TODO: make this tile generation flow linear time with a single loop

        for (let i = 0; i <= rows; i++) {
            const from: TPosition = {
                y: LINE_WIDTH / 2 + i * CanvasState.unit,
                x: 0
            };
            const to: TPosition = {
                y: LINE_WIDTH / 2 + i * CanvasState.unit,
                x: LINE_WIDTH + CanvasState.grid.width
            };

            const dataRow: TPiece[] = Array(columns).fill(1).map((_, index) => ({
                id: i * columns + index,
                from: {
                    y: (i + 1) * LINE_WIDTH + i * CanvasState.unit,
                    x: (index + 1) * LINE_WIDTH + index * CanvasState.unit
                },
                to: {
                    y: (index + 1) * LINE_WIDTH + index * CanvasState.unit,
                    x: (index + 1) * LINE_WIDTH + index * CanvasState.unit
                },
            }));

            CanvasLine.draw(context, from, to, style);

            dataRow.forEach(data => {
                debugger;

                const sample = data;
                context.moveTo(sample.from.x, sample.from.y);
                context.fillStyle = "green"
                context.fillRect(sample.from.x, sample.from.y, CanvasState.unit, CanvasState.unit);
                context.fill();

            });

        }

        for (let i = 0; i <= columns; i++) {
            const from: TPosition = {
                y: 0,
                x: LINE_WIDTH / 2 + i * CanvasState.unit
            };
            const to: TPosition = {
                y: LINE_WIDTH + CanvasState.grid.height,
                x: LINE_WIDTH / 2 + i * CanvasState.unit
            };
            CanvasLine.draw(context, from, to, style);
        }

        canvas.addEventListener("click", CanvasEvents.handleDrag);
        canvas.addEventListener("mousemove", CanvasEvents.handleMove);

        CanvasLine.commit(context);
        debugger;
    }
}