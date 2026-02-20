import { TilePatternEnum } from "../../../../../../../shared/types/state/tile/enums";
import { pieces } from "../../state";

export class Tiles {
    static setTopTilePattern(y: number, i: number, x: number, columns: number) {
        if (y === 0) {
            return TilePatternEnum.None;
        }

        return pieces.get(i - x - columns)!.down;
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

    static setDownTilePattern(y: number, rows: number, isOutDown: boolean) {
        if (y === rows - 1) {
            return TilePatternEnum.None;
        }
        else if (isOutDown) {
            return TilePatternEnum.Outward;
        }

        return TilePatternEnum.Inward;
    }

    static setLeftTilePattern(x: number, i: number) {
        if (x === 0) {
            return TilePatternEnum.None;
        }

        return pieces.get(i - 1)!.right;
    }
}