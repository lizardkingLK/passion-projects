import {
  KEY_TREE_ARRAY_INPUT_CONTENT,
  KEY_TREE_JSON_INPUT_CONTENT,
  KEY_TREE_VISUAL_SETTINGS,
  TREE_HELP_CONTAINER,
  TREE_INPUT_CONTAINER,
  TREE_SETTINGS_CONTAINER,
  TREE_SETTINGS_RESET,
  TREE_SETTINGS_SAVE,
  TREE_SIDEBAR_INPUT,
  TREE_VISUAL,
  TREE_VISUAL_HEADER_HELP,
  TREE_VISUAL_HEADER_SETTINGS,
} from "./modules/constants";

export const settingStorageKeys = [
  KEY_TREE_VISUAL_SETTINGS,
  KEY_TREE_ARRAY_INPUT_CONTENT,
  KEY_TREE_JSON_INPUT_CONTENT,
];

export const sidebarButtonTogglers = [
  TREE_SIDEBAR_INPUT,
  TREE_VISUAL_HEADER_HELP,
  TREE_VISUAL_HEADER_SETTINGS,
];

export const sidebarContainers = [
  TREE_INPUT_CONTAINER,
  TREE_SETTINGS_CONTAINER,
  TREE_HELP_CONTAINER,
];

export const sidebarContentTogglers = [
  {
    sidebarContentQuerySelector: TREE_INPUT_CONTAINER,
    sidebarOpenQuerySelector: TREE_SIDEBAR_INPUT,
  },
  {
    sidebarContentQuerySelector: TREE_SETTINGS_CONTAINER,
    sidebarOpenQuerySelector: TREE_VISUAL_HEADER_SETTINGS,
    sidebarResetQuerySelector: TREE_SETTINGS_RESET,
    sidebarSaveQuerySelector: TREE_SETTINGS_SAVE,
  },
  {
    sidebarContentQuerySelector: TREE_HELP_CONTAINER,
    sidebarOpenQuerySelector: TREE_VISUAL_HEADER_HELP,
  },
];

export const draggableElements = [TREE_VISUAL];
