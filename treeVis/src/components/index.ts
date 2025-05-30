const sectionTreeInputContainer = `
  <section id="treeInputContainer">
    <div id="treeInputHeader">
      <p id="treeInputHeaderTitle">Input</p>
      <div id="treeInputHeaderOptions">
        <button
          id="treeInputHeaderOptionRedraw"
          title="Redraw Tree">
          <img
            id="treeInputHeaderOptionRedrawIcon"
            src="./assets/images/refresh.svg"
            alt="refresh" />
        </button>
        <button
          id="treeInputHeaderOptionFormat"
          title="Format Text">
          <img
            id="treeInputHeaderOptionFormatIcon"
            src="./assets/images/format.svg"
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
      <div id="treeVisualHeaderOptions">
        <button
          id="treeVisualHeaderSave"
          title="Save Output">
          <img
            id="treeVisualHeaderSaveIcon"
            src="./assets/images/save.svg"
            alt="save" />
        </button>
        <button
          id="treeVisualHeaderHelp"
          title="View Help">
          <img
            id="treeVisualHeaderHelpIcon"
            src="./assets/images/help.svg"
            alt="help" />
        </button>
        <button
          id="treeVisualHeaderSettings"
          title="View Settings">
          <img
            id="treeVisualHeaderSettingsIcon"
            src="./assets/images/cog.svg"
            alt="settings" />
        </button>
      </div>
    </div>
    <canvas id="treeVisual"></canvas>
  </section>
`;

const sectionTreeStatusContainer = `
  <section id="treeVisualStatusContainer"></section>
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
          src="./assets/images/close.svg"
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

export class Components {
  static render() {
    document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
    ${sectionTreeInputContainer}
    ${sectionTreeVisualContainer}
    ${sectionTreeStatusContainer}
    ${sectionTreeSettingsContainer}
    `;
  }
}
