import { TREE_INPUT } from "./constants";
import { Json, Result } from "./types";

export const fetchSample = async () => {
  return fetch("/sample.json")
    .then((value) => value.json())
    .then((data) => data);
};

export function validateInput(input: string): Result<Json> {
  try {
    const parsed = JSON.parse(input);

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

export async function loadSample() {
  const treeInput: HTMLTextAreaElement = document.querySelector(TREE_INPUT)!;
  const sampleData = await fetchSample();
  treeInput.value = JSON.stringify(sampleData, null, 2);
}
