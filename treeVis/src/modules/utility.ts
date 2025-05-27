import {
  ERROR_INPUT_ARRAY_IS_INVALID,
  ERROR_INPUT_COULD_NOT_BE_PARSED,
  ERROR_INPUT_HAS_NO_CONTENT,
  ERROR_INPUT_IS_AN_ARRAY,
  ERROR_INPUT_KEYS_ARE_INVALID,
  TIME_ONE_SECOND,
  TREE_INPUT,
  TREE_VISUAL_STATUS_CONTAINER,
} from "./constants";
import { Json, TNode, Result, TNodeAnalyzed, TStatusPopup } from "./types";

//#region array based tree build and analyze
export function isValidArrayInput(): Result<number[]> {
  const inputString = (
    document.querySelector(TREE_INPUT)! as HTMLTextAreaElement
  ).value;

  return validateArrayInput(inputString);
}

export function validateArrayInput(input: string): Result<number[]> {
  if (!input) {
    return {
      data: null,
      isSuccess: false,
      message: ERROR_INPUT_HAS_NO_CONTENT,
    };
  }

  const inputNumberArray = getInputNumberArray(input);

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

export function getInputNumberArray(inputContent: string) {
  return inputContent
    .split(/[\s\r\n\t,]/)
    .filter(Boolean)
    .map((item) => Number(item.toString()));
}

export function buildTree(inputArray: number[]): Result<TNodeAnalyzed> {
  function insertNode(rootNode: Json, newNode: Json) {
    type TChildNode = Json | null;
    let left: TChildNode;
    let right: TChildNode;
    while (true) {
      left = <TChildNode>rootNode["left"];
      right = <TChildNode>rootNode["right"];

      if (newNode["value"]! <= rootNode["value"]!) {
        if (!left) {
          rootNode["left"] = newNode;
          break;
        }

        rootNode = left;
      } else {
        if (!right) {
          rootNode["right"] = newNode;
          break;
        }

        rootNode = right;
      }
    }
  }

  const rootNode = {
    left: null,
    right: null,
    value: inputArray[0],
  };

  for (let i = 1; i < inputArray.length; i++) {
    insertNode(rootNode, { left: null, right: null, value: inputArray[i] });
  }

  return treeAnalyze(rootNode);
}
//#endregion array based tree build and analyze

//#region object based tree build and analyze
export function isValidJsonInput(): Result<Json> {
  const inputString = (
    document.querySelector(TREE_INPUT)! as HTMLTextAreaElement
  ).value;

  return validateJsonInput(inputString);
}

export function validateJsonInput(input: string): Result<Json> {
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

export function treeAnalyze(object: Json): Result<TNodeAnalyzed> {
  let count = 0;
  let height = -Number.MIN_VALUE;

  const depthTracker = [];

  let current: TNode = {
    left: object["left"] as TNode,
    right: object["right"] as TNode,
    value: object["value"] as number,
    level: 0,
    edge: null,
  };

  const root = current;

  depthTracker.push(current);

  while (depthTracker.length !== 0) {
    count++;
    current = depthTracker.pop()!;

    if (typeof current.level === "number" && current.level > height) {
      height = current.level;
    }

    if (current.right) {
      current.right.level = current.level! + 1;
      depthTracker.push(current.right);
    }

    if (current.left) {
      current.left.level = current.level! + 1;
      depthTracker.push(current.left);
    }
  }

  return {
    data: {
      root,
      count,
      height: height + 1,
      width: 2 ** (height + 1) - 1,
    },
    isSuccess: true,
    message: null,
  };
}
//#endregion object based tree build and analyze

//#region local storage activities
export function setLocalStorageItem(key: string, value: string) {
  window.localStorage.setItem(key, value);
}

export function getLocalStorageItem(key: string) {
  return window.localStorage.getItem(key);
}
//#endregion local storage activities

export function popupStatusMessage({ color, message, duration }: TStatusPopup) {
  const container = document.querySelector(
    TREE_VISUAL_STATUS_CONTAINER
  )! as HTMLElement;

  const statusContent = document.createElement("p");
  statusContent.setAttribute("style", `color: ${color}`);
  statusContent.innerHTML = message;

  const keyframes = [{ opacity: 1 }, { opacity: 0 }];
  const keyframeDuration = TIME_ONE_SECOND;

  container.appendChild(statusContent);
  setTimeout(() => {
    statusContent
      .animate(keyframes, keyframeDuration)
      .finished.then(() => statusContent.remove());
  }, duration);
}
