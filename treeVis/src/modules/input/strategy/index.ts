import { Result } from "../../types";

export interface InputStrategy<T> {
  draw(): void;
  setHeading(): void;
  setVisual(): void;
  isValidInput(input?: string): Result<T>;
  validate(): void;
  format(isSuccess?: boolean, message?: string | null): void;
  initialize(): void;
  save(inputString: string): void;
  read(): string;
}
