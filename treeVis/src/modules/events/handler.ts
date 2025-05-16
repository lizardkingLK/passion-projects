import {
  popupStatusMessage,
  treeAnalyze,
  validateJson,
} from "../utility";
import { Canvas } from "../canvas";
import {
  COLOR_ERROR,
  COLOR_INFO,
  COLOR_SUCCESS,
  INFO_SAVED_SETTINGS,
  KEY_TREE_VISUAL_SETTINGS,
  TIME_FOUR_SECONDS,
  TIME_ONE_SECOND,
} from "../constants";
import { Drawing } from "../drawing";
import { Json } from "../types";
import { Settings } from "../settings";

export class Handler {
  #canvas: Canvas;
  #message: string | null = null;

  constructor() {
    this.#canvas = new Canvas();
  }

  inputChanged(event: Event) {
    this.#canvas.clearGrid();
    this.#canvas.clearNodes();
    this.#canvas.setSize(0, 0);

    const {
      isSuccess: isValidObject,
      data: validData,
      message: validationErrorMessage,
    } = validateJson((<HTMLTextAreaElement>event.target).value);
    if (!isValidObject) {
      this.#message = validationErrorMessage;
      console.error(validationErrorMessage);
      return;
    }

    this.#message = null;

    const now = Date.now();

    const {
      isSuccess: isValidAnalyze,
      data: analizedData,
      message: analizeErrorMessage,
    } = treeAnalyze(validData!);
    if (!isValidAnalyze) {
      console.error(analizeErrorMessage);
      return;
    }

    const { width, height, root } = analizedData!;

    this.#canvas.setSize(
      width * Drawing.screenUnit,
      height * Drawing.screenUnit
    );
    this.#canvas.drawGrid(height, width);
    this.#canvas.drawNodes(width, root);

    popupStatusMessage({
      color: COLOR_INFO,
      message: `${Date.now() - now} ms`,
      duration: TIME_FOUR_SECONDS,
    });
  }

  inputFocusOut() {
    if (this.#message) {
      popupStatusMessage({
        color: COLOR_ERROR,
        message: this.#message,
        duration: TIME_ONE_SECOND,
      });

      this.#message = null;
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
    const settingsFields = document.querySelectorAll(
      ".settingsField label input[type=checkbox]"
    );
    const settingsJson: Json = {};
    let element;
    for (const settingField in settingsFields) {
      if (Object.prototype.hasOwnProperty.call(settingsFields, settingField)) {
        element = settingsFields[settingField] as HTMLInputElement;
        settingsJson[element.getAttribute("name")!] = element.checked;
      }
    }

    window.localStorage.setItem(
      KEY_TREE_VISUAL_SETTINGS,
      JSON.stringify(settingsJson)
    );

    Settings.reinitialize();

    popupStatusMessage({
      color: COLOR_SUCCESS,
      duration: TIME_ONE_SECOND,
      message: INFO_SAVED_SETTINGS,
    });
  }
}
