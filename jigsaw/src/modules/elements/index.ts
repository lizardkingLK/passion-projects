import { CanvasSection } from "./components/sections/canvas";
import { ControlSection } from "./components/sections/control";

export class App {
    static setup() {
        CanvasSection.initialize();
        ControlSection.initialize();
    }
}