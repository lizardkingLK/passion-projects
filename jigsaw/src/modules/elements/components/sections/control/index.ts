import { ElementHelper } from "../../../../helpers/elements";
import { CanvasSection } from "../canvas";

export class ControlSection {
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

        ElementHelper.toggleClass("#sectionControl", "hidden");
        
        CanvasSection.load(file);
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

        document.querySelector<HTMLInputElement>("#inputImage")!
            .addEventListener("change", ControlSection.action);
    }
} 