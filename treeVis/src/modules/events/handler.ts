import {
  CLASS_INFO,
  CLASS_SUCCESS,
  INFO_SAVED_SETTINGS,
  INFO_WAITING_INPUT,
  SETTING_NUMERIC_MAX,
  SETTING_NUMERIC_MIN,
  DURATION_FIVE_SECONDS,
  DURATION_INFINITE,
  DURATION_ONE_SECOND,
  INFO_RESET_SETTINGS,
  TREE_VISUAL,
  TREE_VISUAL_STATUS_CONTAINER,
  STRING_CLICK_TO_DOWNLOAD,
  TREE_SETTINGS_DOWNLOAD_LINK,
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
        className: CLASS_INFO,
        message: INFO_WAITING_INPUT,
        duration: DURATION_INFINITE,
      });
    }

    Handler.#inputChangeWait = setTimeout(() => {
      clearPopupStatusMessage(Handler.#inputChangePopup, () => {
        Handler.#inputChangePopup = null;
        this.#input.draw();
      });
    }, DURATION_FIVE_SECONDS);
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

  handleVisualSave() {
    const previousLink = document.querySelector(
      TREE_SETTINGS_DOWNLOAD_LINK
    ) as HTMLElement | null;
    if (previousLink) {
      previousLink.remove();
    }

    const treeVisual = document.querySelector(
      TREE_VISUAL
    )! as HTMLCanvasElement;

    treeVisual.toBlob((imageBlob) => {
      if (!imageBlob) {
        return;
      }

      const image = document.createElement("img");
      image.src = URL.createObjectURL(imageBlob);

      const fileReader = new FileReader();
      fileReader.readAsDataURL(imageBlob);

      fileReader.onloadend = () => {
        if (!fileReader.result) {
          return;
        }

        const downloadLink = document.createElement("a");
        downloadLink.href = fileReader.result as string;
        downloadLink.download = `${Date.now()}.png`;
        downloadLink.innerHTML = STRING_CLICK_TO_DOWNLOAD;
        downloadLink.setAttribute("class", "downloadLink");
        downloadLink.onclick = () => clearPopupStatusMessage(downloadLink);

        document
          .querySelector(TREE_VISUAL_STATUS_CONTAINER)!
          .appendChild(downloadLink);
      };
    });
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

  settingsResetRequested() {
    Settings.resetSettings();
    Settings.evaluateSettingConfigurations();

    popupStatusMessage({
      className: CLASS_SUCCESS,
      duration: DURATION_ONE_SECOND,
      message: INFO_RESET_SETTINGS,
    });
  }

  settingsSubmitted() {
    Settings.saveSettings();
    Settings.evaluateSettingConfigurations();

    popupStatusMessage({
      className: CLASS_SUCCESS,
      duration: DURATION_ONE_SECOND,
      message: INFO_SAVED_SETTINGS,
    });
  }
}
