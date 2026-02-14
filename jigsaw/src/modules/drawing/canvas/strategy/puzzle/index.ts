import { COLOR_BLACK, COLOR_GREEN } from "../../../../../shared/constants";
import type { TPosition } from "../../../../../shared/types/state/position";
import { Cartesian } from "../../../../helpers/cartisean";
import { CanvasLine } from "../../../line";
import { StrokeWidth } from "../../../line/values";
import { CanvasState } from "../../state";
import { CanvasPuzzleEvents } from "./events";
import { pieces } from "./state";
import { drawLines, drawTiles, LineStyle } from "./values";

export class CanvasPuzzle {
    static canvas: HTMLCanvasElement;
    static context: CanvasRenderingContext2D;

    static draw(image: HTMLImageElement) {
        CanvasPuzzle.canvas = document.querySelector("#canvasPuzzle") as HTMLCanvasElement;
        CanvasPuzzle.context = this.canvas.getContext("2d") as CanvasRenderingContext2D;

        this.canvas.height = CanvasState.height;
        this.canvas.width = CanvasState.width;

        this.#drawImage(image);
        this.#drawGrid();
        this.#drawTiles();

        CanvasPuzzleEvents.set(this.canvas);
    }

    static #drawImage(image: HTMLImageElement) {
        this.context.drawImage(
            image,
            StrokeWidth,
            StrokeWidth,
            CanvasState.grid.width,
            CanvasState.grid.height);
    }

    static #drawGrid() {
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

    static #drawTiles() {
        const { rows, columns } = CanvasState.grid;
        
        let y;
        let x;
        let from: TPosition;
        let to: TPosition;

        const length = rows * columns;
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

            // draw shape right

            // draw shape down

            if (drawTiles) {
                this.context.fillStyle = COLOR_GREEN;
                this.context.fillRect(
                    from.x,
                    from.y,
                    CanvasState.unit - StrokeWidth,
                    CanvasState.unit - StrokeWidth);
            }

            if (drawLines) {
                LineStyle.color = COLOR_BLACK;
                CanvasLine.draw(this.context, from, to, LineStyle);
            }

            pieces.set(i, {
                id: i,
                target: {
                    from: Cartesian.copy(from),
                    to: Cartesian.copy(to),
                },
                puzzle: {
                    from: Cartesian.copy(from),
                    to: Cartesian.copy(to),
                },
                rotation: 0,
            });
        }
    }
}