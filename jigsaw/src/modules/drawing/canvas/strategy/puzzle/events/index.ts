export class CanvasPuzzleEvents {
    static setMouseDown(handler: (event: MouseEvent, isDragging: boolean) => void) {
        document.addEventListener("mousedown", (event: MouseEvent) => handler(event, true));
    }

    static setMouseUp(handler: (event: MouseEvent, isDragging: boolean) => void) {

        document.addEventListener("mouseup", (event: MouseEvent) => handler(event, false));
    }

    static setMouseMove(handler: (event: MouseEvent) => void) {
        document.addEventListener("mousemove", (event: MouseEvent) => handler(event));
    }
}