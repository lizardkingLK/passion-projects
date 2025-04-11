export type Json =
  | { [keyType: string]: number | string | null | object }
  | Json[];

export type Result<T> = {
  isSuccess: boolean;
  data: T | null;
  message: string | null;
};

export interface Shape {}

export interface Circle extends Shape {
  centerX: number;
  centerY: number;
  radius: number;
}
