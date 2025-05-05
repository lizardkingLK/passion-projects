export type Json = { [keyType: string]: number | string | null | object };

export type Result<T> = {
  isSuccess: boolean;
  data: T | null;
  message: string | null;
};

export type TNode = {
  value: number;
  // id: number;
  level?: number;
  // hLevel?: number;
  parent?: TNode | null;
  left: TNode | null;
  right: TNode | null;
};

export type TNodeAnalyzed = {
  height: number;
  width: number;
  root: TNode;
  // nodes: Map<number, TNode>;
};

export type TEdge = {
  parentId: number;
  childId: number;
};

export interface CircleNode extends TNode {
  cordinateX: number;
  cordinateY: number;
  radius: number;
  edges: LineNode[];
}

export type TDrawCircleNode = Pick<
  CircleNode,
  "cordinateY" | "cordinateX" | "radius"
>;

export interface LineNode {
  startX: number;
  endX: number;
  startY: number;
  endY: number;
  lineWidth: number;
  clearStartX: number;
  clearStartY: number;
  clearWidth: number;
  clearHeight: number;
}

export type TBoxConfiguration = {
  boxStartX: number;
  boxStartY: number;
  boxEndX: number;
};

export type TStatusPopup = {
  message: string;
  duration: number;
  color: string;
};
