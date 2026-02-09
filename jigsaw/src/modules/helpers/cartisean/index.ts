import type { TPosition } from "../../../shared/types/state/position";

export class Cartesian {
    static copy(source: TPosition): TPosition {
        return {
            y: source.y,
            x: source.x,
        };
    }
}