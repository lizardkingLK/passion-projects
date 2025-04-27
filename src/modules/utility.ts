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

export function inDepthAnalyze(object: Json): Result<TNodeAnalyzed> {
  let maxVLevel = Number.MIN_VALUE;

  const nodes: TNode[] = [];
  const tracker = [];
  let id = 1;
  let current: TNode = {
    left: object["left"] as TNode,
    right: object["right"] as TNode,
    value: object["value"] as number,
  };
  tracker.push({ ...current, id, vLevel: 0, hLevel: 0, parent: null });

  while (tracker.length != 0) {
    current = tracker.pop()!;
    current = Object.assign(current, {
      value: current.value,
      id: current.id,
      vLevel: current.vLevel,
      hLevel: current.hLevel,
      parentId: current.parent?.id ?? null,
    });
    nodes.push(current);
    // console.log(current);

    if (current.vLevel && current.vLevel > maxVLevel) {
      maxVLevel = current.vLevel;
    }

    if (current.right) {
      tracker.push({
        ...current.right,
        id: ++id,
        vLevel: current.vLevel! + 1,
        hLevel: current.hLevel! + 1,
        parent: current,
      });
    }

    if (current.left) {
      tracker.push({
        ...current.left,
        id: ++id,
        vLevel: current.vLevel! + 1,
        hLevel: current.hLevel! - 1,
        parent: current,
      });
    }
  }

  // console.log("Max v level", maxVLevel);
  // console.log("Maximum nodes per line", 2 ** maxVLevel);
  return {
    data: { nodes, maxVLevel, maxNodesInLine: 2 ** maxVLevel },
    isSuccess: true,
    message: null,
  };
}

// doDFS();
