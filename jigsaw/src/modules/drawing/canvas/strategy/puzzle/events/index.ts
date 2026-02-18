export class CanvasPuzzleEvents {
    static isDragging: boolean = false

    static set() {
        document.addEventListener("mousedown", this.handleMouseToggle);
        document.addEventListener("mouseup", this.handleMouseToggle);
        document.addEventListener("mousemove", this.handleMove);
    }

    static handleMouseToggle() {
        this.isDragging = !this.isDragging;
    }

    static handleMove(event: MouseEvent) {
        if (!this.isDragging) {
            return;
        }

        const { clientY: y, clientX: x } = event;

        console.log({ y, x });
    }
}