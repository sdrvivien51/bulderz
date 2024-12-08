import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Plus, Trash2 } from 'lucide-react';
import { CHART_COLOR_PALETTES } from './chartConfig';

interface ChartDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: {
    labels: string[];
    values: number[];
    palette: string;
    type: string;
  }) => void;
  initialData: {
    labels: string[];
    values: number[];
    type: string;
    palette?: string;
  };
}

export function ChartDialog({
  isOpen,
  onClose,
  onSave,
  initialData
}: ChartDialogProps) {
  const [rows, setRows] = React.useState(
    initialData.labels.map((label, i) => ({
      id: i.toString(),
      label,
      value: initialData.values[i]
    }))
  );
  const [selectedPalette, setSelectedPalette] = React.useState(
    initialData.palette || 'default'
  );
  const [chartType, setChartType] = React.useState(initialData.type);

  const addRow = () => {
    setRows([...rows, { id: Date.now().toString(), label: '', value: 0 }]);
  };

  const removeRow = (id: string) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleSave = () => {
    onSave({
      labels: rows.map((r) => r.label),
      values: rows.map((r) => r.value),
      palette: selectedPalette,
      type: chartType
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Configuration du graphique</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <Select value={chartType} onValueChange={setChartType}>
              <SelectTrigger>
                <SelectValue placeholder="Type de graphique" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="line">Ligne</SelectItem>
                <SelectItem value="bar">Barres</SelectItem>
                <SelectItem value="pie">Camembert</SelectItem>
                <SelectItem value="doughnut">Anneau</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedPalette} onValueChange={setSelectedPalette}>
              <SelectTrigger>
                <SelectValue placeholder="Palette de couleurs" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Défaut</SelectItem>
                <SelectItem value="pastel">Pastel</SelectItem>
                <SelectItem value="dark">Sombre</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            {rows.map((row) => (
              <div key={row.id} className="flex items-center gap-2">
                <Input
                  placeholder="Label"
                  value={row.label}
                  onChange={(e) => {
                    const newRows = rows.map((r) =>
                      r.id === row.id ? { ...r, label: e.target.value } : r
                    );
                    setRows(newRows);
                  }}
                />
                <Input
                  type="number"
                  placeholder="Valeur"
                  value={row.value}
                  onChange={(e) => {
                    const newRows = rows.map((r) =>
                      r.id === row.id
                        ? { ...r, value: Number(e.target.value) }
                        : r
                    );
                    setRows(newRows);
                  }}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeRow(row.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          <Button variant="outline" onClick={addRow} className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Ajouter une donnée
          </Button>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button onClick={handleSave}>Sauvegarder</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
