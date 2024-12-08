import Embed from '@editorjs/embed';
import Table from '@editorjs/table';
import List from '@editorjs/list';
import Warning from '@editorjs/warning';
import Code from '@editorjs/code';
import LinkTool from '@editorjs/link';
import Image from '@editorjs/image';
import Raw from '@editorjs/raw';
import Header from '@editorjs/header';
import Quote from '@editorjs/quote';
import Marker from '@editorjs/marker';
import CheckList from '@editorjs/checklist';
import Delimiter from '@editorjs/delimiter';
import InlineCode from '@editorjs/inline-code';
import { EditorTools, ToolConfig } from '../type';

export const BASE_TOOLS: EditorTools = {
  header: {
    class: Header,
    inlineToolbar: true,
    config: {
      levels: [1, 2, 3, 4],
      defaultLevel: 1
    }
  },
  paragraph: {
    inlineToolbar: true
  },
  embed: {
    class: Embed,
    config: {
      services: {
        youtube: true,
        twitter: true,
        instagram: true
      }
    }
  },
  list: {
    class: List,
    inlineToolbar: true
  },
  checklist: {
    class: CheckList,
    inlineToolbar: true
  },
  quote: {
    class: Quote,
    inlineToolbar: true
  },
  delimiter: Delimiter,
  table: {
    class: Table,
    inlineToolbar: true
  },
  code: Code,
  linkTool: LinkTool,
  image: {
    class: Image,
    config: {
      uploader: {
        uploadByFile(file: File) {
          // Implémentez votre logique d'upload ici
          return Promise.resolve({
            success: 1,
            file: {
              url: 'https://example.com/image.png'
            }
          });
        }
      }
    }
  },
  raw: Raw,
  marker: Marker,
  inlineCode: InlineCode,
  warning: Warning
};
