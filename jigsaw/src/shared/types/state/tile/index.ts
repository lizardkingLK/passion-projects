import type { TPosition } from "../position";

export type TPiece = {
    id: number,
    target: {
        from: TPosition,
        to: TPosition,
    },
    puzzle: {
        from: TPosition,
        to: TPosition,
    },
    rotation: number,
};