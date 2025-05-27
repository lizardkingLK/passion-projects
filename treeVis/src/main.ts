import { Components } from "./components";
import { Settings } from "./modules/settings";
import { Events } from "./modules/events";
import "./style.css";

Components.render();
Settings.initialize();
Events.register();
