import { Canvas } from "../../../../drawing/canvas";
import { ElementHelper } from "../../../../helpers/elements";

export class CanvasSection {
    static initialize() {
        document.querySelector<HTMLDivElement>('#app')!.innerHTML += `
        <main class="hidden" id="mainSection">
            <section>
                <canvas class="canvas" id="canvasTarget" />
            </section>
            <section>
                <canvas class="canvas" id="canvasPuzzle" />
            </section>
        </main>`;
    }

    static load(file: File) {
        ElementHelper.toggleClass("#mainSection", "hidden");

        Canvas.load(file);
    }
}