import { LINE_WIDTH } from "../../../shared/constants";
import type { TPosition } from "../../../shared/types/state/position";
import { CanvasLine } from "../line";
import type { TLineProps } from "../line/types";
import { CanvasState } from "../canvas/state";
import type { TPiece } from "../../../shared/types/state/tile";
import { Cartesian } from "../../helpers/cartisean";

const lineStyle: TLineProps = { width: LINE_WIDTH, color: "red" };
const drawTiles = false;
const drawDiagonal = false;

export class CanvasGrid {
    static context: CanvasRenderingContext2D;

    static draw(context: CanvasRenderingContext2D) {
        this.context = context;

        this.drawGrid();
        this.drawShapes();
        this.drawTiles();
    }

    static drawTiles() {
        const tiles: TPiece[] = [];

        const { rows, columns } = CanvasState.grid;
        const length = rows * columns;

        let y;
        let x;
        let from: TPosition;
        let to: TPosition;
        for (let i = 0; i < length; i++) {
            y = Math.round(Math.floor(i / columns));
            x = Math.round(Math.floor(i % columns));

            if (drawTiles) {
                this.context.fillStyle = "green"
                this.context.fillRect(
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
                CanvasLine.draw(this.context, from, to, lineStyle);
            }

            // const shouldRotate = Math.round(Math.random());
            // if (shouldRotate) {
            //     rotate
            // }

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

    static drawShapes() {
        const { rows, columns } = CanvasState.grid;
        const length = rows * columns;

        let y;
        let x;
        let from: TPosition;
        let to: TPosition;
        for (let i = 0; i < length; i++) {
            y = Math.round(Math.floor(i / columns));
            x = Math.round(Math.floor(i % columns));

            from = {
                y: (y + 1) * LINE_WIDTH + y * (CanvasState.unit - LINE_WIDTH),
                x: (x + 1) * LINE_WIDTH + x * (CanvasState.unit - LINE_WIDTH),
            };
            to = {
                y: from.y + CanvasState.unit - LINE_WIDTH,
                x: from.x + CanvasState.unit - LINE_WIDTH,
            };

            // draw right if not right most
            

            // draw down if not low most
        }
    }

    static drawGrid() {
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
            CanvasLine.draw(this.context, from, to, lineStyle);
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
            CanvasLine.draw(this.context, from, to, lineStyle);
        }
    }
}