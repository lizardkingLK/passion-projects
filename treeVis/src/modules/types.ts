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
  height: number;
  width: number;
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
  edges: LineNode[]
}

export interface LineNode {
  startX: number;
  endX: number;
  startY: number;
  endY: number;
  lineWidth: number;
}
