// local storage keys
export const KEY_TREE_VISUAL_SETTINGS = "treevisSettings";
export const KEY_TREE_ARRAY_INPUT_CONTENT = "treevisArrayInputContent";
export const KEY_TREE_JSON_INPUT_CONTENT = "treevisJsonInputContent";

// canvas configurations
export const CANVAS_WIDTH = window.screen.width;
export const CANVAS_HEIGHT = window.screen.height;
export const SCREEN_UNIT = window.screen.availHeight / 20;
export const USE_GRID = false;

// canvas context configurations
export const LINE_WIDTH = 2;
export const STROKE_STYLE = "black";
export const SMOOTHING_ENABLED = true;
export const SMOOTHING_QUALITY = "high";
export const TEXT_ALIGN = "center";
export const TEXT_BASELINE = "middle";
export const TEXT_RENDERING = "optimizeLegibility";
export const FONT_KERNING = "auto";
export const FONT_STRETCH = "ultra-expanded";
export const FONT_VARIANT_CAPS = "titling-caps";
export const FONT_FAMILY = "{0} Roboto Mono";

// element ids
export const TREE_INPUT_CONTAINER = "#treeInputContainer";
export const TREE_INPUT = "#treeInput";
export const TREE_VISUAL_CONTAINER = "#treeVisualContainer";
export const TREE_VISUAL = "#treeVisual";
export const TREE_VISUAL_STATUS_CONTAINER = "#treeVisualStatusContainer";
export const TREE_VISUAL_HEADER_SETTINGS = "#treeVisualHeaderSettings";
export const TREE_INPUT_HEADER_TITLE = "#treeInputHeaderTitle";
export const TREE_VISUAL_SETTINGS_CLOSE = "#treeSettingsHeaderClose";
export const TREE_VISUAL_STATUS = "#treeVisualStatus";
export const TREE_SETTINGS_CONTAINER = "#treeSettingsContainer";
export const TREE_SETTINGS_BODY = "#treeSettingsContent";
export const TREE_SETTINGS_SAVE = "#treeSettingsSave";
export const TREE_INPUT_OPTION_REDRAW = "#treeInputHeaderOptionRedraw";
export const TREE_INPUT_OPTION_FORMAT = "#treeInputHeaderOptionFormat";
export const TREE_SETTINGS_CANCEL = "#treeSettingsCancel";
export const SETTINGS_NUMBER_INPUT = ".numberSettingsFieldContainer input";

// color hex codes
export const COLOR_INFO = "#000000";
export const COLOR_ERROR = "#FF0000";
export const COLOR_SUCCESS = "#088000";
export const COLOR_WARNING = "#FFA500";

// animate or time durations
export const TIME_ONE_SECOND = 1000;
export const TIME_FOUR_SECONDS = 4000;

// info messages
export const INFO_SAVED_SETTINGS = "Settings Saved";
export const INFO_FORMATTED_INPUT = "Input Formatted";

// error messages
export const ERROR_INPUT_HAS_NO_CONTENT = "Input has no content";
export const ERROR_INPUT_ARRAY_IS_INVALID = "Input array is invalid";
export const ERROR_INPUT_IS_AN_ARRAY = "Input is a json array";
export const ERROR_INPUT_KEYS_ARE_INVALID = "Input json keys are invalid";
export const ERROR_INPUT_COULD_NOT_BE_PARSED = "Input could not be parsed.";

// setting keys
export const SETTING_USE_GRID = "useGrid";
export const SETTING_USE_ARRAY_INPUT = "useArrayInput";
export const SETTING_USE_AUTO_FORMAT = "useAutoFormat";
export const SETTING_USE_AUTO_SAVE = "useAutoSave";
