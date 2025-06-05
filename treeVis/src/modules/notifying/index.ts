import { TREE_VISUAL_STATUS_CONTAINER, DURATION_INFINITE } from "../constants";
import { TStatusPopup } from "../types";

export function popupContent({ className, message, duration }: TStatusPopup) {
  const container = document.querySelector(
    TREE_VISUAL_STATUS_CONTAINER
  )! as HTMLElement;

  const statusContent = document.createElement("p");
  statusContent.innerHTML = message;
  statusContent.setAttribute("class", className);
  container.appendChild(statusContent);

  if (duration !== DURATION_INFINITE) {
    setTimeout(
      () => animatePopupContent(statusContent, 1, () => statusContent.remove()),
      duration
    );
  }

  return statusContent;
}

export function handlePoppedContent(
  statusContent: HTMLElement | null,
  onFinished?: () => void,
  onAfterFinished?: () => void
) {
  if (statusContent) {
    animatePopupContent(statusContent, 1, onFinished, onAfterFinished);
  }
}

function animatePopupContent(
  contentElement: HTMLElement,
  opacity: number,
  onFinished?: () => void,
  onAfterFinished?: () => void
) {
  if (opacity === 0) {
    onFinished && onFinished();
    onAfterFinished && onAfterFinished();
    return;
  }

  contentElement.style.opacity = opacity.toString();

  requestAnimationFrame(() =>
    animatePopupContent(
      contentElement,
      Number((opacity - 0.1).toPrecision(1)),
      onFinished,
      onAfterFinished
    )
  );
}
