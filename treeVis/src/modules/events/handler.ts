import {
  COLOR_INFO,
  COLOR_SUCCESS,
  INFO_SAVED_SETTINGS,
  INFO_WAITING_INPUT,
  SETTING_NUMERIC_MAX,
  SETTING_NUMERIC_MIN,
  TIME_FIVE_SECONDS,
  TIME_INFINITE,
  TIME_ONE_SECOND,
} from "../constants";
import { Settings } from "../settings";
import { Input } from "../input";
import { popupStatusMessage, clearPopupStatusMessage } from "../notifying";
import { Drawing } from "../drawing";

export class Handler {
  static #inputChangeWait: number;
  static #inputChangePopup: HTMLParagraphElement | null;
  #input: Input;

  constructor() {
    Handler.#inputChangeWait = 0;
    Handler.#inputChangePopup = null;

    this.#input = Input.getInstance();
  }

  inputChanged(event: CustomEvent) {
    if (event.detail?.isSynthetic) {
      this.#input.draw();
      return;
    }

    if (Drawing.useImmediateDraw()) {
      this.#input.draw();
      return;
    }

    if (Handler.#inputChangeWait) {
      clearTimeout(Handler.#inputChangeWait);
    }

    if (!Handler.#inputChangePopup) {
      Handler.#inputChangePopup = popupStatusMessage({
        color: COLOR_INFO,
        message: INFO_WAITING_INPUT,
        duration: TIME_INFINITE,
      });
    }

    Handler.#inputChangeWait = setTimeout(() => {
      clearPopupStatusMessage(Handler.#inputChangePopup, () => {
        Handler.#inputChangePopup = null;
        this.#input.draw();
      });
    }, TIME_FIVE_SECONDS);
  }

  handleInputFormat() {
    this.#input.format();
  }

  inputFocusOutValidation() {
    this.#input.validate();
  }

  numericalSettingChanged(target: HTMLInputElement) {
    const value = Number.parseInt(target.value);
    if (value < SETTING_NUMERIC_MIN) {
      target.value = SETTING_NUMERIC_MIN.toString();
      return;
    }

    if (value > SETTING_NUMERIC_MAX) {
      target.value = SETTING_NUMERIC_MAX.toString();
      return;
    }
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
