import { COLOR_BLACK, COLOR_GREEN } from "../../../../../shared/constants";
import type { TPosition } from "../../../../../shared/types/state/position";
import { Cartesian } from "../../../../helpers/cartisean";
import { CanvasArc } from "../../../arc";
import type { TArcProps } from "../../../arc/types";
import { CanvasLine } from "../../../line";
import { StrokeWidth } from "../../../line/values";
import { CanvasState } from "../../state";
import { CanvasBoard } from "../board";
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

    static #drawTiles() {
        const { rows, columns } = CanvasState.grid;

        let y;
        let x;
        let from: TPosition;
        let to: TPosition;
        let rightCenter: TPosition;
        let bottomCenter: TPosition;
        let arcProps: TArcProps;
        let isOut;

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

                isOut = Math.round(Math.random());
                if (isOut) {
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

                isOut = Math.round(Math.random());
                if (isOut) {
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
                rotation: 0,
            });
        }
    }
}