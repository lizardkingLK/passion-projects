import { Events } from "./modules/events";
import { Settings } from "./modules/settings";
import "./style.css";

const sectionTreeInputContainer = `
  <section id="treeInputContainer" draggable="true">
    <div id="treeInputHeader">
      <p>Input</p>
      <div id="treeInputHeaderOptions">
        <button
          id="treeInputHeaderOptionRedraw"
          title="Redraw Tree">
          <img
            id="treeInputHeaderOptionRedrawIcon"
            src="./assets/refresh.svg"
            alt="refresh" />
        </button>
        <button
          id="treeInputHeaderOptionFormat"
          title="Format Text">
          <img
            id="treeInputHeaderOptionFormatIcon"
            src="./assets/format.svg"
            alt="format" />
        </button>
      </div>
    </div>
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

const sectionTreeSettingsContainer = `
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
    <div id="treeSettingsContent"></div>
    <div id="treeSettingsFooter">
      <button
        id="treeSettingsCancel"
        title="Close Settings">
        <p>Cancel</p>
      </button>
      <button
        id="treeSettingsSave"
        title="Save Changes">
        <p>Save</p>
      </button>
    </div>
  </section>
`;

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  ${sectionTreeInputContainer}
  ${sectionTreeVisualContainer}
  ${sectionTreeStatusContainer}
  ${sectionTreeSettingsContainer}
  `;

Settings.initialize();
Events.register();
