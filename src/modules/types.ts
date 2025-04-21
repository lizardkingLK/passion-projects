export type Json =
  | { [keyType: string]: number | string | null | object }
  | Json[];

export type Result<T> = {
  isSuccess: boolean;
  data: T | null;
  message: string | null;
};

export interface CircleNode {
  cordinateX: number;
  cordinateY: number;
  radius: number;
}
