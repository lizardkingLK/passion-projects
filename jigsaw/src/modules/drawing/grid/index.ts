import { LINE_WIDTH } from "../../../shared/constants";
import type { TPosition } from "../../../shared/types/state/position";
import { CanvasLine } from "../line";
import type { TLineProps } from "../line/types";
import { CanvasState } from "../canvas/state";
import type { TPiece } from "../../../shared/types/state/tile";
import { Cartesian } from "../../helpers/cartisean";

const lineStyle: TLineProps = { width: LINE_WIDTH, color: "red" };

export class CanvasGrid {
    static draw(context: CanvasRenderingContext2D) {
        const { rows, columns } = CanvasState.grid;

        let from: TPosition;
        let to: TPosition;
        for (let i = 0; i <= rows; i++) {
            from = {
                y: LINE_WIDTH / 2 + i * CanvasState.unit,
                x: 0,
            };
            to = {
                y: from.y,
                x: LINE_WIDTH + CanvasState.grid.width
            };
            CanvasLine.draw(context, from, to, lineStyle);
        }

        for (let i = 0; i <= columns; i++) {
            from = {
                y: 0,
                x: LINE_WIDTH / 2 + i * CanvasState.unit,
            };
            to = {
                y: LINE_WIDTH + CanvasState.grid.height,
                x: from.x,
            };
            CanvasLine.draw(context, from, to, lineStyle);
        }

        const length = rows * columns;
        const tiles: TPiece[] = [];

        const drawTiles = false;
        const drawDiagonal = false;

        let y;
        let x;
        for (let i = 0; i < length; i++) {
            y = Math.round(Math.floor(i / columns));
            x = Math.round(Math.floor(i % columns));

            if (drawTiles) {
                context.fillStyle = "green"
                context.fillRect(
                    (x + 1) * LINE_WIDTH + x * (CanvasState.unit - LINE_WIDTH),
                    (y + 1) * LINE_WIDTH + y * (CanvasState.unit - LINE_WIDTH),
                    CanvasState.unit - LINE_WIDTH,
                    CanvasState.unit - LINE_WIDTH);
            }

            from = {
                y: (y + 1) * LINE_WIDTH + y * (CanvasState.unit - LINE_WIDTH),
                x: (x + 1) * LINE_WIDTH + x * (CanvasState.unit - LINE_WIDTH),
            };
            to = {
                y: from.y + CanvasState.unit - LINE_WIDTH,
                x: from.x + CanvasState.unit - LINE_WIDTH,
            };

            if (drawDiagonal) {
                lineStyle.color = "black";
                CanvasLine.draw(context, from, to, lineStyle);
            }

            tiles.push({
                id: i,
                origin: {
                    from: Cartesian.copy(from),
                    to: Cartesian.copy(to),
                },
                client: {
                    from: Cartesian.copy(from),
                    to: Cartesian.copy(to),
                },
                rotation: 0,
            });
        }
    }
}