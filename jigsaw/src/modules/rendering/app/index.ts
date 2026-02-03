import { ControlButton } from "../components/buttons/control";
import { CanvasSection } from "../components/sections/canvas";

export class App {
    static setup() {
        CanvasSection.setup();
        ControlButton.setup();
    }
}