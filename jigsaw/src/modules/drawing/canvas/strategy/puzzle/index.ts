import { COLOR_GREEN } from "../../../../../shared/constants";
import type { TPosition } from "../../../../../shared/types/state/position";
import { Cartesian } from "../../../../helpers/cartisean";
import { CanvasLine } from "../../../line";
import { CanvasState } from "../../state";
import { CanvasPuzzleEvents } from "./events";
import { Patterns } from "./helpers/patterns";
import { Tiles } from "./helpers/tiles";
import { pieces } from "./state";
import { LineStyle, StrokeWidth } from "./values";

export class CanvasPuzzle {
    static canvas: HTMLCanvasElement;
    static context: CanvasRenderingContext2D;
    static isDragging?: boolean;
    static radius: number;

    static draw(image: HTMLImageElement) {
        CanvasPuzzle.canvas = document.querySelector("#canvasPuzzle") as HTMLCanvasElement;
        CanvasPuzzle.context = this.canvas.getContext("2d") as CanvasRenderingContext2D;

        this.canvas.height = CanvasState.height;
        this.canvas.width = CanvasState.width;

        this.#drawImage(image);
        this.#drawTiles();

        CanvasPuzzleEvents.setMouseDown(this.#handleMouseDown);
        CanvasPuzzleEvents.setMouseUp(this.#handleMouseUp);
        CanvasPuzzleEvents.setMouseMove(this.#handleMouseMove);
    }

    static #drawImage(image: HTMLImageElement) {
        this.context.drawImage(
            image,
            StrokeWidth,
            StrokeWidth,
            CanvasState.grid.width,
            CanvasState.grid.height);
    }

    static #drawTiles() {
        const { rows, columns } = CanvasState.grid;
        const length = rows * columns;
        this.radius = CanvasState.unit / 4 - StrokeWidth / 2;

        let y;
        let x;
        let from: TPosition;
        let to: TPosition;
        let position: TPosition;
        let isOutRight: boolean;
        let isOutDown: boolean;
        for (let i = 0; i < length; i++) {
            y = Math.round(Math.floor(i / columns));
            x = Math.round(Math.floor(i % columns));

            from = {
                y: StrokeWidth + y * CanvasState.unit,
                x: StrokeWidth + x * CanvasState.unit,
            };
            to = {
                y: from.y + CanvasState.unit - StrokeWidth,
                x: from.x + CanvasState.unit - StrokeWidth,
            };

            isOutRight = Math.round(Math.random()) === 1;
            isOutDown = Math.floor(Math.random()) === 1;

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
                top: Tiles.getTopTilePattern(y, i, columns),
                right: Tiles.setRightTilePattern(x, columns, isOutRight),
                bottom: Tiles.setBottomTilePattern(y, rows, isOutDown),
                left: Tiles.getLeftTilePattern(x, i),
                rotation: 0,
            });

            position = {
                y: y * CanvasState.unit + StrokeWidth / 2,
                x: x * CanvasState.unit + StrokeWidth / 2,
            };

            // debugger;

            const path = this.#createPath({ y, x }, position, { radius: this.radius, i }, { rows, columns });

            CanvasLine.drawPath(this.context, path, LineStyle);
        }
    }

    static #createPath(
        index: { y: number; x: number; },
        position: TPosition,
        options: { i: number, radius: number, },
        dimensions: { rows: number; columns: number; }) {
        const { y, x } = index;
        const { i, radius } = options;
        const { rows, columns } = dimensions;
        const path = new Path2D();

        Patterns.drawTopLeft(path, y, position);
        Patterns.drawTopCurve(
            path,
            Tiles.getTopTilePattern(y, i, columns),
            position,
            radius);
        Patterns.drawTopRight(path, y, position);

        Patterns.drawRightUpper(path, x, position);
        Patterns.drawRightCurve(
            path,
            Tiles.getRightTilePattern(x, i, columns),
            position,
            radius);
        Patterns.drawRightLower(path, x, position);

        Patterns.drawBottomRight(path, y, position);
        Patterns.drawBottomCurve(
            path,
            Tiles.getBottomTilePattern(y, i, rows),
            position,
            radius);
        Patterns.drawBottomLeft(path, y, position);

        Patterns.drawLeftLower(path, x, position);
        Patterns.drawLeftCurve(
            path,
            Tiles.getLeftTilePattern(x, i),
            position,
            radius);
        Patterns.drawLeftUpper(path, x, position);

        // LineStyle.width = 1;
        path.closePath();

        return path;
    }

    static #handleMouseDown(event: MouseEvent) {
        CanvasPuzzle.isDragging = true;

        const { pageY: cY, pageX: cX } = event;

        console.log("drag started", cY, cX);

        const { rows, columns } = CanvasState.grid;

        for (let i = 0; i < pieces.size; i++) {
            // add quad tree search here from library
            const piece = pieces.get(i)!;
            if (cY >= piece.puzzle.from.y && cY <= piece.puzzle.to.y && cX >= piece.puzzle.from.x && cX <= piece.puzzle.to.x) {
                // debugger;
                console.log(piece);

                const y = Math.round(Math.floor(i / columns));
                const x = Math.round(Math.floor(i % columns));

                const position = {
                    y: y * CanvasState.unit + StrokeWidth / 2,
                    x: x * CanvasState.unit + StrokeWidth / 2,
                };

                const path = CanvasPuzzle.#createPath({ y, x }, position, { radius: CanvasPuzzle.radius, i }, { rows, columns });

                LineStyle.color = COLOR_GREEN;
                CanvasLine.drawPath(CanvasPuzzle.context, path, LineStyle);

                break;
            }
        }
    }

    static #handleMouseUp(event: MouseEvent) {
        CanvasPuzzle.isDragging = false;
        const { clientY: y, clientX: x } = event;

        console.log("drag ended", y, x);
    }

    static #handleMouseMove(event: MouseEvent) {
        if (!CanvasPuzzle.isDragging) {
            return;
        }

        // console.log("dragging");

        // const { clientY: y, clientX: x } = event;

        // console.log({ y, x });
    }
}

