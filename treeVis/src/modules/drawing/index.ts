import {
  LINE_WIDTH,
  SCREEN_UNIT,
  SETTING_LINE_WIDTH,
  SETTING_NODE_SIZE,
  SETTING_USE_GRID,
  SETTING_USE_IMMEDIATE_DRAW,
  USE_GRID,
  USE_IMMEDIATE_DRAW,
} from "../constants";
import { Settings } from "../settings";

export class Drawing {
  static useGrid() {
    return Settings.get(SETTING_USE_GRID) ?? USE_GRID;
  }

  static useImmediateDraw() {
    return Settings.get(SETTING_USE_IMMEDIATE_DRAW) ?? USE_IMMEDIATE_DRAW;
  }

  static getLineWidth() {
    return 2 * (Settings.get<number>(SETTING_LINE_WIDTH) ?? LINE_WIDTH);
  }

  static getScreenUnit() {
    return SCREEN_UNIT * (Settings.get<number>(SETTING_NODE_SIZE) ?? 1);
  }
}
