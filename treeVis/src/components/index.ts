import { closeIcon } from "./icons/close";

const sectionTreeInputContainer = `
  <section id="treeInputContainer">
    <div id="treeInputHeader">
      <p id="treeInputHeaderTitle">Input</p>
      <div id="treeInputHeaderOptions">
        <button
          id="treeInputHeaderOptionRedraw"
          title="Redraw Tree">
          <svg
            id="treeInputHeaderOptionRedrawIcon"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m4.5 15.75 7.5-7.5 7.5 7.5"
            />
          </svg>
        </button>
        <button
          id="treeInputHeaderOptionFormat"
          title="Format Input">
          <svg
            id="treeInputHeaderOptionFormatIcon"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5"
            />
          </svg>
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
        <a
          id="treeVisualHeaderOptionDownload"
          class="downloadLink hidden"
          href="#"
          title="Click to Download">
          <svg
            id="treeVisualHeaderOptionDownloadIcon"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
        </a>
        <button
          id="treeVisualHeaderOptionSave"
          title="Save Output">
          <svg
            id="treeVisualHeaderOptionSaveIcon"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
          </svg>
        </button>
        <button
          id="treeVisualHeaderOptionHelp"
          title="View Help">
          <svg
            id="treeVisualHeaderOptionHelpIcon"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
            />
          </svg>
        </button>
        <button
          id="treeVisualHeaderOptionSettings"
          title="View Settings">
          <svg
            id="treeVisualHeaderOptionSettingsIcon"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </button>
      </div>
    </div>
    <canvas id="treeVisual"></canvas>
  </section>
`;

const sectionTreeStatusContainer = `
  <section id="treeVisualStatusContainer"></section>
`;

const sectionTreeHelpContainer = `
  <section id="treeHelpContainer" class="hidden">
    <div id="treeHelpHeader">
      <p>Help</p>
      <button
        id="treeHelpHeaderClose"
        title="Close Help">
        ${closeIcon("treeHelpHeaderCloseIcon")}
      </button>
    </div>
    <div id="treeHelpContent"></div>
    <div id="treeHelpFooter">
      <button
        id="treeHelpFooterClose"
        title="Close Help">
        <p>Close</p>
      </button>
    </div>
  </section>
`;

const sectionTreeSettingsContainer = `
  <section id="treeSettingsContainer" class="hidden">
    <div id="treeSettingsHeader">
      <p>Settings</p>
      <button
        id="treeSettingsHeaderClose"
        title="Close Settings">
        ${closeIcon("treeSettingsHeaderCloseIcon")}
      </button>
    </div>
    <div id="treeSettingsContent"></div>
    <div id="treeSettingsFooter">
      <button
        id="treeSettingsFooterClose"
        title="Close Settings">
        <p>Close</p>
      </button>
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

export class Components {
  static render() {
    document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
    ${sectionTreeInputContainer}
    ${sectionTreeVisualContainer}
    ${sectionTreeStatusContainer}
    ${sectionTreeHelpContainer}
    ${sectionTreeSettingsContainer}
    `;
  }
}
