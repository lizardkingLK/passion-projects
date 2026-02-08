import { LINE_WIDTH } from "../../../shared/constants";
import type { TPosition } from "../../../shared/types/state/position";
import { CanvasLine } from "../line";
import type { TLineProps } from "../line/types";
import { CanvasState } from "../state";

export class CanvasGrid {
    static draw(
        context: CanvasRenderingContext2D) {

        const style: TLineProps = { width: LINE_WIDTH, color: "red", commit: false };

        const rows = CanvasState.grid.rows;
        for (let i = 0; i <= rows; i++) {
            const from: TPosition = { y: LINE_WIDTH / 2 + i * CanvasState.unit, x: 0 };
            const to: TPosition = { y: LINE_WIDTH / 2 + i * CanvasState.unit, x: LINE_WIDTH + CanvasState.grid.width };
            CanvasLine.draw(context, from, to, style);
        }

        const columns = CanvasState.grid.columns;
        for (let i = 0; i <= columns; i++) {
            const from: TPosition = { y: 0, x: LINE_WIDTH / 2 + i * CanvasState.unit };
            const to: TPosition = { y: LINE_WIDTH + CanvasState.grid.height, x: LINE_WIDTH / 2 + i * CanvasState.unit };
            CanvasLine.draw(context, from, to, style);
        }

        CanvasLine.commit(context);
    }
}