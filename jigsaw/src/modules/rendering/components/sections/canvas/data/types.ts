export type CartesianState = {
    y: number,
    x: number,
    height: number,
    width: number,
    child?: CartesianState;
}