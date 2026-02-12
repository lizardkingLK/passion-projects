import { AppState } from "./enums/AppState";
import { InitialAppState, PuzzleAppState } from "./state";

export class App {
    static #initialAppState: InitialAppState;
    static #puzzleAppState: PuzzleAppState;

    constructor() {
        App.#initialAppState = new InitialAppState();
        App.#puzzleAppState = new PuzzleAppState();
    }

    static setup() {
        return new App();
    }

    static setState(appState: number) {
        switch (appState) {
            case AppState.INITIAL:
                App.#initialAppState.move();
                break;

            case AppState.PUZZLE:
                App.#puzzleAppState.move();
                break;

            default:
                break;
        }
    }

    initialize() {
        App.#initialAppState.move();
    }
}