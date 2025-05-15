import { Events } from "./modules/events";
import { Settings } from "./modules/settings";
import "./style.css";

// TODO: add refresh and format functionality with buttons
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

// TODO: make this use a function
const divTreeSettingsContainer = `
  <div class="settingsField">
    <label class="settingsFieldLabel">
      <input
        name="useGrid"
        id="settingCheckUseGrid"
        type="checkbox"
        checked />
      <span class="settingsCheckThumb"></span>
    </label>  
    <p>Use Grid Drawing</p>
  </div>

  <div class="settingsField">
    <label class="settingsFieldLabel">
      <input
        name="useArrayInput"
        id="settingCheckUseArrayInput"
        type="checkbox" />
      <span class="settingsCheckThumb"></span>
    </label>  
    <p>Use Array Input</p>
  </div>

  <div class="settingsField">
    <label class="settingsFieldLabel">
      <input
        name="useAutosave"
        id="settingCheckUseAutoSave"
        type="checkbox"
        checked />
      <span class="settingsCheckThumb"></span>
    </label>  
    <p>Use Auto Save</p>
  </div>

  <div class="settingsField">
    <label class="settingsFieldLabel">
      <input
        name="useAutoFormat"
        id="settingCheckUseAutoFormat"
        type="checkbox" />
      <span class="settingsCheckThumb"></span>
    </label>  
    <p>Use Auto Format</p>
  </div>
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
    <div id="treeSettingsContent">
      ${/*divTreeSettingsContainer*/ true}
    </div>
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
