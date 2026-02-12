import { CanvasSection } from "../../sections/canvas";

export class ControlButton {
    static setup() {
        this.initialize();
        this.interact();
    }

    static initialize() {
        document.querySelector<HTMLDivElement>('#app')!.innerHTML += `
        <div id="btnControl">
            <input
                class="hidden"
                id="inputImage"
                type="file"
                name="inputImage"
                accept="image/png,image/jpeg" />
            <label 
                for="inputImage"
                title="Select an image">
                <h1>JIGSAW</h1>
            </label>
        </div>`;
    }

    static interact() {
        const input = document.querySelector("#btnControl") as HTMLInputElement;
        input.addEventListener("change", ControlButton.action);
    }

    static action(event: Event) {
        const input = event.target as HTMLInputElement;
        if (!input.files || input.files.length === 0) {
            return;
        }

        const file = input.files[0];

        const type = file.type;
        if (!(type === "image/png" || type === "image/jpeg")) {
            console.error("error. invalid file was given");
            return;
        }

        ControlButton.toggle();
        CanvasSection.load(file);
    }

    static toggle() {
        (document.querySelector("#btnControl") as HTMLDivElement)
            .classList.toggle("hidden");
    }
} 