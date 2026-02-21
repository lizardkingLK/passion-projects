import type { TPosition } from "../../../../../../../shared/types/state/position";
import { TilePatternEnum } from "../../../../../../../shared/types/state/tile/enums";
import { CanvasState } from "../../../../state";
import { StrokeWidth } from "../../values";

export class Patterns {
    static drawTopLeft(path: Path2D, y: number, position: TPosition) {
        if (y === 0) {
            path.moveTo(position.x, position.y);
            position.x += CanvasState.unit / 4;
            path.lineTo(position.x, position.y);
        }
        else {
            position.x -= StrokeWidth / 2;
            path.moveTo(position.x, position.y);
            position.x += CanvasState.unit / 4 + StrokeWidth;
            path.lineTo(position.x, position.y);
        }
    }

    static drawTopCurve(path: Path2D, top: number, position: TPosition, radius: number) {
        if (top === TilePatternEnum.None) {
            path.moveTo(position.x, position.y);
            position.x += CanvasState.unit / 2;
            path.lineTo(position.x, position.y);
        }
        else if (top === TilePatternEnum.Outward) {
            path.arc(
                position.x + radius,
                position.y,
                radius,
                Math.PI,
                0);
            position.x += radius * 2;
        }
        else if (top === TilePatternEnum.Inward) {
            path.arc(
                position.x + radius,
                position.y,
                radius,
                Math.PI,
                0,
                true);
            position.x += radius * 2;
        }
    }

    static drawTopRight(path: Path2D, y: number, position: TPosition) {
        if (y === 0) {
            path.moveTo(position.x, position.y);
            position.x += CanvasState.unit / 4;
            path.lineTo(position.x, position.y);
        }
        else {
            position.x -= StrokeWidth / 2;
            path.moveTo(position.x, position.y);
            position.x += CanvasState.unit / 4 + StrokeWidth;
            path.lineTo(position.x, position.y);
        }
    }

    static drawRightUpper(path: Path2D, x: number, position: TPosition) {
        if (x === CanvasState.grid.columns - 1) {
            position.y -= StrokeWidth / 2;
            path.moveTo(position.x, position.y);
            position.y += CanvasState.unit / 4;
            path.lineTo(position.x, position.y);
        }
        else {
            position.y -= StrokeWidth / 2;
            path.moveTo(position.x, position.y);
            position.y += CanvasState.unit / 4 + StrokeWidth;
            path.lineTo(position.x, position.y);
        }
    }

    static drawRightCurve(path: Path2D, right: number, position: TPosition, radius: number) {
        if (right === TilePatternEnum.None) {
            path.moveTo(position.x, position.y);
            position.y += CanvasState.unit / 2;
            path.lineTo(position.x, position.y);
        }
        else if (right === TilePatternEnum.Outward) {
            path.arc(
                position.x,
                position.y + radius,
                radius,
                -Math.PI / 2,
                Math.PI / 2);
            position.y += radius * 2;
        }
        else if (right === TilePatternEnum.Inward) {
            path.arc(
                position.x,
                position.y + radius,
                radius,
                -Math.PI / 2,
                Math.PI / 2,
                true);
            position.y += radius * 2;
        }
    }

    static drawRightLower(path: Path2D, x: number, position: TPosition) {
        if (x === CanvasState.grid.columns - 1) {
            path.moveTo(position.x, position.y);
            position.y += CanvasState.unit / 4 + StrokeWidth / 2;
            path.lineTo(position.x, position.y);
        }
        else {
            position.y -= StrokeWidth / 2;
            path.moveTo(position.x, position.y);
            position.y += CanvasState.unit / 4 + StrokeWidth;
            path.lineTo(position.x, position.y);
        }
    }

    static drawBottomRight(path: Path2D, y: number, position: TPosition) {
        if (y === CanvasState.grid.rows - 1) {
            position.x += StrokeWidth / 2;
            path.moveTo(position.x, position.y);
            position.x -= CanvasState.unit / 4 + StrokeWidth;
            path.lineTo(position.x, position.y);
        }
        else {
            position.x += StrokeWidth / 2;
            path.moveTo(position.x, position.y);
            position.x -= CanvasState.unit / 4 + StrokeWidth;
            path.lineTo(position.x, position.y);
        }
    }

    static drawBottomCurve(path: Path2D, bottom: number, position: TPosition, radius: number) {
        if (bottom === TilePatternEnum.None) {
            path.moveTo(position.x, position.y);
            position.x -= CanvasState.unit / 2;
            path.lineTo(position.x, position.y);
        }
        else if (bottom === TilePatternEnum.Outward) {
            path.arc(
                position.x - radius,
                position.y,
                radius,
                0,
                Math.PI);
            position.x -= radius * 2;
        }
        else if (bottom === TilePatternEnum.Inward) {
            path.arc(
                position.x - radius,
                position.y,
                radius,
                0,
                Math.PI,
                true);
            position.x -= radius * 2;
        }
    }

    static drawBottomLeft(path: Path2D, y: number, position: TPosition) {
        if (y === CanvasState.grid.rows - 1) {
            position.x += StrokeWidth / 2;
            path.moveTo(position.x, position.y);
            position.x -= CanvasState.unit / 4;
            path.lineTo(position.x, position.y);
        }
        else {
            position.x += StrokeWidth / 2;
            path.moveTo(position.x, position.y);
            position.x -= CanvasState.unit / 4 + StrokeWidth;
            path.lineTo(position.x, position.y);
        }
    }

    static drawLeftLower(path: Path2D, x: number, position: TPosition) {
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
    }

    static drawLeftCurve(path: Path2D, left: number, position: TPosition, radius: number) {
        if (left === TilePatternEnum.None) {
            path.moveTo(position.x, position.y);
            position.y -= CanvasState.unit / 2;
            path.lineTo(position.x, position.y);
        }
        else if (left === TilePatternEnum.Outward) {
            path.arc(
                position.x,
                position.y - radius,
                radius,
                Math.PI / 2,
                -Math.PI / 2);
            position.y -= radius * 2;
        }
        else if (left === TilePatternEnum.Inward) {
            path.arc(
                position.x,
                position.y - radius,
                radius,
                Math.PI / 2,
                -Math.PI / 2,
                true);
            position.y -= radius * 2;
        }
    }

    static drawLeftUpper(path: Path2D, x: number, position: TPosition) {
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
    }
}