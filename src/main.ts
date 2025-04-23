import "./style.css";
import { Events } from "./modules/events";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
    <section id="treeInputContainer" draggable="true">
      <div id="treeInputHeading"></div>
      <textarea
        id="treeInput"
        placeholder="Enter tree info here..."
      ></textarea>
    </section>
    <canvas id="treeVisual"></canvas>
  `;

Events.registerEvents();