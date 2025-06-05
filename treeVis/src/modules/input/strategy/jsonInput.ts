import { InputStrategy } from ".";
import { jsonAnalyze } from "../../analyzing";
import { Canvas } from "../../canvas";
import {
  KEY_TREE_JSON_INPUT_CONTENT,
  TREE_INPUT,
  SETTING_USE_AUTO_FORMAT,
  SETTING_USE_AUTO_SAVE,
  INFO_FORMATTED_INPUT,
  TREE_INPUT_HEADER_TITLE,
  ERROR_INPUT_HAS_NO_CONTENT,
  ERROR_INPUT_IS_AN_ARRAY,
  ERROR_INPUT_KEYS_ARE_INVALID,
  ERROR_INPUT_COULD_NOT_BE_PARSED,
  CLASS_ERROR,
  CLASS_INFO,
  DURATION_FOUR_SECONDS,
  DURATION_ONE_SECOND,
  STRING_LEFT,
  STRING_RIGHT,
  STRING_VALUE,
  STRING_EMPTY,
  ERROR_INPUT_VALUES_ARE_INVALID,
  STRING_JSON_INPUT,
} from "../../constants";
import { Drawing } from "../../drawing";
import { popupContent } from "../../notifying";
import { Settings } from "../../settings";
import { getLocalStorageItem, setLocalStorageItem } from "../../storing";
import { Json, Result } from "../../types";

export class JsonInput implements InputStrategy<Json> {
  #canvas: Canvas;

  constructor(canvas: Canvas) {
    this.#canvas = canvas;
  }

  initialize(): void {
    (document.querySelector(TREE_INPUT)! as HTMLTextAreaElement).value =
      getLocalStorageItem(KEY_TREE_JSON_INPUT_CONTENT) ?? "";

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
      const isValidJsonResult = this.isValidInput();
      isSuccess = isValidJsonResult.isSuccess;
      message = isValidJsonResult.message;
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

    treeInput.value = JSON.stringify(JSON.parse(treeInput.value), undefined, 2);

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
      STRING_JSON_INPUT;
  }

  setVisual() {
    this.#canvas.clearGrid();
    this.#canvas.clearNodes();
    this.#canvas.clearCanvas();
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

    const { inputParsed, isValidKeys, isValidValues } = this.#parseJson(input);
    if (!inputParsed) {
      return {
        data: null,
        isSuccess: false,
        message: ERROR_INPUT_COULD_NOT_BE_PARSED,
      };
    }

    if (Array.isArray(inputParsed)) {
      return {
        data: null,
        isSuccess: false,
        message: ERROR_INPUT_IS_AN_ARRAY,
      };
    }

    if (!isValidKeys) {
      return {
        data: null,
        isSuccess: false,
        message: ERROR_INPUT_KEYS_ARE_INVALID,
      };
    }

    if (!isValidValues) {
      return {
        data: null,
        isSuccess: false,
        message: ERROR_INPUT_VALUES_ARE_INVALID,
      };
    }

    return {
      data: inputParsed,
      isSuccess: true,
      message: null,
    };
  }

  #parseJson(input: string) {
    const staticKeys = [STRING_LEFT, STRING_RIGHT, STRING_VALUE, STRING_EMPTY];

    try {
      const inputKeys: string[] = [];

      let isValidKeys = true;
      let isValidValues = true;

      const inputParsed = JSON.parse(input, (key: string, value: any) => {
        if (value instanceof Object && Object.keys(value).length === 0) {
          isValidKeys = false;
          return;
        } else if (key === STRING_VALUE && Number.isNaN(Number(value))) {
          isValidValues = false;
          inputKeys.push(key);
          return;
        }

        inputKeys.push(key);

        return value;
      });

      isValidKeys =
        isValidKeys &&
        inputKeys.every((key) => staticKeys.includes(key)) &&
        staticKeys.every((key) => inputKeys.includes(key));

      return { inputParsed, isValidKeys, isValidValues };
    } catch (error) {
      return { inputParsed: null, isValidKeys: false, isValidValues: false };
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
      popupContent({
        className: CLASS_ERROR,
        message: validationErrorMessage!,
        duration: DURATION_ONE_SECOND,
      });
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

    this.#canvas.setCanvas(width * screenUnit, height * screenUnit);
    this.#canvas.drawGrid(height, width);
    this.#canvas.drawNodes(nodesList, nodesMap);

    popupContent({
      className: CLASS_INFO,
      message: `${Date.now() - now} ms`,
      duration: DURATION_FOUR_SECONDS,
    });
  }

  save(inputContent: string): void {
    if (Settings.get<boolean>(SETTING_USE_AUTO_SAVE)) {
      setLocalStorageItem(KEY_TREE_JSON_INPUT_CONTENT, inputContent);
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
