import { TREE_VISUAL_STATUS_CONTAINER, TIME_INFINITE } from "../constants";
import { TStatusPopup } from "../types";

export function popupStatusMessage({ color, message, duration }: TStatusPopup) {
  const container = document.querySelector(
    TREE_VISUAL_STATUS_CONTAINER
  )! as HTMLElement;

  const statusContent = document.createElement("p");
  statusContent.setAttribute("style", `color: ${color}; opacity: 1;`);
  statusContent.innerHTML = message;
  container.appendChild(statusContent);

  if (duration !== TIME_INFINITE) {
    setTimeout(() => animatePopupStatusMessage(statusContent, 1), duration);
  }

  return statusContent;
}

export function clearPopupStatusMessage(
  statusContent: HTMLParagraphElement | null,
  useCallback?: () => void
) {
  if (statusContent) {
    animatePopupStatusMessage(statusContent, 1, useCallback);
  }
}

function animatePopupStatusMessage(
  statusContent: HTMLParagraphElement,
  opacity: number,
  useCallback?: () => void
) {
  if (opacity === 0) {
    statusContent.remove();
    useCallback && useCallback();

    return;
  }

  statusContent.style.opacity = opacity.toString();

  requestAnimationFrame(() =>
    animatePopupStatusMessage(
      statusContent,
      Number((opacity - 0.1).toPrecision(1)),
      useCallback
    )
  );
}
