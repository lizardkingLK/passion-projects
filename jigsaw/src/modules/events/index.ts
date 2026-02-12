export class CanvasEvents {
    static isDragging: boolean = false

    static set(canvas: HTMLCanvasElement) {
        canvas.addEventListener("mousedown", this.handleMouseToggle);
        canvas.addEventListener("mouseup", this.handleMouseToggle);
        canvas.addEventListener("mousemove", this.handleMove);
    }

    static handleMouseToggle() {
        this.isDragging = !this.isDragging;
    }

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