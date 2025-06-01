import { Components } from "./components";
import { Theme } from "./modules/theme";
import { Help } from "./modules/help";
import { Settings } from "./modules/settings";
import { Events } from "./modules/events";
import "./style.css";

Components.render();
Theme.render();
Help.initialize();
Settings.initialize();
Events.register();
