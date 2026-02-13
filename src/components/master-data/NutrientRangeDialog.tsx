import { useState, useEffect } from 'react';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { NutrientRange } from '@/types/agronomy';

interface NutrientRangeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  crops: string[];
  plantParts: string[];
  editData?: { crop: string; plantPart: string; range: NutrientRange };
  onSave: (crop: string, plantPart: string, range: NutrientRange) => void;
}

export const NutrientRangeDialog = ({ open, onOpenChange, crops, plantParts, editData, onSave }: NutrientRangeDialogProps) => {
  const [crop, setCrop] = useState('');
  const [plantPart, setPlantPart] = useState('');
  const [nutrient, setNutrient] = useState('');
  const [lowGrade, setLowGrade] = useState('');
  const [highGrade, setHighGrade] = useState('');
  const [unit, setUnit] = useState('%');

  useEffect(() => {
    if (editData) {
      setCrop(editData.crop);
      setPlantPart(editData.plantPart);
      setNutrient(editData.range.nutrient);
      setLowGrade(String(editData.range.lowGrade));
      setHighGrade(String(editData.range.highGrade));
      setUnit(editData.range.unit);
    } else {
      setCrop('');
      setPlantPart('');
      setNutrient('');
      setLowGrade('');
      setHighGrade('');
      setUnit('%');
    }
  }, [editData, open]);

  const isValid = crop && plantPart && nutrient.trim() && lowGrade && highGrade && parseFloat(lowGrade) < parseFloat(highGrade);

  const handleSave = () => {
    if (!isValid) return;
    onSave(crop, plantPart, {
      nutrient: nutrient.trim(),
      lowGrade: parseFloat(lowGrade),
      highGrade: parseFloat(highGrade),
      unit,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display">{editData ? 'Edit' : 'Add'} Nutrient Range</DialogTitle>
          <DialogDescription>Configure nutrient threshold values for a crop and plant part.</DialogDescription>
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
              <Label>Plant Part</Label>
              <Select value={plantPart} onValueChange={setPlantPart} disabled={!!editData}>
                <SelectTrigger><SelectValue placeholder="Select part" /></SelectTrigger>
                <SelectContent>
                  {plantParts.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Nutrient Name</Label>
            <Input value={nutrient} onChange={(e) => setNutrient(e.target.value)} placeholder="e.g. Nitrogen (N)" maxLength={100} />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Low Grade</Label>
              <Input type="number" step="0.01" value={lowGrade} onChange={(e) => setLowGrade(e.target.value)} placeholder="0.0" />
            </div>
            <div className="space-y-2">
              <Label>High Grade</Label>
              <Input type="number" step="0.01" value={highGrade} onChange={(e) => setHighGrade(e.target.value)} placeholder="0.0" />
            </div>
            <div className="space-y-2">
              <Label>Unit</Label>
              <Select value={unit} onValueChange={setUnit}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="%">%</SelectItem>
                  <SelectItem value="ppm">ppm</SelectItem>
                  <SelectItem value="mg/kg">mg/kg</SelectItem>
                </SelectContent>
              </Select>
            </div>
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
