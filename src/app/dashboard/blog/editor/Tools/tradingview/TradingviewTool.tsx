export class TradingViewTool {
  private wrapper: HTMLDivElement | undefined;
  private data: any;
  private readOnly: boolean;

  static get toolbox() {
    return {
      title: 'TradingView',
      icon: '<svg width="15" height="15" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 1H1V16" stroke="currentColor" stroke-width="2"/><path d="M1 12L5.5 7.5L8.5 10.5L16 3" stroke="currentColor" stroke-width="2"/></svg>'
    };
  }

  constructor({ data, readOnly }: { data?: any; readOnly?: boolean }) {
    this.data = data || {};
    this.readOnly = readOnly || false;
    this.wrapper = undefined;
  }

  render() {
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('tradingview-widget-container');

    const widgetContainer = document.createElement('div');
    widgetContainer.id = `tradingview_${Date.now()}`;

    this.wrapper.appendChild(widgetContainer);

    const script = document.createElement('script');
    script.src =
      'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = JSON.stringify({
      width: '100%',
      height: '500',
      symbol: this.data?.symbol || 'BINANCE:BTCUSDT',
      interval: 'D',
      timezone: 'Etc/UTC',
      theme: 'light',
      style: '1',
      locale: 'fr',
      enable_publishing: !this.readOnly,
      allow_symbol_change: !this.readOnly,
      container_id: widgetContainer.id,
      studies: true,
      show_popup_button: true,
      popup_width: '1000',
      popup_height: '650',
      enable_drawing_tools: true
    });

    this.wrapper.appendChild(script);
    return this.wrapper;
  }

  save() {
    return {
      symbol: this.data?.symbol || 'BINANCE:BTCUSDT'
    };
  }
}
