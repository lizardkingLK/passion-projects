import "./style.css";
import { Events } from "./modules/events";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
    <section id="treeInputContainer" draggable="true">
      <div id="treeInputHeading">Input</div>
      <textarea
        id="treeInput"
        placeholder="Enter tree info here..."
      ></textarea>
    </section>
    <section id="treeVisualContainer">
      <div id="treeVisualHeading">Visual</div>
      <canvas id="treeVisual"></canvas>
    </section>
    <section id="treeVisualStatusContainer">
      <p id="treeVisualStatusElapsed"></p>
    </section>
  `;

Events.registerEvents();
