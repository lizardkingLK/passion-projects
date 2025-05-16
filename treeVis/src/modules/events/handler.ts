import {
  isValidJson,
  popupStatusMessage,
  setLocalStorageItem,
  treeAnalyze,
  validateJson,
} from "../utility";
import { Canvas } from "../canvas";
import {
  COLOR_ERROR,
  COLOR_INFO,
  COLOR_SUCCESS,
  INFO_FORMATTED_Input,
  INFO_SAVED_SETTINGS,
  KEY_TREE_INPUT_CONTENT,
  SETTING_USE_AUTO_FORMAT,
  SETTING_USE_AUTO_SAVE,
  TIME_FOUR_SECONDS,
  TIME_ONE_SECOND,
  TREE_INPUT,
} from "../constants";
import { Drawing } from "../drawing";
import { Settings } from "../settings";

export class Handler {
  #canvas: Canvas;

  constructor() {
    this.#canvas = new Canvas();
  }

  inputChanged() {
    const inputContent = (
      document.querySelector(TREE_INPUT)! as HTMLTextAreaElement
    ).value;
    if (Settings.get<boolean>(SETTING_USE_AUTO_SAVE)) {
      setLocalStorageItem(KEY_TREE_INPUT_CONTENT, inputContent);
    }

    this.#canvas.clearGrid();
    this.#canvas.clearNodes();
    this.#canvas.setSize(0, 0);

    const {
      isSuccess: isValidObject,
      data: validData,
      message: validationErrorMessage,
    } = validateJson(inputContent);
    if (!isValidObject) {
      console.error(validationErrorMessage);
      return;
    }

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

  inputFocusOutValidation() {
    const { isSuccess, message } = isValidJson();
    if (!isSuccess) {
      popupStatusMessage({
        color: COLOR_ERROR,
        message: message!,
        duration: TIME_ONE_SECOND,
      });

      return;
    }

    if (Settings.get<boolean>(SETTING_USE_AUTO_FORMAT)) {
      this.handleInputFormat();
    }
  }

  handleInputFormat() {
    const { isSuccess, message } = isValidJson();
    if (!isSuccess) {
      popupStatusMessage({
        color: COLOR_ERROR,
        message: message!,
        duration: TIME_ONE_SECOND,
      });

      return;
    }

    const treeInput = document.querySelector(
      TREE_INPUT
    )! as HTMLTextAreaElement;
    const inputContent = JSON.parse(treeInput.value);
    const formattedContent = JSON.stringify(inputContent, undefined, 2);
    treeInput.value = formattedContent;
    popupStatusMessage({
      color: COLOR_INFO,
      duration: TIME_ONE_SECOND,
      message: INFO_FORMATTED_Input,
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

  settingsSubmitted() {
    Settings.saveSettings();

    Settings.reinitialize();

    popupStatusMessage({
      color: COLOR_SUCCESS,
      duration: TIME_ONE_SECOND,
      message: INFO_SAVED_SETTINGS,
    });
  }
}
