import {
  sidebarIcon,
  inputDataIcon,
  saveOutputIcon,
  viewHelpIcon,
  viewSettingsIcon,
  redrawTreeIcon,
  formatInputIcon,
} from "./icons";

const navSidebarOptionsContainer = `
  <nav id="treeSidebarOptionsContainer">
    <button
      id="treeSidebarOptionsHead"
      title="Click To Toggle">
      ${sidebarIcon}
    </button>

    <button
      id="treeSidebarOptionsInput"
      class="active"
      title="Click To Input Tree Data">
      ${inputDataIcon}
    </button>

    <button
      id="treeVisualHeaderOptionSave"
      title="Save Output">
      ${saveOutputIcon}
    </button>

    <button
      id="treeVisualHeaderOptionHelp"
      title="View Help">
      ${viewHelpIcon}
    </button>

    <button
      id="treeVisualHeaderOptionSettings"
      title="View Settings">
      ${viewSettingsIcon}
    </button>
  </nav>
`;

const sectionTreeInputContainer = `
  <section id="treeInputContainer">
    <div id="treeInputHeader">
      <p id="treeInputHeaderTitle">Input</p>
      <div id="treeInputHeaderOptions">
        <button
          id="treeInputHeaderOptionRedraw"
          title="Redraw Tree">
          ${redrawTreeIcon}
        </button>
        <button
          id="treeInputHeaderOptionFormat"
          title="Format Input">
          ${formatInputIcon}
        </button>
      </div>
    </div>
    <textarea
      id="treeInput"
      placeholder="Enter data here..."
    ></textarea>
  </section>
`;

const sectionTreeHelpContainer = `
  <section id="treeHelpContainer" class="hidden">
    <div id="treeHelpHeader">
      <p>Help</p>
    </div>
    <div id="treeHelpContent"></div>
    <div id="treeHelpFooter"></div>
  </section>
`;

const sectionTreeSettingsContainer = `
  <section id="treeSettingsContainer" class="hidden">
    <div id="treeSettingsHeader">
      <p>Settings</p>
    </div>
    <div id="treeSettingsContent"></div>
    <div id="treeSettingsFooter">
      <button
        id="treeSettingsFooterReset"
        title="Reset Settings">
        <p>Reset</p>
      </button>
      <button
        id="treeSettingsFooterSave"
        title="Save Changes">
        <p>Save</p>
      </button>
    </div>
  </section>
`;

const sectionSidebarContainer = `
  <div id="treeSidebarContainer" class="block">
    ${sectionTreeInputContainer}
    ${sectionTreeHelpContainer}
    ${sectionTreeSettingsContainer}
  </div>
`;

const canvasTreeVisualContainer = `
  <canvas id="treeVisual"></canvas>
`;

const sectionTreeStatusContainer = `
  <section id="treeVisualStatusContainer"></section>
`;

const mainContentContainer = `
  <main id="treeMainContainer">
    ${canvasTreeVisualContainer}
    ${sectionTreeStatusContainer}
  </main>
`;

const sectionAppContainer = `
  <section id="appContainer">
    ${navSidebarOptionsContainer}
    ${sectionSidebarContainer}
    ${mainContentContainer}
  </section>
`;

export class Components {
  static render() {
    document.querySelector<HTMLDivElement>("#app")!.innerHTML =
      sectionAppContainer;
  }
}
