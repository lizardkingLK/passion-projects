import { InputStrategy } from ".";
import { arrayAnalyze } from "../../analyzing";
import { Canvas } from "../../canvas";
import {
  KEY_TREE_ARRAY_INPUT_CONTENT,
  TREE_INPUT,
  COLOR_ERROR,
  TIME_ONE_SECOND,
  SETTING_USE_AUTO_FORMAT,
  ERROR_INPUT_HAS_NO_CONTENT,
  ERROR_INPUT_ARRAY_IS_INVALID,
  SETTING_USE_AUTO_SAVE,
  COLOR_INFO,
  INFO_FORMATTED_INPUT,
  TREE_INPUT_HEADER_TITLE,
  TIME_FOUR_SECONDS,
} from "../../constants";
import { Drawing } from "../../drawing";
import { Settings } from "../../settings";
import { getLocalStorageItem, setLocalStorageItem } from "../../storing";
import { Result } from "../../types";
import { popupStatusMessage } from "../../utility";

export class ArrayInput implements InputStrategy<number[]> {
  #canvas: Canvas;

  constructor(canvas: Canvas) {
    this.#canvas = canvas;
  }

  initialize(): void {
    const inputContent =
      getLocalStorageItem(KEY_TREE_ARRAY_INPUT_CONTENT) ?? "";
    const inputElement = document.querySelector(
      TREE_INPUT
    )! as HTMLTextAreaElement;
    inputElement.value = inputContent;
  }

  validate(): void {
    const { isSuccess, message } = this.isValidInput();
    if (!isSuccess) {
      popupStatusMessage({
        color: COLOR_ERROR,
        message: message!,
        duration: TIME_ONE_SECOND,
      });

      return;
    }

    if (Settings.get<boolean>(SETTING_USE_AUTO_FORMAT)) {
      this.format(isSuccess, message);
    }
  }

  format(isSuccess?: boolean, message?: string | null): void {
    if (isSuccess === undefined && message === undefined) {
      const isValidArrayResult = this.isValidInput();
      isSuccess = isValidArrayResult.isSuccess;
      message = isValidArrayResult.message;
    }

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

    treeInput.value = treeInput.value
      .split(/[\s\r\n\t,]/)
      .filter(Boolean)
      .map((item) => Number(item.toString()))
      .join(" ");

    if (Settings.get<boolean>(SETTING_USE_AUTO_SAVE)) {
      this.save(treeInput.value);
    }

    popupStatusMessage({
      color: COLOR_INFO,
      duration: TIME_ONE_SECOND,
      message: INFO_FORMATTED_INPUT,
    });
  }

  setHeading(): void {
    document.querySelector(TREE_INPUT_HEADER_TITLE)!.innerHTML = "Array Input";
  }

  setVisual() {
    this.#canvas.clearGrid();
    this.#canvas.clearNodes();
    this.#canvas.setSize(0, 0);
  }

  isValidInput(input?: string): Result<number[]> {
    input =
      input ??
      (document.querySelector(TREE_INPUT)! as HTMLTextAreaElement).value;

    if (!input) {
      return {
        data: null,
        isSuccess: false,
        message: ERROR_INPUT_HAS_NO_CONTENT,
      };
    }

    const inputNumberArray = input
      .split(/[\s\r\n\t,]/)
      .filter(Boolean)
      .map((item) => Number(item.toString()));

    const isValidInputArray = inputNumberArray.every(
      (item) => !Number.isNaN(item)
    );
    if (!isValidInputArray) {
      return {
        data: null,
        isSuccess: false,
        message: ERROR_INPUT_ARRAY_IS_INVALID,
      };
    }

    return {
      data: inputNumberArray,
      isSuccess: true,
      message: null,
    };
  }

  draw(): void {
    const now = Date.now();

    const inputContent = this.read();

    this.setVisual();

    const {
      isSuccess: isValidObject,
      data: validData,
      message: validationErrorMessage,
    } = this.isValidInput(inputContent);
    if (!isValidObject) {
      console.error(validationErrorMessage);
      return;
    }

    const {
      isSuccess: isValidAnalyze,
      data: analizedData,
      message: analizeErrorMessage,
    } = arrayAnalyze(validData!);
    if (!isValidAnalyze) {
      console.error(analizeErrorMessage);
      return;
    }

    const { nodesList, nodesMap, width, height } = analizedData!;

    this.#canvas.setSize(
      width * Drawing.screenUnit,
      height * Drawing.screenUnit
    );
    this.#canvas.drawGrid(height, width);
    this.#canvas.drawNodes(nodesList, nodesMap);

    popupStatusMessage({
      color: COLOR_INFO,
      message: `${Date.now() - now} ms`,
      duration: TIME_FOUR_SECONDS,
    });
  }

  save(inputContent: string): void {
    setLocalStorageItem(KEY_TREE_ARRAY_INPUT_CONTENT, inputContent);
  }

  load() {
    return getLocalStorageItem(KEY_TREE_ARRAY_INPUT_CONTENT);
  }

  read(): string {
    const value = (
      document.querySelector(TREE_INPUT)! as HTMLTextAreaElement
    ).value.trim();

    this.save(value);

    return value;
  }
}
