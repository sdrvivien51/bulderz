import { ChartType, ChartData, ChartOptions } from 'chart.js';

export interface ChartSettings {
  type: ChartType;
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    fill?: boolean;
  }[];
}

export const getChartOptions = (type: ChartType): ChartOptions => ({
  responsive: true,
  maintainAspectRatio: true,
  aspectRatio: 2,
  plugins: {
    legend: {
      display: ['pie', 'doughnut'].includes(type)
    }
  },
  scales: {
    y: {
      display: !['pie', 'doughnut'].includes(type),
      beginAtZero: true
    },
    x: {
      display: !['pie', 'doughnut'].includes(type)
    }
  }
});

export const CHART_COLOR_PALETTES = {
  default: [
    '#3b82f6', // blue
    '#ef4444', // red
    '#22c55e', // green
    '#f59e0b', // amber
    '#6366f1', // indigo
    '#ec4899' // pink
  ],
  pastel: [
    '#93c5fd', // pastel blue
    '#fca5a5', // pastel red
    '#86efac', // pastel green
    '#fcd34d', // pastel yellow
    '#a5b4fc', // pastel indigo
    '#fbcfe8' // pastel pink
  ],
  dark: [
    '#1d4ed8', // dark blue
    '#b91c1c', // dark red
    '#15803d', // dark green
    '#b45309', // dark amber
    '#4338ca', // dark indigo
    '#be185d' // dark pink
  ]
};
