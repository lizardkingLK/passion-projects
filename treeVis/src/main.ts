import "./style.css";
import { Events } from "./modules/events";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
    <section id="treeInputContainer" draggable="true">
      <div id="treeInputHeader">Input</div>
      <textarea
        id="treeInput"
        placeholder="Enter tree info here..."
      ></textarea>
    </section>
    <section id="treeVisualContainer">
      <div id="treeVisualHeader">Visual</div>
      <canvas id="treeVisual"></canvas>
    </section>
    <section id="treeVisualStatusContainer">
      <p id="treeVisualStatusElapsed"></p>
    </section>
  `;

Events.registerEvents();
