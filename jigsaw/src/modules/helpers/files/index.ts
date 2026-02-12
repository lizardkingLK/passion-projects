export class Files {
    static async getImage(file: File, process: () => void): Promise<HTMLImageElement> {
        const image = new Image();
        image.addEventListener("load", process);
        image.src = await this.#getDataUrl(file) as string;

        return image;
    }

    static #getDataUrl(file: File) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = () => {
                resolve(reader.result);
            }

            reader.onerror = (error) => {
                reject(error);
            }

            reader.readAsDataURL(file);
        });

    }
}