import { Json, TNode, Result, TNodeAnalyzed } from "./types";

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
  let height = Number.MIN_VALUE;

  const nodes: Map<number, TNode> = new Map<number, TNode>();

  const depthTracker = [];

  let id = 1;
  let current: TNode = {
    id,
    left: object["left"] as TNode,
    right: object["right"] as TNode,
    value: object["value"] as number,
  };

  depthTracker.push({ ...current, id, vLevel: 0, hLevel: 0, parent: null });

  while (depthTracker.length !== 0) {
    current = depthTracker.pop()!;

    current = Object.assign(current, {
      value: current.value,
      id: current.id,
      vLevel: current.vLevel,
      hLevel: current.hLevel,
      parentId: current.parent?.id ?? null,
    });

    nodes.set(current.id, current);

    if (current.vLevel && current.vLevel > height) {
      height = current.vLevel;
    }

    if (current.right) {
      depthTracker.push({
        ...current.right,
        id: ++id,
        vLevel: current.vLevel! + 1,
        hLevel: current.hLevel! + 1,
        parent: current,
      });
    }

    if (current.left) {
      depthTracker.push({
        ...current.left,
        id: ++id,
        vLevel: current.vLevel! + 1,
        hLevel: current.hLevel! - 1,
        parent: current,
      });
    }
  }

  return {
    data: { nodes, height: height + 1, width: 2 ** (height + 1) - 1 },
    isSuccess: true,
    message: null,
  };
}
