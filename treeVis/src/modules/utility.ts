import { TREE_VISUAL_STATUS_ELAPSED } from "./constants";
import { Json, TNode, Result, TNodeAnalyzed, TStatusPopup } from "./types";

export function validateJson(input: string): Result<Json> {
  try {
    const parsed = JSON.parse(input);
    if (!(parsed instanceof Object)) {
      return {
        data: null,
        isSuccess: false,
        message: "Input is an array",
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

export function popupStatusMessage({ color, message, duration }: TStatusPopup) {
  const container = document.querySelector(
    TREE_VISUAL_STATUS_ELAPSED
  )! as HTMLElement;
  container.innerHTML = message;
  container.style.color = color;

  const keyframes = [{ opacity: 1 }, { opacity: 0 }];
  const keyframeDuration = 1000;

  setTimeout(() => {
    container
      .animate(keyframes, keyframeDuration)
      .finished.then(() => (container.innerHTML = ""));
  }, duration);
}
