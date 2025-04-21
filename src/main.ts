import "./style.css";
import { TREE_INPUT } from "./modules/constants";
import { Canvas } from "./modules/canvas";
import { Listener } from "./modules/listener";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
    <textarea
      id="treeInput"
      placeholder="Enter tree info here..."
    ></textarea>
    <canvas id="treeVisual"></canvas>
  `;

const canvas = new Canvas();
const listener = new Listener();

document
  .querySelector(TREE_INPUT)!
  .addEventListener("input", (event: Event) => listener.listen(event, canvas));
