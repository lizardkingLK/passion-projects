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
  index?: number;
  level?: number;
  parentIndex?: number;
  parentX?: number;
  parentY?: number;
  cordinateX?: number;
  cordinateY?: number;
  radius?: number;
};

export type TNodeAnalyzed = {
  height: number;
  width: number;
  nodesList: TNode[];
  nodesMap: Map<number, TNode>;
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

export type TDrawBoxNode = {
  cordinateX: number;
  cordinateY: number;
  width: number;
  height: number;
};

export type TDrawTextNode = {
  cordinateX: number;
  cordinateY: number;
  value: string;
  fontSize?: number;
  fontColor?: string;
  maxWidth?: number;
};

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
  className: string;
};

export type TImage = { id: string; src: string; alt: string };

export type TButton = {
  id: string;
  title: string;
  icon: TImage;
};
