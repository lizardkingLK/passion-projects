import { COLOR_RED, LINE_WIDTH } from "../../../../../../shared/constants";
import type { TLineProps } from "../../../../line/types";

export const UnitCount = 5;

export const StrokeWidth = LINE_WIDTH * 5;

export const LineStyle: TLineProps = {
    width: StrokeWidth,
    color: COLOR_RED,
};

export const ArcStyle: TLineProps = {
    width: StrokeWidth,
    color: COLOR_RED,
};
