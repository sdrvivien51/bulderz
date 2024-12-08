import { EditorTools } from './type';
import { BASE_TOOLS } from './base/BaseTool';
import { TradingViewTool } from './tradingview';
import { ChartTool } from './charts/charts-tool';

export const EDITOR_TOOLS: EditorTools = {
  ...BASE_TOOLS,
  tradingview: {
    class: TradingViewTool,
    inlineToolbar: false
  },
  chart: {
    class: ChartTool,
    inlineToolbar: false
  }
};
