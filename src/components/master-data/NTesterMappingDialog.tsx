import { useState, useEffect } from 'react';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface NTesterMappingData {
  minReading: number;
  maxReading: number;
  topUp: number;
}

interface NTesterMappingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  crops: string[];
  cultivationTypes: string[];
  editData?: { crop: string; cultivation: string; mapping: NTesterMappingData; index: number };
  onSave: (crop: string, cultivation: string, mapping: NTesterMappingData) => void;
}

export const NTesterMappingDialog = ({ open, onOpenChange, crops, cultivationTypes, editData, onSave }: NTesterMappingDialogProps) => {
  const [crop, setCrop] = useState('');
  const [cultivation, setCultivation] = useState('');
  const [minReading, setMinReading] = useState('');
  const [maxReading, setMaxReading] = useState('');
  const [topUp, setTopUp] = useState('');

  useEffect(() => {
    if (editData) {
      setCrop(editData.crop);
      setCultivation(editData.cultivation);
      setMinReading(String(editData.mapping.minReading));
      setMaxReading(String(editData.mapping.maxReading));
      setTopUp(String(editData.mapping.topUp));
    } else {
      setCrop('');
      setCultivation('');
      setMinReading('');
      setMaxReading('');
      setTopUp('');
    }
  }, [editData, open]);

  const isValid = crop && cultivation && minReading && maxReading && topUp !== '' && parseInt(minReading) <= parseInt(maxReading);

  const handleSave = () => {
    if (!isValid) return;
    onSave(crop, cultivation, {
      minReading: parseInt(minReading),
      maxReading: parseInt(maxReading),
      topUp: parseInt(topUp),
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
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
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Min Reading</Label>
              <Input type="number" value={minReading} onChange={(e) => setMinReading(e.target.value)} placeholder="0" />
            </div>
            <div className="space-y-2">
              <Label>Max Reading</Label>
              <Input type="number" value={maxReading} onChange={(e) => setMaxReading(e.target.value)} placeholder="999" />
            </div>
            <div className="space-y-2">
              <Label>N Top-up (kg N/ha)</Label>
              <Input type="number" value={topUp} onChange={(e) => setTopUp(e.target.value)} placeholder="0" />
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
