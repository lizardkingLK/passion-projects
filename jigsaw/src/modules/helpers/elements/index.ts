export class ElementHelper {
    static toggleClass(identifier: string, className: string) {
        const element = document.querySelector(identifier);
        if (element) {
            element.classList.toggle(className);
        }
    }
}