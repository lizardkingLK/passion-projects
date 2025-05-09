import { TIME_ONE_SECOND, TREE_VISUAL_STATUS_ELAPSED } from "./constants";
import { Json, TNode, Result, TNodeAnalyzed, TStatusPopup } from "./types";

export function validateJson(input: string): Result<Json> {
  const keys = ["left", "right", "value"];

  try {
    let isValidKeys = true;

    const parsed = JSON.parse(input, (key, value) => {
      if (key && !keys.includes(key)) {
        isValidKeys = false;
      }

      return value;
    });

    if (!(parsed instanceof Object)) {
      return {
        data: null,
        isSuccess: false,
        message: "Input is an array",
      };
    }

    if (!isValidKeys) {
      return {
        data: null,
        isSuccess: false,
        message: "Input json keys are invalid",
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
      message: "Input could not be parsed.",
    };
  }
}

export function treeAnalyze(object: Json): Result<TNodeAnalyzed> {
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
    data: { root, height: height + 1, width: 2 ** (height + 1) - 1 },
    isSuccess: true,
    message: null,
  };
}

let timeoutId: number;

export function popupStatusMessage({ color, message, duration }: TStatusPopup) {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }

  const container = document.querySelector(
    TREE_VISUAL_STATUS_ELAPSED
  )! as HTMLElement;
  container.innerHTML = message;
  container.style.color = color;

  const keyframes = [{ opacity: 1 }, { opacity: 0 }];
  const keyframeDuration = TIME_ONE_SECOND;

  timeoutId = setTimeout(() => {
    container
      .animate(keyframes, keyframeDuration)
      .finished.then(() => (container.innerHTML = ""));
  }, duration);
}
