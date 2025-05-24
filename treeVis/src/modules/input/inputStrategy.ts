export interface IInput {
  draw(): void;
  setHeading(): void;
  setVisual(): void;
  validate(): void;
  format(isSuccess?: boolean, message?: string | null): void;
  initialize(): void;
  save(inputString: string): void;
  load(): void;
  read(): string;
}
