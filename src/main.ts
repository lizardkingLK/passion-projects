import "./style.css";
import { drawCanvas } from ".";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
    <nav class="flex px-2">
      <h1 class="txtSmall">Tree Visualizer</h1>
    </nav>
    <main class="px-2">
      <textarea
        class="treeInput bg-light p-2"
        placeholder="Enter tree info here..."
      ></textarea>
      <canvas id="treeVisual" class="center treeVisual"></canvas>
    </main>
  `;

drawCanvas();
