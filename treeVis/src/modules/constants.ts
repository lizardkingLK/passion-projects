// local storage keys
export const KEY_TREE_VISUAL_SETTINGS = "treevisSettings";
export const KEY_TREE_ARRAY_INPUT_CONTENT = "treevisArrayInputContent";
export const KEY_TREE_JSON_INPUT_CONTENT = "treevisJsonInputContent";

// canvas configurations
export const CANVAS_WIDTH_RATIO = 1.6;
export const CANVAS_HEIGHT_RATIO = 0.9;
export const CANVAS_WIDTH = window.screen.width;
export const CANVAS_HEIGHT = window.screen.height;
export const SCREEN_UNIT = window.screen.availHeight / 20;
export const USE_GRID = false;
export const USE_IMMEDIATE_DRAW = false;

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
export const TREE_SIDEBAR_CONTAINER = "#treeSidebarContainer";
export const TREE_SIDEBAR_OPTIONS_CONTAINER = "#treeSidebarOptionsContainer";
export const TREE_SIDEBAR_TOGGLE = "#treeSidebarOptionsHead";
export const TREE_SIDEBAR_INPUT = "#treeSidebarOptionsInput";
export const TREE_VISUAL_CONTAINER = "#treeVisualContainer";
export const TREE_VISUAL = "#treeVisual";
export const TREE_VISUAL_HEADER_OPTIONS = "#treeVisualHeaderOptions";
export const TREE_VISUAL_HEADER_SAVE = "#treeVisualHeaderOptionSave";
export const TREE_VISUAL_HEADER_HELP = "#treeVisualHeaderOptionHelp";
export const TREE_VISUAL_HEADER_SETTINGS = "#treeVisualHeaderOptionSettings";
export const TREE_VISUAL_STATUS_CONTAINER = "#treeVisualStatusContainer";
export const TREE_VISUAL_STATUS = "#treeVisualStatus";

export const TREE_HELP_CONTAINER = "#treeHelpContainer";
export const TREE_HELP_BODY = "#treeHelpContent";

export const TREE_SETTINGS_CONTAINER = "#treeSettingsContainer";
export const TREE_SETTINGS_BODY = "#treeSettingsContent";
export const TREE_SETTINGS_SAVE = "#treeSettingsFooterSave";
export const TREE_SETTINGS_RESET = "#treeSettingsFooterReset";

export const TREE_INPUT_CONTAINER = "#treeInputContainer";
export const TREE_INPUT = "#treeInput";
export const TREE_INPUT_HEADER_TITLE = "#treeInputHeaderTitle";
export const TREE_INPUT_OPTION_REDRAW = "#treeInputHeaderOptionRedraw";
export const TREE_INPUT_OPTION_FORMAT = "#treeInputHeaderOptionFormat";

export const TREE_SETTINGS_NUMBER_INPUT = ".numberSettingsFieldContainer input";
export const TREE_SETTINGS_COLOR_INPUT = ".colorSettingsFieldContainer input";

// element common classes
export const CLASS_INFO = "info";
export const CLASS_ERROR = "error";
export const CLASS_SUCCESS = "success";
export const CLASS_HIDDEN = "hidden";
export const CLASS_BLOCK = "block";
export const CLASS_ACTIVE = "active";

// animate or time durations
export const DURATION_INFINITE = -1;
export const DURATION_ONE_SECOND = 1000;
export const DURATION_FOUR_SECONDS = 4000;
export const DURATION_FIVE_SECONDS = 5000;

// setting value ranges
export const SETTING_NUMERIC_MIN = 1;
export const SETTING_NUMERIC_MAX = 10;

// info messages
export const INFO_SAVED_SETTINGS = "Settings Saved";
export const INFO_RESET_SETTINGS = "Settings Reset Done";
export const INFO_FORMATTED_INPUT = "Input Formatted";
export const INFO_THEME_CHANGE_DETECTED = "System Color Mode Changed";
export const INFO_WAITING_INPUT = "Waiting for you to finish";

// error messages
export const ERROR_INPUT_HAS_NO_CONTENT = "Input has no content";
export const ERROR_INPUT_ARRAY_IS_INVALID = "Input array is invalid";
export const ERROR_INPUT_IS_AN_ARRAY = "Input is a json array";
export const ERROR_INPUT_KEYS_ARE_INVALID = "Input json keys are invalid";
export const ERROR_INPUT_VALUES_ARE_INVALID = "Input json values are invalid";
export const ERROR_INPUT_COULD_NOT_BE_PARSED = "Input could not be parsed.";

// setting keys
export const SETTING_USE_GRID = "useGrid";
export const SETTING_USE_JSON_INPUT = "useJsonInput";
export const SETTING_USE_AUTO_FORMAT = "useAutoFormat";
export const SETTING_USE_AUTO_SAVE = "useAutoSave";
export const SETTING_USE_IMMEDIATE_DRAW = "useImmediateDraw";
export const SETTING_LINE_WIDTH = "lineWidth";
export const SETTING_NODE_SIZE = "nodeSize";
export const SETTING_LINE_COLOR = "lineColor";
export const SETTING_NODE_COLOR = "nodeColor";
export const SETTING_TEXT_COLOR = "textColor";
export const SETTING_CANVAS_COLOR = "canvasColor";

// miscellaneous strings
export const STRING_LEFT = "left";
export const STRING_RIGHT = "right";
export const STRING_VALUE = "value";
export const STRING_EMPTY = "";
export const STRING_JSON_INPUT = "Json Input";
export const STRING_ARRAY_INPUT = "Array Input";
export const STRING_CLICK_TO_DOWNLOAD = "Click to Download";
