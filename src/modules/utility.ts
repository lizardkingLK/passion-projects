import { Json, Result } from "./types";

export function validateJson(input: string): Result<Json> {
  try {
    const parsed = JSON.parse(input);
    if (!(parsed instanceof Object)) {
      return {
        data: null,
        isSuccess: false,
        message: "Input is an array",
      };
    }

    return {
      data: parsed,
      isSuccess: true,
      message: null,
    };
  } catch (error) {
    return {
      data: null,
      isSuccess: false,
      message: "Input could not be parsed.",
    };
  }
}
