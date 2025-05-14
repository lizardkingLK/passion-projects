import { Events } from "./modules/events";
import "./style.css";

const sectionTreeInputContainer = `
  <section id="treeInputContainer" draggable="true">
    <div id="treeInputHeader">Input</div>
    <textarea
      id="treeInput"
      placeholder="Enter tree info here..."
    ></textarea>
  </section>
`;

const sectionTreeVisualContainer = `
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
`;

const sectionTreeStatusContainer = `
  <section id="treeVisualStatusContainer">
    <p id="treeStatusElapsed"></p>
  </section>
`;

const divTreeSettingsContainer = `
  <div id="treeSettingsContent">
    <div class="settingsField">
      <input
        id="settingCheckUseGrid"
        type="checkbox"
        checked />
      <p>Use Grid</p>
    </div>
    <div class="settingsField">
      <input
        id="settingCheckUseJsonInput"
        type="checkbox"
        checked />
      <p>Use Json Input</p>
    </div>
    <div class="settingsField">
      <input
        id="settingCheckUseAutosave"
        type="checkbox"
        checked />
      <p>Use AutoSave</p>
    </div>
    <div id="treeSettingsFooter">
      <button
        id="treeSettingsCancel"
        title="Go Back">
        <p>Cancel</p>
      </button>
      <button
        id="treeSettingsSave"
        title="Save Changes">
        <p>Save</p>
      </button>
    </div>
  </div>
`;

const sectionTreeSettingsContainer = `
  <section id="treeSettingsContainer" class="block">
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
    ${divTreeSettingsContainer}
  <section>
`;

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  ${sectionTreeInputContainer}
  ${sectionTreeVisualContainer}
  ${sectionTreeStatusContainer}
  ${sectionTreeSettingsContainer}
  `;

Events.registerEvents();
