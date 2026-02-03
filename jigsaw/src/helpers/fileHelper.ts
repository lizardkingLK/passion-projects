export class FileHelper {
    static getDataUrl(file: File) {
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