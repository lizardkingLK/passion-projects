import { TREE_VISUAL_STATUS_CONTAINER, DURATION_INFINITE } from "../constants";
import { TStatusPopup } from "../types";

export function popupStatusMessage({
  className,
  message,
  duration,
}: TStatusPopup) {
  const container = document.querySelector(
    TREE_VISUAL_STATUS_CONTAINER
  )! as HTMLElement;

  const statusContent = document.createElement("p");
  statusContent.innerHTML = message;
  statusContent.setAttribute("class", className);
  container.appendChild(statusContent);

  if (duration !== DURATION_INFINITE) {
    setTimeout(() => animatePopupStatusMessage(statusContent, 1), duration);
  }

  return statusContent;
}

export function clearPopupStatusMessage(
  statusContent: HTMLElement | null,
  useCallback?: () => void
) {
  if (statusContent) {
    animatePopupStatusMessage(statusContent, 1, useCallback);
  }
}

function animatePopupStatusMessage(
  statusContent: HTMLElement,
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
