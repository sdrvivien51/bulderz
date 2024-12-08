import { BlockToolConstructable, ToolSettings } from '@editorjs/editorjs';

export interface EditorTools {
  [key: string]: BlockToolConstructable | ToolSettings;
}

export interface ToolConfig {
  class: BlockToolConstructable;
  inlineToolbar?: boolean;
  config?: Record<string, any>;
}
