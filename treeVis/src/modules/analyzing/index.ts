import { Drawing } from "../drawing";
import {
  Json,
  Result,
  TBoxConfiguration,
  TDrawCircleNode,
  TNode,
  TNodeAnalyzed,
} from "../types";

export function arrayAnalyze(inputArray: number[]): Result<TNodeAnalyzed> {
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

  return jsonAnalyze(rootNode);
}

export function jsonAnalyze(object: Json): Result<TNodeAnalyzed> {
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
    current.index = count;

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

  height++;

  const nodesList: TNode[] = [];
  treeAnalyze(root, nodesList, 2 ** height - 1);
  nodesList.sort((nodeA, nodeB) => nodeA.cordinateX! - nodeB.cordinateX!);

  const nodesMap: Map<number, TNode> = new Map<number, TNode>();
  nodesList.forEach((node) => nodesMap.set(node.index!, node));

  return {
    data: {
      height,
      nodesList,
      nodesMap,
      width: count,
    },
    isSuccess: true,
    message: null,
  };
}

function treeAnalyze(root: TNode, nodes: TNode[], width: number) {
  const screenUnit = Drawing.getScreenUnit();
  const radius = screenUnit / 2 - Drawing.getLineWidth();
  const fullWidth = width * screenUnit;
  const boxConfig: TBoxConfiguration = {
    boxStartX: 0,
    boxStartY: 0,
    boxEndX: fullWidth,
  };

  nodeAnalyze(root, nodes, radius, boxConfig);
}

function nodeAnalyze(
  rootNode: TNode,
  nodes: TNode[],
  radius: number,
  { boxEndX, boxStartX, boxStartY }: TBoxConfiguration
) {
  const lineWidth = Drawing.getLineWidth();
  
  const { left, right, index } = rootNode;

  const circleConfig: TDrawCircleNode = {
    cordinateX: boxStartX + (boxEndX - boxStartX) / 2,
    cordinateY: boxStartY + radius + lineWidth,
    radius,
  };

  rootNode.cordinateX = circleConfig.cordinateX;
  rootNode.cordinateY = circleConfig.cordinateY;

  nodes.push(rootNode);

  if (left) {
    const leftBoxConfig: TBoxConfiguration = {
      boxStartX,
      boxEndX: circleConfig.cordinateX - radius - lineWidth,
      boxStartY: circleConfig.cordinateY + radius + lineWidth,
    };
    left.parentIndex = index;
    nodeAnalyze(left, nodes, radius, leftBoxConfig);
  }

  if (right) {
    const rightBoxConfig: TBoxConfiguration = {
      boxStartX: circleConfig.cordinateX + radius + lineWidth,
      boxEndX,
      boxStartY: circleConfig.cordinateY + radius + lineWidth,
    };
    right.parentIndex = index;
    nodeAnalyze(right, nodes, radius, rightBoxConfig);
  }
}
