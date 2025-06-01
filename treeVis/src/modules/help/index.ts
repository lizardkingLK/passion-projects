import { TREE_HELP_BODY } from "../constants";
import helpJson from "./help.json";

export class Help {
  static initialize() {
    const helpDialog = document.querySelector(
      TREE_HELP_BODY
    )! as HTMLDivElement;
    let helpField: HTMLDivElement;
    let helpFieldDescriptionContainer: HTMLDivElement;
    let helpFieldLabel: HTMLParagraphElement;
    let helpFieldDescription: HTMLHeadingElement;

    helpJson.map(({ label, description }) => {
      helpField = document.createElement("div");
      helpField.setAttribute("class", "helpField");

      helpFieldLabel = document.createElement("p");
      helpFieldLabel.innerHTML = label;

      helpFieldDescription = document.createElement("h5");
      helpFieldDescription.innerHTML = description.join("<br/>");

      helpFieldDescriptionContainer = document.createElement("div");
      helpFieldDescriptionContainer.setAttribute(
        "class",
        "helpFieldDescription"
      );

      helpFieldDescriptionContainer.appendChild(helpFieldLabel);
      helpFieldDescriptionContainer.appendChild(helpFieldDescription);
      helpField.appendChild(helpFieldDescriptionContainer);
      helpDialog.appendChild(helpField);
    });
  }
}
