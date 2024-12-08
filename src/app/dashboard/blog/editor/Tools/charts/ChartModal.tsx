import { ChartSettings } from './chartConfig';

export const createChartModal = (
  settings: ChartSettings,
  onSave: (labels: string[], data: number[], palette: string[]) => void
) => {
  const modal = document.createElement('div');
  modal.classList.add(
    'fixed',
    'inset-0',
    'bg-black/50',
    'flex',
    'items-center',
    'justify-center',
    'z-50'
  );

  const content = document.createElement('div');
  content.classList.add(
    'bg-white',
    'p-8',
    'rounded-xl',
    'shadow-xl',
    'max-w-2xl',
    'w-full',
    'max-h-[90vh]',
    'overflow-y-auto',
    'space-y-6'
  );

  // Titre
  const title = document.createElement('h3');
  title.textContent = 'Édition du graphique';
  title.classList.add('text-xl', 'font-bold', 'mb-6');

  // Container pour les données dynamiques
  const dataList = document.createElement('div');
  dataList.classList.add('space-y-4');

  const addDataButton = document.createElement('button');
  addDataButton.innerHTML = `
    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
    </svg>
    Ajouter une donnée
  `;
  addDataButton.classList.add(
    'flex',
    'items-center',
    'px-4',
    'py-2',
    'bg-green-500',
    'text-white',
    'rounded-lg',
    'hover:bg-green-600',
    'transition-colors'
  );

  const createDataRow = (label = '', value = '') => {
    const row = document.createElement('div');
    row.classList.add('flex', 'items-center', 'gap-4');

    const labelInput = document.createElement('input');
    labelInput.type = 'text';
    labelInput.placeholder = 'Label';
    labelInput.value = label;
    labelInput.classList.add(
      'flex-1',
      'p-2',
      'border',
      'rounded-lg',
      'focus:ring-2',
      'focus:ring-blue-500',
      'focus:border-blue-500'
    );

    const valueInput = document.createElement('input');
    valueInput.type = 'number';
    valueInput.placeholder = 'Valeur';
    valueInput.value = value;
    valueInput.classList.add(
      'w-32',
      'p-2',
      'border',
      'rounded-lg',
      'focus:ring-2',
      'focus:ring-blue-500',
      'focus:border-blue-500'
    );

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = `
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
      </svg>
    `;
    deleteButton.classList.add(
      'p-2',
      'text-red-500',
      'hover:bg-red-50',
      'rounded-lg',
      'transition-colors'
    );
    deleteButton.onclick = () => row.remove();

    row.appendChild(labelInput);
    row.appendChild(valueInput);
    row.appendChild(deleteButton);
    return row;
  };

  // Ajouter les données existantes
  settings.labels.forEach((label, index) => {
    dataList.appendChild(
      createDataRow(label, settings.datasets[0].data[index].toString())
    );
  });

  addDataButton.onclick = () => {
    dataList.appendChild(createDataRow());
  };

  // Buttons
  const buttonsContainer = document.createElement('div');
  buttonsContainer.classList.add('flex', 'justify-end', 'gap-4', 'mt-8');

  const saveButton = document.createElement('button');
  saveButton.textContent = 'Sauvegarder';
  saveButton.classList.add(
    'px-6',
    'py-2',
    'bg-blue-500',
    'text-white',
    'rounded-lg',
    'hover:bg-blue-600',
    'transition-colors'
  );

  const cancelButton = document.createElement('button');
  cancelButton.textContent = 'Annuler';
  cancelButton.classList.add(
    'px-6',
    'py-2',
    'bg-gray-100',
    'text-gray-700',
    'rounded-lg',
    'hover:bg-gray-200',
    'transition-colors'
  );

  // Events
  saveButton.onclick = () => {
    const rows = dataList.children;
    const labels: string[] = [];
    const data: number[] = [];

    Array.from(rows).forEach((row) => {
      const labelInput = row.querySelector(
        'input[type="text"]'
      ) as HTMLInputElement;
      const valueInput = row.querySelector(
        'input[type="number"]'
      ) as HTMLInputElement;

      if (labelInput.value && valueInput.value) {
        labels.push(labelInput.value);
        data.push(Number(valueInput.value));
      }
    });

    onSave(labels, data, settings.datasets[0].backgroundColor);
    modal.remove();
  };

  cancelButton.onclick = () => modal.remove();

  // Assembly
  buttonsContainer.appendChild(cancelButton);
  buttonsContainer.appendChild(saveButton);

  content.appendChild(title);
  content.appendChild(dataList);
  content.appendChild(addDataButton);
  content.appendChild(buttonsContainer);

  modal.appendChild(content);
  return modal;
};
