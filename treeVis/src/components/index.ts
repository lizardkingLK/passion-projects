import { closeIcon } from "./icons/close";

const navSidebarOptionsContainer = `
  <nav id="treeSidebarOptionsContainer">
      <button
        id="treeSidebarOptionsHeadButton"
        title="Click To Toggle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6H20M4 12H20M4 18H20"/>
        </svg>
      </button>

      <button
        id="treeSidebarOptionsJSONInputButton"
        title="Click To Input JSON">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 256 256"
            stroke-width="1.5"
            stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M43.17529,128a29.7852,29.7852,0,0,1,8.023,10.25977C56,148.16309,56,160.28125,56,172c0,24.31348,1.01953,36,24,36a8,8,0,0,1,0,16c-17.48145,0-29.32422-6.14355-35.19824-18.25977C40,195.83691,40,183.71875,40,172c0-24.31348-1.01953-36-24-36a8,8,0,0,1,0-16c22.98047,0,24-11.68652,24-36,0-11.71875,0-23.83691,4.80176-33.74023C50.67578,38.14355,62.51855,32,80,32a8,8,0,0,1,0,16C57.01953,48,56,59.68652,56,84c0,11.71875,0,23.83691-4.80176,33.74023A29.7852,29.7852,0,0,1,43.17529,128ZM240,120c-22.98047,0-24-11.68652-24-36,0-11.71875,0-23.83691-4.80176-33.74023C205.32422,38.14355,193.48145,32,176,32a8,8,0,0,0,0,16c22.98047,0,24,11.68652,24,36,0,11.71875,0,23.83691,4.80176,33.74023A29.7852,29.7852,0,0,0,212.82471,128a29.7852,29.7852,0,0,0-8.023,10.25977C200,148.16309,200,160.28125,200,172c0,24.31348-1.01953,36-24,36a8,8,0,0,0,0,16c17.48145,0,29.32422-6.14355,35.19824-18.25977C216,195.83691,216,183.71875,216,172c0-24.31348,1.01953-36,24-36a8,8,0,0,0,0-16Z"/>
          </svg>
      </button>

      <button
        id="treeSidebarOptionsArrayInputButton"
        title="Click To Input Number Array">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 56 56"
            stroke-width="1.5"
            stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M42,30H33.3l1.4-12H42a2,2,0,0,0,0-4H35.1L36,6a2,2,0,0,0-4,0l-.9,8h-12L20,6a2,2,0,0,0-4,0l-.9,8H6a2,2,0,0,0,0,4h8.7L13.3,30H6a2,2,0,0,0,0,4h6.9L12,42a2,2,0,0,0,4,0l.9-8h12L28,42a2,2,0,0,0,4,0l.9-8H42a2,2,0,0,0,0-4ZM17.3,30l1.4-12h12L29.3,30Z"/>
          </svg>
      </button>

      <button
        id="treeVisualHeaderOptionSave"
        title="Save Output">
        <svg
          id="treeVisualHeaderOptionSaveIcon"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 512 512"
          stroke-width="1.5"
          stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M232 64L280 64 280 214 277 270 300 242 356 189 388 221 256 353 124 221 156 189 212 242 235 270 232 214 232 64ZM64 400L448 400 448 448 64 448 64 400Z"/>
      </svg>
    </button>

    <button
      id="treeVisualHeaderOptionHelp"
      title="View Help">
      <svg
        id="treeVisualHeaderOptionHelpIcon"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 36 36"
        stroke-width="1.5"
        stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M18,2A16,16,0,1,0,34,18,16,16,0,0,0,18,2Zm0,30A14,14,0,1,1,32,18,14,14,0,0,1,18,32Z" class="clr-i-outline clr-i-outline-path-1"/>
          <path d="M18.29,8.92a7.38,7.38,0,0,0-5.72,2.57,1,1,0,0,0-.32.71.92.92,0,0,0,.95.92,1.08,1.08,0,0,0,.71-.29,5.7,5.7,0,0,1,4.33-2c2.36,0,3.83,1.52,3.83,3.41v.05c0,2.21-1.76,3.44-4.54,3.65a.8.8,0,0,0-.76.92s0,2.32,0,2.75a1,1,0,0,0,1,.9h.11a1,1,0,0,0,.9-1V19.45c3-.42,5.43-2,5.43-5.28v-.05C24.18,11.12,21.84,8.92,18.29,8.92Z" class="clr-i-outline clr-i-outline-path-2"/>
          <circle cx="17.78" cy="26.2" r="1.25" class="clr-i-outline clr-i-outline-path-3"/>
      </svg>
    </button>

    <button
      id="treeVisualHeaderOptionSettings"
      title="View Settings">
      <svg
        id="treeVisualHeaderOptionSettingsIcon"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 36 36"
        stroke-width="1.5"
        stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M18.1,11c-3.9,0-7,3.1-7,7s3.1,7,7,7c3.9,0,7-3.1,7-7S22,11,18.1,11z M18.1,23c-2.8,0-5-2.2-5-5s2.2-5,5-5c2.8,0,5,2.2,5,5S20.9,23,18.1,23z"/>
          <path stroke-linecap="round" stroke-linejoin="round" d="M32.8,14.7L30,13.8l-0.6-1.5l1.4-2.6c0.3-0.6,0.2-1.4-0.3-1.9l-2.4-2.4c-0.5-0.5-1.3-0.6-1.9-0.3l-2.6,1.4l-1.5-0.6l-0.9-2.8C21,2.5,20.4,2,19.7,2h-3.4c-0.7,0-1.3,0.5-1.4,1.2L14,6c-0.6,0.1-1.1,0.3-1.6,0.6L9.8,5.2C9.2,4.9,8.4,5,7.9,5.5L5.5,7.9C5,8.4,4.9,9.2,5.2,9.8l1.3,2.5c-0.2,0.5-0.4,1.1-0.6,1.6l-2.8,0.9C2.5,15,2,15.6,2,16.3v3.4c0,0.7,0.5,1.3,1.2,1.5L6,22.1l0.6,1.5l-1.4,2.6c-0.3,0.6-0.2,1.4,0.3,1.9l2.4,2.4c0.5,0.5,1.3,0.6,1.9,0.3l2.6-1.4l1.5,0.6l0.9,2.9c0.2,0.6,0.8,1.1,1.5,1.1h3.4c0.7,0,1.3-0.5,1.5-1.1l0.9-2.9l1.5-0.6l2.6,1.4c0.6,0.3,1.4,0.2,1.9-0.3l2.4-2.4c0.5-0.5,0.6-1.3,0.3-1.9l-1.4-2.6l0.6-1.5l2.9-0.9c0.6-0.2,1.1-0.8,1.1-1.5v-3.4C34,15.6,33.5,14.9,32.8,14.7z M32,19.4l-3.6,1.1L28.3,21c-0.3,0.7-0.6,1.4-0.9,2.1l-0.3,0.5l1.8,3.3l-2,2l-3.3-1.8l-0.5,0.3c-0.7,0.4-1.4,0.7-2.1,0.9l-0.5,0.1L19.4,32h-2.8l-1.1-3.6L15,28.3c-0.7-0.3-1.4-0.6-2.1-0.9l-0.5-0.3l-3.3,1.8l-2-2l1.8-3.3l-0.3-0.5c-0.4-0.7-0.7-1.4-0.9-2.1l-0.1-0.5L4,19.4v-2.8l3.4-1l0.2-0.5c0.2-0.8,0.5-1.5,0.9-2.2l0.3-0.5L7.1,9.1l2-2l3.2,1.8l0.5-0.3c0.7-0.4,1.4-0.7,2.2-0.9l0.5-0.2L16.6,4h2.8l1.1,3.5L21,7.7c0.7,0.2,1.4,0.5,2.1,0.9l0.5,0.3l3.3-1.8l2,2l-1.8,3.3l0.3,0.5c0.4,0.7,0.7,1.4,0.9,2.1l0.1,0.5l3.6,1.1V19.4z"/>
      </svg>
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

const sectionSidebarContainer = `
  <div id="treeSidebarContainer">
    ${sectionTreeInputContainer}
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
    ${sectionAppContainer}
    ${sectionTreeHelpContainer}
    ${sectionTreeSettingsContainer}
    `;
  }
}
