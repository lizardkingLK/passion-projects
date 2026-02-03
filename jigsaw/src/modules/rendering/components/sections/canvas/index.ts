import { FileHelper } from "../../../../../helpers/fileHelper";

export class CanvasSection {
    static setup() {
        this.initialize();
        this.interact();
    }

    static initialize() {
        document.querySelector<HTMLDivElement>('#app')!.innerHTML += `
        <main class="hidden" id="sectionCanvas">
            <canvas id="canvas" />
        </main>`;
    }

    static async load(file: File) {
        const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
        const context = canvas.getContext('2d');
        if (!context) {
            console.log("error. context could not initiated");
            return;
        }

        CanvasSection.toggle();

        const dataUrl = await FileHelper.getDataUrl(file) as string;
        const image = new Image() as HTMLImageElement;

        image.addEventListener("load", () => {
            const unit = window.innerHeight / 100;

            const height = Math.min(
                window.innerHeight - unit,
                image.height / 100 * unit * 5);

            const width = Math.min(
                window.innerWidth - unit,
                image.width / 100 * unit * 5);

            console.log({ unit, height, width })

            canvas.height = window.innerHeight - unit * 2;
            canvas.width = window.innerWidth - unit * 2;

            context.drawImage(image, 0, 0, width, height);
        });

        image.src = dataUrl;
    }

    static toggle() {
        (document.querySelector("#sectionCanvas") as HTMLDivElement)
            .classList.toggle("hidden");
    }

    static interact() {
        //
    }
}