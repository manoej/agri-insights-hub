import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Database, Leaf, TestTube, Crop, Edit, Trash2 } from 'lucide-react';
import {
  crops as initialCrops,
  plantParts as initialPlantParts,
  cultivationTypes as initialCultivationTypes,
  nutrientRanges as initialNutrientRanges,
  nTesterMappings as initialNTesterMappings,
} from '@/data/mockData';
import { SimpleItemDialog } from '@/components/master-data/SimpleItemDialog';
import { DeleteConfirmDialog } from '@/components/master-data/DeleteConfirmDialog';
import { NutrientRangeDialog } from '@/components/master-data/NutrientRangeDialog';
import { NTesterMappingDialog } from '@/components/master-data/NTesterMappingDialog';
import type { NutrientRange } from '@/types/agronomy';
import { toast } from '@/hooks/use-toast';

const MasterData = () => {
  // State for master data lists
  const [crops, setCrops] = useState([...initialCrops]);
  const [plantParts, setPlantParts] = useState([...initialPlantParts]);
  const [cultivationTypes, setCultivationTypes] = useState([...initialCultivationTypes]);
  const [nutrientRanges, setNutrientRanges] = useState({ ...initialNutrientRanges });
  const [nTesterMappings, setNTesterMappings] = useState({ ...initialNTesterMappings });

  // Simple item dialog state
  const [simpleDialog, setSimpleDialog] = useState<{
    open: boolean; type: 'crop' | 'plantPart' | 'cultivation'; editValue?: string; editIndex?: number;
  }>({ open: false, type: 'crop' });

  // Delete dialog state
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean; name: string; onConfirm: () => void;
  }>({ open: false, name: '', onConfirm: () => {} });

  // Nutrient range dialog state
  const [nutrientDialog, setNutrientDialog] = useState<{
    open: boolean; editData?: { crop: string; plantPart: string; range: NutrientRange };
  }>({ open: false });

  // N-Tester mapping dialog state
  const [nTesterDialog, setNTesterDialog] = useState<{
    open: boolean;
    editData?: { crop: string; cultivation: string; mapping: { minReading: number; maxReading: number; topUp: number }; index: number };
  }>({ open: false });

  // Simple item CRUD handlers
  const handleSimpleSave = (value: string) => {
    const { type, editIndex } = simpleDialog;
    if (type === 'crop') {
      if (editIndex !== undefined) {
        setCrops(prev => prev.map((c, i) => i === editIndex ? value : c));
      } else {
        if (crops.includes(value)) { toast({ title: 'Duplicate', description: 'This crop already exists.', variant: 'destructive' }); return; }
        setCrops(prev => [...prev, value]);
      }
    } else if (type === 'plantPart') {
      if (editIndex !== undefined) {
        setPlantParts(prev => prev.map((p, i) => i === editIndex ? value : p));
      } else {
        if (plantParts.includes(value)) { toast({ title: 'Duplicate', description: 'This plant part already exists.', variant: 'destructive' }); return; }
        setPlantParts(prev => [...prev, value]);
      }
    } else {
      if (editIndex !== undefined) {
        setCultivationTypes(prev => prev.map((c, i) => i === editIndex ? value : c));
      } else {
        if (cultivationTypes.includes(value)) { toast({ title: 'Duplicate', description: 'This cultivation type already exists.', variant: 'destructive' }); return; }
        setCultivationTypes(prev => [...prev, value]);
      }
    }
    toast({ title: 'Saved', description: `${value} has been ${editIndex !== undefined ? 'updated' : 'added'}.` });
  };

  const handleDeleteItem = (type: 'crop' | 'plantPart' | 'cultivation', index: number, name: string) => {
    setDeleteDialog({
      open: true,
      name,
      onConfirm: () => {
        if (type === 'crop') setCrops(prev => prev.filter((_, i) => i !== index));
        else if (type === 'plantPart') setPlantParts(prev => prev.filter((_, i) => i !== index));
        else setCultivationTypes(prev => prev.filter((_, i) => i !== index));
        toast({ title: 'Deleted', description: `${name} has been removed.` });
        setDeleteDialog(prev => ({ ...prev, open: false }));
      },
    });
  };

  // Nutrient range handlers
  const handleNutrientSave = (crop: string, plantPart: string, range: NutrientRange) => {
    setNutrientRanges(prev => {
      const updated = { ...prev };
      if (!updated[crop]) updated[crop] = {};
      if (!updated[crop][plantPart]) updated[crop][plantPart] = [];

      const existingIdx = updated[crop][plantPart].findIndex(r => r.nutrient === range.nutrient);
      if (existingIdx >= 0) {
        updated[crop][plantPart] = updated[crop][plantPart].map((r, i) => i === existingIdx ? range : r);
      } else {
        updated[crop][plantPart] = [...updated[crop][plantPart], range];
      }
      return updated;
    });
    toast({ title: 'Saved', description: `${range.nutrient} range for ${crop} / ${plantPart} saved.` });
  };

  const handleDeleteNutrientRange = (crop: string, plantPart: string, nutrient: string) => {
    setDeleteDialog({
      open: true,
      name: `${nutrient} (${crop} - ${plantPart})`,
      onConfirm: () => {
        setNutrientRanges(prev => {
          const updated = { ...prev };
          updated[crop][plantPart] = updated[crop][plantPart].filter(r => r.nutrient !== nutrient);
          return updated;
        });
        toast({ title: 'Deleted', description: `${nutrient} range removed.` });
        setDeleteDialog(prev => ({ ...prev, open: false }));
      },
    });
  };

  // N-Tester mapping handlers
  const handleNTesterSave = (crop: string, cultivation: string, mapping: { minReading: number; maxReading: number; topUp: number }) => {
    setNTesterMappings(prev => {
      const updated = { ...prev };
      if (!updated[crop]) updated[crop] = {};
      if (!updated[crop][cultivation]) updated[crop][cultivation] = [];

      if (nTesterDialog.editData) {
        updated[crop][cultivation] = updated[crop][cultivation].map((m, i) =>
          i === nTesterDialog.editData!.index ? mapping : m
        );
      } else {
        updated[crop][cultivation] = [...updated[crop][cultivation], mapping].sort((a, b) => a.minReading - b.minReading);
      }
      return updated;
    });
    toast({ title: 'Saved', description: `N-Tester mapping for ${crop} / ${cultivation} saved.` });
  };

  const handleDeleteNTesterMapping = (crop: string, cultivation: string, index: number) => {
    const mapping = nTesterMappings[crop]?.[cultivation]?.[index];
    if (!mapping) return;
    setDeleteDialog({
      open: true,
      name: `${mapping.minReading}-${mapping.maxReading} range (${crop} - ${cultivation})`,
      onConfirm: () => {
        setNTesterMappings(prev => {
          const updated = { ...prev };
          updated[crop][cultivation] = updated[crop][cultivation].filter((_, i) => i !== index);
          return updated;
        });
        toast({ title: 'Deleted', description: 'N-Tester mapping removed.' });
        setDeleteDialog(prev => ({ ...prev, open: false }));
      },
    });
  };

  const simpleDialogTitle = simpleDialog.type === 'crop' ? 'Crop' : simpleDialog.type === 'plantPart' ? 'Plant Part' : 'Cultivation Type';

  return (
    <MainLayout title="Master Data Configuration">
      <div className="space-y-6">
        <Tabs defaultValue="crops" className="space-y-6">
          <TabsList>
            <TabsTrigger value="crops">Crops & Parts</TabsTrigger>
            <TabsTrigger value="nutrients">Nutrient Ranges</TabsTrigger>
            <TabsTrigger value="ntester">N-Tester Mappings</TabsTrigger>
          </TabsList>

          {/* Crops & Parts Tab */}
          <TabsContent value="crops" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Crops */}
              <Card className="border-border/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="font-display flex items-center gap-2">
                        <Crop className="h-5 w-5 text-primary" />
                        Crops
                      </CardTitle>
                      <CardDescription>Manage available crop types</CardDescription>
                    </div>
                    <Button size="sm" onClick={() => setSimpleDialog({ open: true, type: 'crop' })}>
                      <Plus className="h-4 w-4 mr-1" /> Add
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {crops.map((crop, idx) => (
                      <div key={crop} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                        <span className="font-medium">{crop}</span>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setSimpleDialog({ open: true, type: 'crop', editValue: crop, editIndex: idx })}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDeleteItem('crop', idx, crop)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Plant Parts */}
              <Card className="border-border/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="font-display flex items-center gap-2">
                        <Leaf className="h-5 w-5 text-primary" />
                        Plant Parts
                      </CardTitle>
                      <CardDescription>Parts used for sample analysis</CardDescription>
                    </div>
                    <Button size="sm" onClick={() => setSimpleDialog({ open: true, type: 'plantPart' })}>
                      <Plus className="h-4 w-4 mr-1" /> Add
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {plantParts.map((part, idx) => (
                      <div key={part} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                        <span className="font-medium">{part}</span>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setSimpleDialog({ open: true, type: 'plantPart', editValue: part, editIndex: idx })}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDeleteItem('plantPart', idx, part)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Cultivation Types */}
              <Card className="border-border/50 lg:col-span-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="font-display flex items-center gap-2">
                        <Database className="h-5 w-5 text-primary" />
                        Cultivation Types
                      </CardTitle>
                      <CardDescription>Irrigation and cultivation methods</CardDescription>
                    </div>
                    <Button size="sm" onClick={() => setSimpleDialog({ open: true, type: 'cultivation' })}>
                      <Plus className="h-4 w-4 mr-1" /> Add
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {cultivationTypes.map((type, idx) => (
                      <Badge key={type} variant="secondary" className="px-4 py-2 text-sm cursor-pointer group relative">
                        {type}
                        <span className="ml-2 inline-flex gap-1">
                          <button onClick={() => setSimpleDialog({ open: true, type: 'cultivation', editValue: type, editIndex: idx })} className="opacity-50 hover:opacity-100">
                            <Edit className="h-3 w-3" />
                          </button>
                          <button onClick={() => handleDeleteItem('cultivation', idx, type)} className="opacity-50 hover:opacity-100 text-destructive">
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </span>
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Nutrient Ranges Tab */}
          <TabsContent value="nutrients" className="space-y-6">
            <div className="flex justify-end">
              <Button onClick={() => setNutrientDialog({ open: true })}>
                <Plus className="h-4 w-4 mr-1" /> Add Nutrient Range
              </Button>
            </div>
            {Object.entries(nutrientRanges).map(([crop, parts]) => (
              <Card key={crop} className="border-border/50">
                <CardHeader>
                  <CardTitle className="font-display">{crop} - Nutrient Ranges</CardTitle>
                </CardHeader>
                <CardContent>
                  {Object.entries(parts).map(([part, ranges]) => (
                    <div key={part} className="mb-4">
                      <h4 className="text-sm font-medium text-muted-foreground mb-3">{part}</h4>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Nutrient</TableHead>
                            <TableHead className="text-center">Low Grade</TableHead>
                            <TableHead className="text-center">High Grade</TableHead>
                            <TableHead className="text-center">Unit</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {ranges.map(range => (
                            <TableRow key={range.nutrient}>
                              <TableCell className="font-medium">{range.nutrient}</TableCell>
                              <TableCell className="text-center font-mono text-nutrient-low">{range.lowGrade}</TableCell>
                              <TableCell className="text-center font-mono text-nutrient-high">{range.highGrade}</TableCell>
                              <TableCell className="text-center">{range.unit}</TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-1">
                                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setNutrientDialog({ open: true, editData: { crop, plantPart: part, range } })}>
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDeleteNutrientRange(crop, part, range.nutrient)}>
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* N-Tester Mappings Tab */}
          <TabsContent value="ntester" className="space-y-6">
            <div className="flex justify-end">
              <Button onClick={() => setNTesterDialog({ open: true })}>
                <Plus className="h-4 w-4 mr-1" /> Add N-Tester Mapping
              </Button>
            </div>
            {Object.entries(nTesterMappings).map(([crop, cultivations]) => (
              <Card key={crop} className="border-border/50">
                <CardHeader>
                  <CardTitle className="font-display flex items-center gap-2">
                    <TestTube className="h-5 w-5 text-primary" />
                    {crop} - N-Tester to N Top-up Mapping
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {Object.entries(cultivations).map(([cultivation, mappings]) => (
                    <div key={cultivation} className="mb-6 last:mb-0">
                      <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                        <Badge variant="outline">{cultivation}</Badge>
                      </h4>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>N-Tester Range</TableHead>
                            <TableHead className="text-center">N Top-up (kg N/ha)</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {mappings.map((mapping, idx) => (
                            <TableRow key={idx}>
                              <TableCell className="font-mono">
                                {mapping.minReading} - {mapping.maxReading}
                              </TableCell>
                              <TableCell className="text-center">
                                <Badge variant={mapping.topUp >= 70 ? 'destructive' : mapping.topUp >= 40 ? 'default' : 'secondary'} className="font-mono">
                                  {mapping.topUp}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-1">
                                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setNTesterDialog({ open: true, editData: { crop, cultivation, mapping, index: idx } })}>
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDeleteNTesterMapping(crop, cultivation, idx)}>
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>

      {/* Dialogs */}
      <SimpleItemDialog
        open={simpleDialog.open}
        onOpenChange={(open) => setSimpleDialog(prev => ({ ...prev, open }))}
        title={`${simpleDialog.editIndex !== undefined ? 'Edit' : 'Add'} ${simpleDialogTitle}`}
        label={simpleDialogTitle}
        value={simpleDialog.editValue}
        onSave={handleSimpleSave}
      />

      <DeleteConfirmDialog
        open={deleteDialog.open}
        onOpenChange={(open) => setDeleteDialog(prev => ({ ...prev, open }))}
        itemName={deleteDialog.name}
        onConfirm={deleteDialog.onConfirm}
      />

      <NutrientRangeDialog
        open={nutrientDialog.open}
        onOpenChange={(open) => setNutrientDialog(prev => ({ ...prev, open }))}
        crops={crops}
        plantParts={plantParts}
        editData={nutrientDialog.editData}
        onSave={handleNutrientSave}
      />

      <NTesterMappingDialog
        open={nTesterDialog.open}
        onOpenChange={(open) => setNTesterDialog(prev => ({ ...prev, open }))}
        crops={crops}
        cultivationTypes={cultivationTypes}
        editData={nTesterDialog.editData}
        onSave={handleNTesterSave}
      />
    </MainLayout>
  );
};

export default MasterData;
