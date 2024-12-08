declare module '@rxpm/editor-js-code' {
  import { BlockTool, BlockToolConstructable } from '@editorjs/editorjs';
  const CodeTool: BlockToolConstructable;
  export default CodeTool;
}

declare module 'editorjs-drag-drop' {
  import EditorJS from '@editorjs/editorjs';
  export default class DragDrop {
    constructor(editor: EditorJS);
  }
}

declare module 'editorjs-button' {
  import { BlockTool, BlockToolConstructable } from '@editorjs/editorjs';
  const AnyButton: BlockToolConstructable;
  export default AnyButton;
}

declare module 'editorjs-multiblock-selection-plugin' {
  import EditorJS from '@editorjs/editorjs';

  interface MultiBlockSelectionPluginConfig {
    editor: EditorJS;
    version: string;
    onBeforeToolbarOpen?: (toolbar: HTMLElement) => void;
    onAfterToolbarClose?: (toolbar: HTMLElement) => void;
  }

  export default class MultiBlockSelectionPlugin {
    static SELECTION_CHANGE_EVENT: string;
    constructor(config: MultiBlockSelectionPluginConfig);
    listen(): void;
  }
}

declare module 'editorjs-html' {
  const edjsHTML: any;
  export default edjsHTML;
}
