import { ChartJS } from './charts-registry';
import { createChartModal } from './chartModal';
import { ChartSettings, getChartOptions } from './chartConfig';
import { generateRandomColors } from '../../utils/helpers';
import { createChartBridge } from './ChartBridge';

export class ChartTool {
  private wrapper: HTMLDivElement | undefined;
  private chart: ChartJS | null = null;
  private settings: ChartSettings;

  static get toolbox() {
    return {
      title: 'Graphique',
      icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>'
    };
  }

  constructor({ data }: { data?: any }) {
    const colors = generateRandomColors(3);
    this.settings = {
      type: data?.type || 'line',
      labels: data?.labels || ['A', 'B', 'C'],
      datasets: [
        {
          label: 'Données',
          data: data?.data || [4, 5, 6],
          backgroundColor: colors,
          borderColor: colors
        }
      ]
    };
  }

  render() {
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add(
      'chart-tool-container',
      'p-4',
      'max-w-2xl',
      'mx-auto'
    );

    const controls = document.createElement('div');
    controls.classList.add('flex', 'items-center', 'gap-4', 'mb-4');

    const typeSelect = document.createElement('select');
    typeSelect.classList.add(
      'h-10',
      'px-3',
      'py-2',
      'bg-background',
      'border',
      'border-input',
      'rounded-md',
      'text-sm',
      'ring-offset-background',
      'placeholder:text-muted-foreground',
      'focus:outline-none',
      'focus:ring-2',
      'focus:ring-ring',
      'focus:ring-offset-2',
      'disabled:cursor-not-allowed',
      'disabled:opacity-50'
    );

    const editButton = document.createElement('button');
    editButton.textContent = 'Éditer les données';
    editButton.classList.add(
      'inline-flex',
      'items-center',
      'justify-center',
      'h-10',
      'px-4',
      'py-2',
      'bg-primary',
      'text-primary-foreground',
      'rounded-md',
      'text-sm',
      'font-medium',
      'ring-offset-background',
      'transition-colors',
      'focus-visible:outline-none',
      'focus-visible:ring-2',
      'focus-visible:ring-ring',
      'focus-visible:ring-offset-2',
      'disabled:pointer-events-none',
      'disabled:opacity-50',
      'hover:bg-primary/90'
    );

    controls.appendChild(editButton);

    const canvas = document.createElement('canvas');
    canvas.style.height = '300px';
    canvas.style.width = '100%';

    this.wrapper.appendChild(controls);
    this.wrapper.appendChild(canvas);

    typeSelect.addEventListener('change', (e) => {
      this.settings.type = (e.target as HTMLSelectElement).value as any;
      this.renderChart();
    });

    editButton.addEventListener('click', () => {
      const bridge = createChartBridge(
        this.settings,
        (labels, data, palette, type) => {
          this.settings.labels = labels;
          this.settings.datasets[0].data = data;
          this.settings.datasets[0].backgroundColor = palette;
          this.settings.datasets[0].borderColor = palette;
          this.settings.type = type;
          this.renderChart();
        }
      );
    });

    this.renderChart();
    return this.wrapper;
  }

  private renderChart() {
    if (!this.wrapper) return;
    const canvas = this.wrapper.querySelector('canvas');
    if (!canvas) return;

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new ChartJS(canvas, {
      type: this.settings.type,
      data: {
        labels: this.settings.labels,
        datasets: this.settings.datasets
      },
      options: getChartOptions(this.settings.type)
    });
  }

  save() {
    return {
      type: this.settings.type,
      labels: this.settings.labels,
      data: this.settings.datasets[0].data
    };
  }
}
