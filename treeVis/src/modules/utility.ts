import { TREE_VISUAL_STATUS_CONTAINER } from "./constants";
import { TStatusPopup } from "./types";

export function popupStatusMessage({ color, message, duration }: TStatusPopup) {
  const container = document.querySelector(
    TREE_VISUAL_STATUS_CONTAINER
  )! as HTMLElement;

  const statusContent = document.createElement("p");
  statusContent.setAttribute("style", `color: ${color}`);
  statusContent.innerHTML = message;
  container.appendChild(statusContent);

  setTimeout(() => animatePopusStatusMessage(statusContent, 1), duration);
}

function animatePopusStatusMessage(
  statusContent: HTMLParagraphElement,
  opacity: number
) {
  if (opacity === 0) {
    statusContent.remove();
    return;
  }

  statusContent.style.opacity = opacity.toString();

  requestAnimationFrame(() =>
    animatePopusStatusMessage(statusContent, opacity - 0.1)
  );
}
