'use client';

import Header from '@editorjs/header';
import List from '@editorjs/list';
import Paragraph from '@editorjs/paragraph';
import Quote from '@editorjs/quote';
import ImageTool from '@editorjs/image';
import { MyAttachesTool } from './Tools/attaches/AttachesTool';
import CodeTool from '@editorjs/code';
import Table from '@editorjs/table';
import Delimiter from '@editorjs/delimiter';
import InlineCode from '@editorjs/inline-code';
import Marker from '@editorjs/marker';
import { ChartTool } from './Tools/charts';
import { TradingViewTool } from './Tools/tradingview';

export const EDITOR_TOOLS = {
  header: {
    class: Header,
    config: {
      placeholder: 'Entrez un titre',
      levels: [1, 2, 3, 4],
      defaultLevel: 1
    }
  },
  paragraph: {
    class: Paragraph,
    config: {
      placeholder: 'Commencez à écrire...'
    }
  },
  list: {
    class: List,
    inlineToolbar: true,
    config: {
      defaultStyle: 'unordered'
    }
  },
  quote: {
    class: Quote,
    inlineToolbar: true,
    config: {
      quotePlaceholder: 'Entrez une citation',
      captionPlaceholder: 'Auteur de la citation'
    }
  },
  image: {
    class: ImageTool,
    config: {
      endpoints: {
        byFile: '/api/upload-image'
      },
      uploader: {
        uploadByFile: async (file: File) => {
          try {
            const formData = new FormData();
            formData.append('image', file);

            const response = await fetch('/api/upload-image', {
              method: 'POST',
              body: formData
            });

            const data = await response.json();

            if (!response.ok) {
              throw new Error(data.error || 'Erreur lors du téléchargement');
            }

            return {
              success: 1,
              file: {
                url: data.url
              }
            };
          } catch (error) {
            console.error('Erreur upload image:', error);
            return {
              success: 0,
              error: "Erreur lors du téléchargement de l'image"
            };
          }
        }
      }
    }
  },
  attaches: {
    class: MyAttachesTool,
    config: {
      endpoint: '/api/upload-file',
      buttonText: 'Sélectionner un fichier',
      uploader: {
        uploadByFile: async (file: File) => {
          try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('/api/upload-file', {
              method: 'POST',
              body: formData
            });

            const data = await response.json();

            if (!response.ok) {
              throw new Error(data.error || 'Erreur lors du téléchargement');
            }

            return {
              success: 1,
              file: {
                url: data.url,
                name: file.name,
                size: file.size
              }
            };
          } catch (error) {
            console.error('Erreur upload fichier:', error);
            return {
              success: 0,
              error: 'Erreur lors du téléchargement du fichier'
            };
          }
        }
      }
    }
  },
  code: {
    class: CodeTool,
    config: {
      placeholder: 'Entrez votre code ici'
    }
  },
  table: {
    class: Table,
    inlineToolbar: true,
    config: {
      rows: 2,
      cols: 3
    }
  },
  delimiter: Delimiter,
  inlineCode: {
    class: InlineCode,
    shortcut: 'CMD+SHIFT+M'
  },
  marker: {
    class: Marker,
    shortcut: 'CMD+SHIFT+H'
  },
  chart: {
    class: ChartTool,
    inlineToolbar: true
  },
  tradingview: {
    class: TradingViewTool,
    inlineToolbar: true
  }
};
