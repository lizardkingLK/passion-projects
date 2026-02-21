import type { TPosition } from "../../../../../shared/types/state/position";
import { Cartesian } from "../../../../helpers/cartisean";
import { CanvasLine } from "../../../line";
import { StrokeWidth } from "../../../line/values";
import { CanvasState } from "../../state";
import { CanvasPuzzleEvents } from "./events";
import { Patterns } from "./helpers/patterns";
import { Tiles } from "./helpers/tiles";
import { pieces } from "./state";
import { LineStyle } from "./values";

export class CanvasPuzzle {
    static canvas: HTMLCanvasElement;
    static context: CanvasRenderingContext2D;

    static draw(image: HTMLImageElement) {
        CanvasPuzzle.canvas = document.querySelector("#canvasPuzzle") as HTMLCanvasElement;
        CanvasPuzzle.context = this.canvas.getContext("2d") as CanvasRenderingContext2D;

        this.canvas.height = CanvasState.height;
        this.canvas.width = CanvasState.width;

        this.#drawImage(image);
        this.#drawTiles();

        CanvasPuzzleEvents.set();
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
        const radius = CanvasState.unit / 4 - StrokeWidth / 2;

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
            CanvasLine.drawPath(this.context, path, LineStyle);
        }
    }
}