import { TilePatternEnum } from "../../../../../../../shared/types/state/tile/enums";
import { pieces } from "../../state";

export class Tiles {
    static getTopTilePattern(y: number, i: number, columns: number) {
        if (y === 0) {
            return TilePatternEnum.None;
        }

        const previous = pieces.get(i - columns)!;
        const target = pieces.get(i)!;
        if (!target) {
            return this.#reversePattern(previous.bottom);
        }

        return target.top = this.#reversePattern(previous.bottom);
    }

    static setRightTilePattern(x: number, columns: number, isOutRight: boolean) {
        if (x === columns - 1) {
            return TilePatternEnum.None;
        }
        else if (isOutRight) {
            return TilePatternEnum.Outward;
        }

        return TilePatternEnum.Inward;
    }

    static getRightTilePattern(x: number, i: number, columns: number) {
        if (x === columns - 1) {
            return TilePatternEnum.None;
        }

        return pieces.get(i)!.right;
    }

    static setBottomTilePattern(y: number, rows: number, isOutDown: boolean) {
        if (y === rows - 1) {
            return TilePatternEnum.None;
        }
        else if (isOutDown) {
            return TilePatternEnum.Outward;
        }

        return TilePatternEnum.Inward;
    }

    static getBottomTilePattern(y: number, i: number, rows: number) {
        if (y === rows - 1) {
            return TilePatternEnum.None;
        }

        return pieces.get(i)!.bottom;
    }

    static getLeftTilePattern(x: number, i: number) {
        if (x === 0) {
            return TilePatternEnum.None;
        }

        const previous = pieces.get(i - 1)!;
        const target = pieces.get(i)!;
        if (!target) {
            return this.#reversePattern(previous.right);
        }

        return target.left = this.#reversePattern(previous.right);
    }

    static #reversePattern(pattern: number) {
        if (pattern === TilePatternEnum.Inward) {
            return TilePatternEnum.Outward;
        }
        else if (pattern === TilePatternEnum.Outward) {
            return TilePatternEnum.Inward;
        }

        return TilePatternEnum.None;
    }
}