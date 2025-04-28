export type Json = { [keyType: string]: number | string | null | object };

export type Result<T> = {
  isSuccess: boolean;
  data: T | null;
  message: string | null;
};

export type TNode = {
  value: number;
  id?: number;
  vLevel?: number;
  hLevel?: number;
  parent?: TNode | null;
  left: TNode | null;
  right: TNode | null;
};

export type TNodeAnalyzed = {
  maxVLevel: number;
  maxNodesInLine: number;
  nodes: TNode[];
};

export type TEdge = {
  parentId: number;
  childId: number;
};

export interface CircleNode extends TNode {
  cordinateX: number;
  cordinateY: number;
  radius: number;
  edges: EdgeNode[]
}

export interface EdgeNode {
  startX: number;
  endX: number;
  width: number;
}
