import {
  TIME_ONE_SECOND,
  TREE_VISUAL_STATUS_CONTAINER,
} from "./constants";
import { TStatusPopup } from "./types";


export function popupStatusMessage({ color, message, duration }: TStatusPopup) {
  const container = document.querySelector(
    TREE_VISUAL_STATUS_CONTAINER
  )! as HTMLElement;

  const statusContent = document.createElement("p");
  statusContent.setAttribute("style", `color: ${color}`);
  statusContent.innerHTML = message;

  const keyframes = [{ opacity: 1 }, { opacity: 0 }];
  const keyframeDuration = TIME_ONE_SECOND;

  container.appendChild(statusContent);
  setTimeout(() => {
    statusContent
      .animate(keyframes, keyframeDuration)
      .finished.then(() => statusContent.remove());
  }, duration);
}
