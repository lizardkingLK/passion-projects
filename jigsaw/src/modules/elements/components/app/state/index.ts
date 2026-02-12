import { CanvasSection } from "../../sections/canvas";
import { ControlSection } from "../../sections/control";

export interface IAppState {
    move: () => void;
}

export class InitialAppState implements IAppState {
    move() {
        ControlSection.setup();
        CanvasSection.setup();
    };
}

export class PuzzleAppState implements IAppState {
    move() {
        console.log(PuzzleAppState.name);
    };
}