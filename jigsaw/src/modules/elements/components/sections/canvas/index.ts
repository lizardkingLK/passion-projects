import { Canvas } from "../../../../drawing/canvas";

export class CanvasSection {
    static setup() {
        this.initialize();
    }

    static initialize() {
        document.querySelector<HTMLDivElement>('#app')!.innerHTML += `
        <main class="hidden" id="sectionCanvas">
            <canvas id="canvas" />
        </main>`;
    }

    static load(file: File) {
        CanvasSection.toggle();
        Canvas.drawImage(file);
    }

    static toggle() {
        (document.querySelector("#sectionCanvas") as HTMLDivElement)
            .classList.toggle("hidden");
    }
}