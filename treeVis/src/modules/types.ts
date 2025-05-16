export type Json = {
  [keyType: string]: boolean | number | string | null | object;
};

export type Result<T> = {
  isSuccess: boolean;
  data: T | null;
  message: string | null;
};

export type TNode = {
  value: number;
  left: TNode | null;
  right: TNode | null;
  edge: TEdge | null;
  level?: number;
  parentX?: number;
  parentY?: number;
  cordinateX?: number;
  cordinateY?: number;
  radius?: number;
};

export type TNodeAnalyzed = {
  height: number;
  width: number;
  root: TNode;
};

export interface CircleNode extends TNode {
  cordinateX: number;
  cordinateY: number;
  radius: number;
}

export type TDrawCircleNode = Pick<
  CircleNode,
  "cordinateY" | "cordinateX" | "radius"
>;

export interface LineNode {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  lineWidth: number;
  clearStartX: number;
  clearStartY: number;
  clearWidth: number;
  clearHeight: number;
}

export interface TEdge extends LineNode {
  radius: number;
}

export type TDrawEdge = Partial<TEdge>;

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
