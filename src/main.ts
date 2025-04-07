import "./style.css";
import { TREE_INPUT } from "./modules/constants";
import { Canvas } from "./modules/canvas";
import { Listener } from "./modules/listener";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
    <nav class="flex px-2">
      <h1 class="txtSmall">Tree Visualizer</h1>
    </nav>
    <main class="px-2">
      <textarea
        id="treeInput"
        class="treeInput p-2"
        placeholder="Enter tree info here..."
      ></textarea>
      <canvas id="treeVisual" class="center treeVisual"></canvas>
    </main>
  `;

const canvas = new Canvas();
const listener = new Listener();

document
  .querySelector(TREE_INPUT)!
  .addEventListener("input", (event: Event) => listener.listen(event, canvas));
