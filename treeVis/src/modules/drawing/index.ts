import { SCREEN_UNIT, SETTING_USE_GRID, USE_GRID } from "../constants";
import { Settings } from "../settings";

export class Drawing {
  static screenUnit: number = SCREEN_UNIT;

  static useGrid() {
    return Settings.get(SETTING_USE_GRID) ?? USE_GRID;
  }
}
