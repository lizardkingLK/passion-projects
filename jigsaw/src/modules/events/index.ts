export class CanvasEvents {
    static isDragging: boolean = false

    static handleDrag(event: PointerEvent) {
        const { clientY: y, clientX: x } = event;

        console.log({ y, x });
    }

    static handleMove(event: MouseEvent) {
        if (!this.isDragging) {
            return;
        }

        const { clientY: y, clientX: x } = event;

        console.log({ y, x });
    }
}