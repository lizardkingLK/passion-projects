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
    top: number,
    right: number,
    down: number,
    left: number,
    rotation: number,
};