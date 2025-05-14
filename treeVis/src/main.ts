import { Events } from "./modules/events";
import "./style.css";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
    <section id="treeInputContainer" draggable="true">
      <div id="treeInputHeader">Input</div>
      <textarea
        id="treeInput"
        placeholder="Enter tree info here..."
      ></textarea>
    </section>
    <section id="treeVisualContainer">
      <div id="treeVisualHeader">
        <p id="treeVisualHeaderLabel">Visual</p>
        <button
          id="treeVisualHeaderSettings"
          title="View Settings">
            <img
              id="treeVisualHeaderSettingsIcon"
              src="./assets/cog.svg"
              alt="settings" />
        </button>
      </div>
      <canvas id="treeVisual"></canvas>
    </section>
    <section id="treeVisualStatusContainer">
      <p id="treeVisualStatusElapsed"></p>
    </section>
    <section id="treeSettingsContainer" class="hidden">
      <div id="treeSettingsHeader">
        <p>Settings</p>
        <button
          id="treeSettingsHeaderClose"
          title="Close Settings">
          <img
            id="treeSettingsHeaderCloseIcon" 
            src="./assets/close.svg"
            alt="close" />
        </button>
      </div>
      <div id="treeSettingsContent">
        Body
      </div>
    <section>
  `;

Events.registerEvents();
