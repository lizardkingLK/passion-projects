import { popupStatusMessage } from "../utility";
import {
  COLOR_SUCCESS,
  INFO_SAVED_SETTINGS,
  TIME_ONE_SECOND,
} from "../constants";
import { Settings } from "../settings";
import { Input } from "../input";

export class Handler {
  #input: Input;

  constructor() {
    this.#input = Input.getInstance();
  }

  inputChanged() {
    this.#input.draw();
  }

  handleInputFormat() {
    this.#input.format();
  }

  inputFocusOutValidation() {
    this.#input.validate();
  }

  elementDragged(
    previousLeft: number,
    currentLeft: number,
    previousTop: number,
    currentTop: number
  ) {
    return {
      dragStart: (event: DragEvent) => {
        previousLeft = event.pageX;
        previousTop = event.pageY;
      },
      dragEnd: (event: DragEvent) => {
        currentLeft = event.pageX;
        currentTop = event.pageY;

        const target = event.currentTarget as HTMLElement;
        const bcr = target.getBoundingClientRect();

        const newCenterX =
          window.scrollX +
          bcr.left +
          bcr.width / 2 +
          (currentLeft - previousLeft) +
          "px";
        target.style.left = newCenterX;

        const newCenterY =
          window.scrollY +
          bcr.top +
          bcr.height / 2 +
          (currentTop - previousTop) +
          "px";
        target.style.top = newCenterY;
      },
    };
  }

  settingsSubmitted() {
    Settings.saveSettings();
    Settings.evaluateSettings();

    popupStatusMessage({
      color: COLOR_SUCCESS,
      duration: TIME_ONE_SECOND,
      message: INFO_SAVED_SETTINGS,
    });
  }
}
