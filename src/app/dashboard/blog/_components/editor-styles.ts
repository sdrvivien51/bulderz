export interface EditorStyles {
  wrapper: string;
  editor: string;
}

export const editorStyles: EditorStyles = {
  wrapper: 'relative',
  editor:
    'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none'
};

export function injectEditorStyles(): EditorStyles {
  // Add any additional editor styles initialization if needed
  return editorStyles;
}
