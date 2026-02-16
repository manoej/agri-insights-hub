import { useState, useEffect } from 'react';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2 } from 'lucide-react';

interface NTesterMappingRow {
  minReading: number;
  maxReading: number;
  topUp: number;
}

interface NTesterMappingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  crops: string[];
  cultivationTypes: string[];
  editData?: { crop: string; cultivation: string; mappings: NTesterMappingRow[] };
  onSave: (crop: string, cultivation: string, mappings: NTesterMappingRow[]) => void;
}

const emptyRow = () => ({ minReading: '', maxReading: '', topUp: '' });

export const NTesterMappingDialog = ({ open, onOpenChange, crops, cultivationTypes, editData, onSave }: NTesterMappingDialogProps) => {
  const [crop, setCrop] = useState('');
  const [cultivation, setCultivation] = useState('');
  const [rows, setRows] = useState<{ minReading: string; maxReading: string; topUp: string }[]>([emptyRow()]);

  useEffect(() => {
    if (editData) {
      setCrop(editData.crop);
      setCultivation(editData.cultivation);
      setRows(editData.mappings.map(m => ({
        minReading: String(m.minReading),
        maxReading: String(m.maxReading),
        topUp: String(m.topUp),
      })));
    } else {
      setCrop('');
      setCultivation('');
      setRows([emptyRow()]);
    }
  }, [editData, open]);

  const updateRow = (index: number, field: string, value: string) => {
    setRows(prev => prev.map((r, i) => i === index ? { ...r, [field]: value } : r));
  };

  const addRow = () => setRows(prev => [...prev, emptyRow()]);

  const removeRow = (index: number) => {
    if (rows.length <= 1) return;
    setRows(prev => prev.filter((_, i) => i !== index));
  };

  const allRowsValid = rows.every(r => r.minReading !== '' && r.maxReading !== '' && r.topUp !== '' && parseInt(r.minReading) <= parseInt(r.maxReading));
  const isValid = crop && cultivation && rows.length > 0 && allRowsValid;

  const handleSave = () => {
    if (!isValid) return;
    const mappings = rows.map(r => ({
      minReading: parseInt(r.minReading),
      maxReading: parseInt(r.maxReading),
      topUp: parseInt(r.topUp),
    })).sort((a, b) => a.minReading - b.minReading);
    onSave(crop, cultivation, mappings);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display">{editData ? 'Edit' : 'Add'} N-Tester Mapping</DialogTitle>
          <DialogDescription>Map N-Tester reading ranges to nitrogen top-up recommendations.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Crop</Label>
              <Select value={crop} onValueChange={setCrop} disabled={!!editData}>
                <SelectTrigger><SelectValue placeholder="Select crop" /></SelectTrigger>
                <SelectContent>
                  {crops.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Cultivation Type</Label>
              <Select value={cultivation} onValueChange={setCultivation} disabled={!!editData}>
                <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                <SelectContent>
                  {cultivationTypes.map(ct => <SelectItem key={ct} value={ct}>{ct}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Reading Ranges & Top-up</Label>
              <Button type="button" variant="outline" size="sm" onClick={addRow}>
                <Plus className="h-3 w-3 mr-1" /> Add Row
              </Button>
            </div>

            <div className="grid grid-cols-[1fr_1fr_1fr_auto] gap-2 text-xs font-medium text-muted-foreground px-1">
              <span>Min Reading</span>
              <span>Max Reading</span>
              <span>N Top-up (kg N/ha)</span>
              <span className="w-8" />
            </div>

            {rows.map((row, idx) => (
              <div key={idx} className="grid grid-cols-[1fr_1fr_1fr_auto] gap-2 items-center">
                <Input
                  type="number"
                  value={row.minReading}
                  onChange={(e) => updateRow(idx, 'minReading', e.target.value)}
                  placeholder="0"
                />
                <Input
                  type="number"
                  value={row.maxReading}
                  onChange={(e) => updateRow(idx, 'maxReading', e.target.value)}
                  placeholder="999"
                />
                <Input
                  type="number"
                  value={row.topUp}
                  onChange={(e) => updateRow(idx, 'topUp', e.target.value)}
                  placeholder="0"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive"
                  onClick={() => removeRow(idx)}
                  disabled={rows.length <= 1}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSave} disabled={!isValid}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
