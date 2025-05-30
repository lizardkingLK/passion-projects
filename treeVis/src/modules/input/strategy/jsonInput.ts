import { InputStrategy } from ".";
import { jsonAnalyze } from "../../analyzing";
import { Canvas } from "../../canvas";
import {
  KEY_TREE_JSON_INPUT_CONTENT,
  TREE_INPUT,
  COLOR_ERROR,
  TIME_ONE_SECOND,
  SETTING_USE_AUTO_FORMAT,
  SETTING_USE_AUTO_SAVE,
  COLOR_INFO,
  INFO_FORMATTED_INPUT,
  TREE_INPUT_HEADER_TITLE,
  TIME_FOUR_SECONDS,
  ERROR_INPUT_HAS_NO_CONTENT,
  ERROR_INPUT_IS_AN_ARRAY,
  ERROR_INPUT_KEYS_ARE_INVALID,
  ERROR_INPUT_COULD_NOT_BE_PARSED,
} from "../../constants";
import { Drawing } from "../../drawing";
import { popupStatusMessage } from "../../notifying";
import { Settings } from "../../settings";
import { getLocalStorageItem, setLocalStorageItem } from "../../storing";
import { Json, Result } from "../../types";

export class JsonInput implements InputStrategy<Json> {
  #canvas: Canvas;

  constructor(canvas: Canvas) {
    this.#canvas = canvas;
  }

  initialize(): void {
    const inputContent = getLocalStorageItem(KEY_TREE_JSON_INPUT_CONTENT) ?? "";
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
      const isValidJsonResult = this.isValidInput();
      isSuccess = isValidJsonResult.isSuccess;
      message = isValidJsonResult.message;
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

    treeInput.value = JSON.stringify(JSON.parse(treeInput.value), undefined, 2);

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
    document.querySelector(TREE_INPUT_HEADER_TITLE)!.innerHTML = "Json Input";
  }

  setVisual() {
    this.#canvas.clearGrid();
    this.#canvas.clearNodes();
    this.#canvas.setSize(0, 0);
  }

  isValidInput(input?: string): Result<Json> {
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

    const staticKeys = ["left", "right", "value", ""];
    let inputKeys: string[] = [];

    try {
      const parsed = JSON.parse(input, (key, value) => {
        inputKeys.push(key);

        return value;
      });

      if (Array.isArray(parsed)) {
        return {
          data: null,
          isSuccess: false,
          message: ERROR_INPUT_IS_AN_ARRAY,
        };
      }

      if (
        !inputKeys.every((key) => staticKeys.includes(key)) ||
        !staticKeys.every((key) => inputKeys.includes(key))
      ) {
        return {
          data: null,
          isSuccess: false,
          message: ERROR_INPUT_KEYS_ARE_INVALID,
        };
      }

      return {
        data: parsed,
        isSuccess: true,
        message: null,
      };
    } catch (error) {
      return {
        data: null,
        isSuccess: false,
        message: ERROR_INPUT_COULD_NOT_BE_PARSED,
      };
    }
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
    } = jsonAnalyze(validData!);
    if (!isValidAnalyze) {
      console.error(analizeErrorMessage);
      return;
    }

    const { nodesList, nodesMap, width, height } = analizedData!;
    const screenUnit = Drawing.getScreenUnit();

    this.#canvas.setSize(width * screenUnit, height * screenUnit);
    this.#canvas.drawGrid(height, width);
    this.#canvas.drawNodes(nodesList, nodesMap);

    popupStatusMessage({
      color: COLOR_INFO,
      message: `${Date.now() - now} ms`,
      duration: TIME_FOUR_SECONDS,
    });
  }

  save(inputContent: string): void {
    setLocalStorageItem(KEY_TREE_JSON_INPUT_CONTENT, inputContent);
  }

  load() {
    return getLocalStorageItem(KEY_TREE_JSON_INPUT_CONTENT);
  }

  read(): string {
    const value = (
      document.querySelector(TREE_INPUT)! as HTMLTextAreaElement
    ).value.trim();

    this.save(value);

    return value;
  }
}
