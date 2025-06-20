import {
  CLASS_INFO,
  CLASS_SUCCESS,
  INFO_SAVED_SETTINGS,
  INFO_WAITING_INPUT,
  SETTING_NUMERIC_MAX,
  SETTING_NUMERIC_MIN,
  DURATION_FIVE_SECONDS,
  DURATION_INFINITE,
  DURATION_ONE_SECOND,
  INFO_RESET_SETTINGS,
  TREE_VISUAL,
  TREE_SIDEBAR_CONTAINER,
  CLASS_BLOCK,
  CLASS_HIDDEN,
  CLASS_ACTIVE,
  TREE_SIDEBAR_OPTIONS_CONTAINER,
} from "../constants";
import { Settings } from "../settings";
import { Input } from "../input";
import { handlePoppedContent, popupContent } from "../notifying";
import { Drawing } from "../drawing";
import { sidebarContainers } from "../../values";

export class Handler {
  static #inputChangeWait: number;
  static #inputChangePopup: HTMLParagraphElement | null;
  #input: Input;

  constructor() {
    Handler.#inputChangeWait = 0;
    Handler.#inputChangePopup = null;

    this.#input = Input.getInstance();
  }

  toggleSidePane() {
    const treeSidebarContainer = document.querySelector(
      TREE_SIDEBAR_CONTAINER
    )!;

    if (treeSidebarContainer.classList.contains(CLASS_BLOCK)) {
      treeSidebarContainer.classList.remove(CLASS_BLOCK);
      treeSidebarContainer.classList.add(CLASS_HIDDEN);
      return;
    }

    treeSidebarContainer.classList.remove(CLASS_HIDDEN);
    treeSidebarContainer.classList.add(CLASS_BLOCK);
  }

  toggleActive(element: HTMLButtonElement) {
    if (element.classList.contains(CLASS_ACTIVE)) {
      return;
    }

    document
      .querySelector(`${TREE_SIDEBAR_OPTIONS_CONTAINER} .${CLASS_ACTIVE}`)!
      .classList.remove(CLASS_ACTIVE);

    element.classList.add(CLASS_ACTIVE);
  }

  inputChanged(event: CustomEvent) {
    if (event.detail?.isSynthetic) {
      this.#input.draw();
      return;
    }

    if (Drawing.useImmediateDraw()) {
      this.#input.draw();
      return;
    }

    if (Handler.#inputChangeWait) {
      clearTimeout(Handler.#inputChangeWait);
    }

    if (!Handler.#inputChangePopup) {
      Handler.#inputChangePopup = popupContent({
        className: CLASS_INFO,
        message: INFO_WAITING_INPUT,
        duration: DURATION_INFINITE,
      });
    }

    Handler.#inputChangeWait = setTimeout(() => {
      handlePoppedContent(
        Handler.#inputChangePopup,
        () => {
          Handler.#inputChangePopup!.remove();
        },
        () => {
          this.#input.draw();
          Handler.#inputChangePopup = null;
        }
      );
    }, DURATION_FIVE_SECONDS);
  }

  handleInputFormat() {
    this.#input.format();
  }

  inputFocusOutValidation() {
    this.#input.validate();
  }

  handleSidebarOptionOpen(sidebarContent: HTMLElement) {
    {
      const sidebarContainer = document.querySelector(TREE_SIDEBAR_CONTAINER)!;
      if (sidebarContainer.classList.contains(CLASS_HIDDEN)) {
        sidebarContainer.classList.remove(CLASS_HIDDEN);
        sidebarContainer.classList.add(CLASS_BLOCK);
      }

      sidebarContainers.forEach((elementId) => {
        const element = document.querySelector(elementId)!;
        element.classList.remove(CLASS_BLOCK);
        element.classList.add(CLASS_HIDDEN);
      });

      sidebarContent.setAttribute("class", CLASS_BLOCK);
    }
  }

  numericalSettingChanged(target: HTMLInputElement) {
    const value = Number.parseInt(target.value);
    if (value < SETTING_NUMERIC_MIN) {
      target.value = SETTING_NUMERIC_MIN.toString();
      return;
    }

    if (value > SETTING_NUMERIC_MAX) {
      target.value = SETTING_NUMERIC_MAX.toString();
      return;
    }
  }

  colorSettingChanged(target: HTMLInputElement) {
    (target.nextSibling as HTMLSpanElement).style.backgroundColor =
      target.value;
  }

  handleVisualSave() {
    const treeVisual = document.querySelector(
      TREE_VISUAL
    )! as HTMLCanvasElement;

    treeVisual.toBlob((imageBlob) => {
      if (!imageBlob) {
        return;
      }

      const image = document.createElement("img");
      image.src = URL.createObjectURL(imageBlob);

      const fileReader = new FileReader();
      fileReader.readAsDataURL(imageBlob);

      fileReader.onloadend = () => {
        if (!fileReader.result) {
          return;
        }

        const downloadButton = document.createElement("a");
        downloadButton.href = fileReader.result as string;
        downloadButton.download = `${Date.now()}.png`;
        downloadButton.click();
      };
    });
  }

  elementDragged(
    previousLeft: number,
    currentLeft: number,
    previousTop: number,
    currentTop: number
  ) {
    return {
      dragStart: (event: DragEvent) => {
        previousLeft = event.pageX;
        previousTop = event.pageY;
      },
      dragEnd: (event: DragEvent) => {
        currentLeft = event.pageX;
        currentTop = event.pageY;

        const target = event.currentTarget as HTMLElement;
        const bcr = target.getBoundingClientRect();

        const newCenterX =
          window.scrollX +
          bcr.left +
          bcr.width / 2 +
          (currentLeft - previousLeft) +
          "px";
        target.style.left = newCenterX;

        const newCenterY =
          window.scrollY +
          bcr.top +
          bcr.height / 2 +
          (currentTop - previousTop) +
          "px";
        target.style.top = newCenterY;
      },
    };
  }

  settingsResetRequested() {
    Settings.resetSettings();
    Settings.evaluateSettingConfigurations();

    popupContent({
      className: CLASS_SUCCESS,
      duration: DURATION_ONE_SECOND,
      message: INFO_RESET_SETTINGS,
    });
  }

  settingsSubmitted() {
    Settings.saveSettings();
    Settings.evaluateSettingConfigurations();

    popupContent({
      className: CLASS_SUCCESS,
      duration: DURATION_ONE_SECOND,
      message: INFO_SAVED_SETTINGS,
    });
  }
}
