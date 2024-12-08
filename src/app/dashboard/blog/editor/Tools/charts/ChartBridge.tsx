import React from 'react';
import { createRoot } from 'react-dom/client';
import { ChartDialog } from './ChartDialog';
import { CHART_COLOR_PALETTES, ChartSettings } from './chartConfig';

export const createChartBridge = (
  settings: ChartSettings,
  onSave: (
    labels: string[],
    data: number[],
    palette: string[],
    type: string
  ) => void
) => {
  const container = document.createElement('div');
  const root = createRoot(container);

  const handleClose = () => {
    root.unmount();
    container.remove();
  };

  root.render(
    <ChartDialog
      isOpen={true}
      onClose={handleClose}
      initialData={{
        labels: settings.labels,
        values: settings.datasets[0].data,
        type: settings.type,
        palette: settings.palette || 'default'
      }}
      onSave={({ labels, values, palette, type }) => {
        onSave(labels, values, CHART_COLOR_PALETTES[palette], type);
        handleClose();
      }}
    />
  );

  document.body.appendChild(container);
  return container;
};
