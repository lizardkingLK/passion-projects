import type { TPosition } from "../../../../../shared/types/state/position";
import type { TPiece } from "../../../../../shared/types/state/tile";
import { Cartesian } from "../../../../helpers/cartisean";
import { CanvasLine } from "../../../line";
import { StrokeWidth } from "../../../line/values";
import { CanvasState } from "../../state";
import { CanvasPuzzleEvents } from "./events";
import { drawLines, drawTiles, LineStyle } from "./values";

export class CanvasPuzzle {
    static canvas: HTMLCanvasElement;
    static context: CanvasRenderingContext2D;

    static draw(image: HTMLImageElement) {
        CanvasPuzzle.canvas = document.querySelector("#canvasPuzzle") as HTMLCanvasElement;
        CanvasPuzzle.context = this.canvas.getContext("2d") as CanvasRenderingContext2D;

        this.canvas.height = CanvasState.height;
        this.canvas.width = CanvasState.width;

        this.drawImage(image);
        this.drawGrid();
        this.drawShapes();
        this.drawTiles();

        CanvasPuzzleEvents.set(this.canvas);
    }

    static drawImage(image: HTMLImageElement) {
        this.context.drawImage(
            image,
            StrokeWidth,
            StrokeWidth,
            CanvasState.grid.width,
            CanvasState.grid.height);
    }

    static drawGrid() {
        const { rows, columns } = CanvasState.grid;

        let from: TPosition;
        let to: TPosition;
        for (let i = 0; i <= rows; i++) {
            from = {
                y: StrokeWidth / 2 + i * CanvasState.unit,
                x: StrokeWidth,
            };
            to = {
                y: from.y,
                x: from.x + CanvasState.grid.width
            };

            CanvasLine.draw(this.context, from, to, LineStyle);
        }

        for (let i = 0; i <= columns; i++) {
            from = {
                y: 0,
                x: StrokeWidth / 2 + i * CanvasState.unit,
            };
            to = {
                y: CanvasState.grid.height + StrokeWidth,
                x: from.x,
            };

            CanvasLine.draw(this.context, from, to, LineStyle);
        }
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

            from = {
                y: (y + 1) * StrokeWidth + y * (CanvasState.unit - StrokeWidth),
                x: (x + 1) * StrokeWidth + x * (CanvasState.unit - StrokeWidth),
            };
            to = {
                y: from.y + CanvasState.unit - StrokeWidth,
                x: from.x + CanvasState.unit - StrokeWidth,
            };

            if (drawTiles) {
                this.context.fillStyle = "green"
                this.context.fillRect(
                    from.x,
                    from.y,
                    CanvasState.unit - StrokeWidth,
                    CanvasState.unit - StrokeWidth);
            }


            if (drawLines) {
                LineStyle.color = "black";
                CanvasLine.draw(this.context, from, to, LineStyle);
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

    static drawShapes() {
        // const { rows, columns } = CanvasState.grid;
        // const length = rows * columns;

        // let y;
        // let x;
        // let from: TPosition;
        // let to: TPosition;
        // for (let i = 0; i < length; i++) {
        //     y = Math.round(Math.floor(i / columns));
        //     x = Math.round(Math.floor(i % columns));

        //     from = {
        //         y: (y + 1) * LINE_WIDTH + y * (CanvasState.unit - LINE_WIDTH),
        //         x: (x + 1) * LINE_WIDTH + x * (CanvasState.unit - LINE_WIDTH),
        //     };
        //     to = {
        //         y: from.y + CanvasState.unit - LINE_WIDTH,
        //         x: from.x + CanvasState.unit - LINE_WIDTH,
        //     };

        //     // draw right if not right most


        //     // draw down if not low most
        // }
    }
}