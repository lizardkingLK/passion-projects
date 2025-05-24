export interface IInput {
  draw(): void;
  setTitle(): void;
  validate(): void;
  format(isSuccess?: boolean, message?: string | null): void;
  initialize(): void;
  save(inputString: string): void;
  load(): void;
  read(): string;
}
