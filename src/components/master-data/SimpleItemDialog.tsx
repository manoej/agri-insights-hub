import { useState, useEffect } from 'react';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface SimpleItemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  label: string;
  value?: string;
  onSave: (value: string) => void;
}

export const SimpleItemDialog = ({ open, onOpenChange, title, label, value, onSave }: SimpleItemDialogProps) => {
  const [input, setInput] = useState('');

  useEffect(() => {
    setInput(value ?? '');
  }, [value, open]);

  const handleSave = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    onSave(trimmed);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display">{title}</DialogTitle>
          <DialogDescription>Enter the {label.toLowerCase()} name below.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="item-name">{label}</Label>
            <Input
              id="item-name"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Enter ${label.toLowerCase()} name`}
              onKeyDown={(e) => e.key === 'Enter' && handleSave()}
              maxLength={100}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSave} disabled={!input.trim()}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
