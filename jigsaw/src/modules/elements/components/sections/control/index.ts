import { CanvasSection } from "../canvas";

export class ControlSection {
    static setup() {
        this.initialize();
        this.interact();
    }

    static initialize() {
        document.querySelector<HTMLDivElement>('#app')!.innerHTML += `
            <section id="sectionControl">
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
            </section>`;
    }

    static interact() {
        const input = document.querySelector<HTMLInputElement>("#inputImage")!;
        input.addEventListener("change", ControlSection.action);
    }

    static action(event: Event) {
        debugger;
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

        ControlSection.toggle();
        CanvasSection.load(file);
    }

    static toggle() {
        (document.querySelector("#sectionControl") as HTMLDivElement)
            .classList.toggle("hidden");
    }
} 