import { InputStrategy } from ".";
import { arrayAnalyze } from "../../analyzing";
import { Canvas } from "../../canvas";
import {
  KEY_TREE_ARRAY_INPUT_CONTENT,
  TREE_INPUT,
  DURATION_ONE_SECOND,
  SETTING_USE_AUTO_FORMAT,
  ERROR_INPUT_HAS_NO_CONTENT,
  ERROR_INPUT_ARRAY_IS_INVALID,
  SETTING_USE_AUTO_SAVE,
  INFO_FORMATTED_INPUT,
  TREE_INPUT_HEADER_TITLE,
  CLASS_ERROR,
  CLASS_INFO,
  STRING_ARRAY_INPUT,
} from "../../constants";
import { Drawing } from "../../drawing";
import { popupContent } from "../../notifying";
import { Settings } from "../../settings";
import { getLocalStorageItem, setLocalStorageItem } from "../../storing";
import { Result } from "../../types";

export class ArrayInput implements InputStrategy<number[]> {
  #canvas: Canvas;

  constructor(canvas: Canvas) {
    this.#canvas = canvas;
  }

  initialize(): void {
    (document.querySelector(TREE_INPUT)! as HTMLTextAreaElement).value =
      getLocalStorageItem(KEY_TREE_ARRAY_INPUT_CONTENT) ?? "";

    if (!Settings.get<boolean>(SETTING_USE_AUTO_SAVE)) {
      this.#canvas.clearCanvas();
      return;
    }

    this.draw();
  }

  validate(): void {
    const { isSuccess, message } = this.isValidInput();
    if (!isSuccess) {
      popupContent({
        className: CLASS_ERROR,
        message: message!,
        duration: DURATION_ONE_SECOND,
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
      popupContent({
        className: CLASS_ERROR,
        message: message!,
        duration: DURATION_ONE_SECOND,
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

    popupContent({
      className: CLASS_INFO,
      duration: DURATION_ONE_SECOND,
      message: INFO_FORMATTED_INPUT,
    });
  }

  setHeading(): void {
    document.querySelector(TREE_INPUT_HEADER_TITLE)!.innerHTML =
      STRING_ARRAY_INPUT;
  }

  setVisual() {
    this.#canvas.clearGrid();
    this.#canvas.clearNodes();
    this.#canvas.clearCanvas();
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
    const screenUnit = Drawing.getScreenUnit();

    this.#canvas.setCanvas(width * screenUnit, height * screenUnit);
    this.#canvas.drawGrid(height, width);
    this.#canvas.drawNodes(nodesList, nodesMap);
  }

  save(inputContent: string): void {
    if (Settings.get<boolean>(SETTING_USE_AUTO_SAVE)) {
      setLocalStorageItem(KEY_TREE_ARRAY_INPUT_CONTENT, inputContent);
    }
  }

  read(): string {
    const value = (
      document.querySelector(TREE_INPUT)! as HTMLTextAreaElement
    ).value.trim();

    this.save(value);

    return value;
  }
}
