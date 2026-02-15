import type { TPosition } from "../../../../shared/types/state/position";
import type { TLineProps } from "../../line/types";

export type TArcProps = {
    center: TPosition,
    radius: number,
    fromAngle: number,
    toAngle: number,
    lineStyle?: TLineProps,
};