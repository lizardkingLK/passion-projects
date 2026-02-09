import type { TPosition } from "../position";

export type TPiece = {
    id: number,
    origin: {
        from: TPosition,
        to: TPosition,
    },
    client: {
        from: TPosition,
        to: TPosition,
    },
    rotation: number,
};