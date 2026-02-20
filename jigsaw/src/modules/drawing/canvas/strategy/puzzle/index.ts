import { COLOR_BLACK, COLOR_GREEN } from "../../../../../shared/constants";
import type { TPosition } from "../../../../../shared/types/state/position";
import { TilePatternEnum } from "../../../../../shared/types/state/tile/enums";
import { Cartesian } from "../../../../helpers/cartisean";
import { CanvasArc } from "../../../arc";
import type { TArcProps } from "../../../arc/types";
import { CanvasLine } from "../../../line";
import { StrokeWidth } from "../../../line/values";
import { CanvasState } from "../../state";
import { CanvasTarget } from "../target";
import { CanvasPuzzleEvents } from "./events";
import { pieces } from "./state";
import { ArcStyle, drawLines, drawTiles, LineStyle } from "./values";

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
        this.#drawTilesOld();
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

    static #drawTilesOld() {
        const { rows, columns } = CanvasState.grid;

        let y;
        let x;
        let from: TPosition;
        let to: TPosition;
        let rightCenter: TPosition;
        let bottomCenter: TPosition;
        let arcProps: TArcProps;
        let isOutRight: boolean = false;
        let isOutDown: boolean = false;

        const length = rows * columns;
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

            if (x !== columns - 1) {
                rightCenter = {
                    y: from.y + (to.y - from.y) / 2,
                    x: to.x,
                }

                arcProps = {
                    center: rightCenter,
                    radius: CanvasState.unit / 5,
                    fromAngle: 0,
                    toAngle: 0,
                    lineStyle: ArcStyle,
                };

                isOutRight = Math.round(Math.random()) === 1;
                if (isOutRight) {
                    arcProps.fromAngle = -Math.PI / 2;
                    arcProps.toAngle = Math.PI / 2;
                }
                else {
                    rightCenter.x += StrokeWidth;
                    arcProps.fromAngle = Math.PI / 2;
                    arcProps.toAngle = -Math.PI / 2;
                }

                CanvasLine.replace(
                    {
                        fromContext: CanvasTarget.context,
                        toContext: this.context,
                    },
                    {
                        fromPosition: {
                            y: rightCenter.y - arcProps.radius,
                            x: to.x - arcProps.radius,
                        },
                        toPosition: {
                            y: rightCenter.y + arcProps.radius,
                            x: to.x + 2 * arcProps.radius,
                        },
                    });

                CanvasArc.draw(this.context, arcProps);
            }

            if (y !== rows - 1) {
                bottomCenter = {
                    y: to.y,
                    x: from.x + (to.x - from.x) / 2,
                }

                arcProps = {
                    center: bottomCenter,
                    radius: CanvasState.unit / 5,
                    fromAngle: 0,
                    toAngle: 0,
                    lineStyle: ArcStyle,
                };

                isOutDown = Math.round(Math.random()) === 1;
                if (isOutDown) {
                    arcProps.fromAngle = 0;
                    arcProps.toAngle = Math.PI;
                }
                else {
                    bottomCenter.y += StrokeWidth;
                    arcProps.fromAngle = Math.PI;
                    arcProps.toAngle = 0;
                }

                CanvasLine.replace(
                    {
                        fromContext: CanvasTarget.context,
                        toContext: this.context,
                    },
                    {
                        fromPosition: {
                            y: to.y - arcProps.radius,
                            x: bottomCenter.x - arcProps.radius,
                        },
                        toPosition: {
                            y: to.y + 2 * arcProps.radius,
                            x: bottomCenter.x + arcProps.radius,
                        },
                    });

                CanvasArc.draw(this.context, arcProps);
            }

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
                top: this.#setTopTilePattern(y, i, x, columns),
                right: this.#setRightTilePattern(x, columns, isOutRight),
                down: this.#setDownTilePattern(y, rows, isOutDown),
                left: this.#setLeftTilePattern(x, i),
                rotation: 0,
            });
        }
    }

    static #setTopTilePattern(y: number, i: number, x: number, columns: number) {
        return y === 0 ? TilePatternEnum.None : pieces.get(i - x - columns)!.down;
    }

    static #setRightTilePattern(x: number, columns: number, isOutRight: boolean) {
        if (x === columns - 1) {
            return TilePatternEnum.None;
        }
        else if (isOutRight) {
            return TilePatternEnum.Outward;
        }
        else {
            return TilePatternEnum.Inward;
        }
    }

    static #setDownTilePattern(y: number, rows: number, isOutDown: boolean) {
        if (y === rows - 1) {
            return TilePatternEnum.None;
        }
        else if (isOutDown) {
            return TilePatternEnum.Outward;
        }
        else {
            return TilePatternEnum.Inward;
        }
    }

    static #setLeftTilePattern(x: number, i: number) {
        return x === 0 ? TilePatternEnum.None : pieces.get(i - 1)!.right;
    }

    static #drawTiles() {
        const { rows, columns } = CanvasState.grid;

        let y;
        let x;
        let position: TPosition;

        const length = rows * columns;
        const radius = CanvasState.unit / 4 - StrokeWidth / 2;


        for (let i = 0; i < length; i++) {
            y = Math.round(Math.floor(i / columns));
            x = Math.round(Math.floor(i % columns));

            position = {
                y: y * CanvasState.unit + StrokeWidth / 2,
                x: x * CanvasState.unit + StrokeWidth / 2,
            };

            LineStyle.color = COLOR_GREEN

            const path = new Path2D();

            this.#drawTopLeft(path, y, position);
            this.#drawTopCurve(path, y, position, radius);
            this.#drawTopRight(path, y, position);

            this.#drawRightUpper(path, x, position);
            this.#drawRightCurve(path, x, position, radius);
            this.#drawRightLower(path, x, position);

            this.#drawBottomRight(path, y, position);
            this.#drawBottomCurve(path, y, position, radius);
            this.#drawBottomLeft(path, y, position);

            this.#drawLeftLower(path, x, position);
            this.#drawLeftCurve(path, x, i, position, radius);
            this.#drawLeftUpper(path, x, position);
        }
    }

    static #drawTopLeft(path: Path2D, y: number, position: TPosition) {
        if (y === 0) {
            path.moveTo(position.x, position.y);
            position.x += CanvasState.unit / 4;
            path.lineTo(position.x, position.y);
        }

        CanvasLine.drawPath(this.context, path, LineStyle);
    }

    static #drawTopCurve(path: Path2D, y: number, position: TPosition, radius: number) {
        if (y === 0) {
            path.moveTo(position.x, position.y);
            position.x += CanvasState.unit / 2;
            path.lineTo(position.x, position.y);
        }

        CanvasLine.drawPath(this.context, path, LineStyle);
    }

    static #drawTopRight(path: Path2D, y: number, position: TPosition) {
        if (y === 0) {
            path.moveTo(position.x, position.y);
            position.x += CanvasState.unit / 4;
            path.lineTo(position.x, position.y);
        }

        CanvasLine.drawPath(this.context, path, LineStyle);
    }

    static #drawRightUpper(path: Path2D, x: number, position: TPosition) {
        if (x === CanvasState.grid.columns - 1) {
            path.moveTo(position.x, position.y);
            position.x += CanvasState.unit / 4;
            path.lineTo(position.x, position.y);
        }
        else {
            position.y -= StrokeWidth / 2;
            path.moveTo(position.x, position.y);
            position.y += CanvasState.unit / 4 + StrokeWidth;
            path.lineTo(position.x, position.y);
        }

        CanvasLine.drawPath(this.context, path, LineStyle);
    }

    static #drawRightCurve(path: Path2D, x: number, position: TPosition, radius: number) {
        if (x === CanvasState.grid.columns - 1) {
            path.moveTo(position.x, position.y);
            position.x += CanvasState.unit / 2;
            path.lineTo(position.x, position.y);
        }
        else {

            if (Math.round(Math.random())) {
                path.arc(
                    position.x,
                    position.y + radius,
                    radius,
                    -Math.PI / 2,
                    Math.PI / 2);
            }
            else {
                path.arc(
                    position.x,
                    position.y + radius,
                    radius,
                    -Math.PI / 2,
                    Math.PI / 2,
                    true);
            }

            position.y += radius * 2;
        }

        CanvasLine.drawPath(this.context, path, LineStyle);
    }

    static #drawRightLower(path: Path2D, x: number, position: TPosition) {
        if (x === CanvasState.grid.columns - 1) {
            path.moveTo(position.x, position.y);
            position.x += CanvasState.unit / 4;
            path.lineTo(position.x, position.y);
        }
        else {
            position.y -= StrokeWidth / 2;
            path.moveTo(position.x, position.y);
            position.y += CanvasState.unit / 4 + StrokeWidth;
            path.lineTo(position.x, position.y);
        }

        CanvasLine.drawPath(this.context, path, LineStyle);
    }

    static #drawBottomRight(path: Path2D, y: number, position: TPosition) {
        if (y === CanvasState.grid.rows - 1) {

        }
        else {
            position.x += StrokeWidth / 2;
            path.moveTo(position.x, position.y);
            position.x -= CanvasState.unit / 4 + StrokeWidth;
            path.lineTo(position.x, position.y);
        }

        CanvasLine.drawPath(this.context, path, LineStyle);
    }

    static #drawBottomCurve(path: Path2D, y: number, position: TPosition, radius: number) {
        if (y === CanvasState.grid.columns - 1) {
            path.moveTo(position.x, position.y);
            position.x -= CanvasState.unit / 2;
            path.lineTo(position.x, position.y);
        }
        else {
            if (Math.round(Math.random())) {
                path.arc(
                    position.x - radius,
                    position.y,
                    radius,
                    0,
                    Math.PI);
            }
            else {
                path.arc(
                    position.x - radius,
                    position.y,
                    radius,
                    0,
                    Math.PI,
                    true);
            }

            position.x -= radius * 2;
        }

        CanvasLine.drawPath(this.context, path, LineStyle);
    }

    static #drawBottomLeft(path: Path2D, y: number, position: TPosition) {
        if (y === CanvasState.grid.rows - 1) {

        }
        else {
            position.x += StrokeWidth / 2;
            path.moveTo(position.x, position.y);
            position.x -= CanvasState.unit / 4 + StrokeWidth;
            path.lineTo(position.x, position.y);
        }

        CanvasLine.drawPath(this.context, path, LineStyle);
    }

    static #drawLeftLower(path: Path2D, x: number, position: TPosition) {
        if (x === 0) {
            position.y += StrokeWidth / 2;
            path.moveTo(position.x, position.y);
            position.y -= CanvasState.unit / 4 + StrokeWidth;
            path.lineTo(position.x, position.y);
        }
        else {
            position.y += StrokeWidth / 2;
            path.moveTo(position.x, position.y);
            position.y -= CanvasState.unit / 4 + StrokeWidth;
            path.lineTo(position.x, position.y);
        }

        CanvasLine.drawPath(this.context, path, LineStyle);
    }

    static #drawLeftCurve(path: Path2D, x: number, id: number, position: TPosition, radius: number) {
        if (x === 0) {
            path.moveTo(position.x, position.y);
            position.y -= CanvasState.unit / 2;
            path.lineTo(position.x, position.y);
        }
        else {

            if (Math.round(Math.random())) {
                path.arc(
                    position.x,
                    position.y - radius,
                    radius,
                    Math.PI / 2,
                    -Math.PI / 2);
            }
            else {
                path.arc(
                    position.x,
                    position.y - radius,
                    radius,
                    Math.PI / 2,
                    -Math.PI / 2,
                    true);
            }

            position.y -= radius * 2;
        }

        CanvasLine.drawPath(this.context, path, LineStyle);
    }

    static #drawLeftUpper(path: Path2D, x: number, position: TPosition) {
        if (x === 0) {
            path.moveTo(position.x, position.y);
            position.y -= CanvasState.unit / 4;
            path.lineTo(position.x, position.y);
        }
        else {
            position.y += StrokeWidth / 2;
            path.moveTo(position.x, position.y);
            position.y -= CanvasState.unit / 4 + 3 * StrokeWidth / 2;
            path.lineTo(position.x, position.y);
        }

        CanvasLine.drawPath(this.context, path, LineStyle);
    }
}