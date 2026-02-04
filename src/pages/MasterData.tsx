import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Database,
  Leaf,
  TestTube,
  Crop,
  Edit,
  Trash2
} from 'lucide-react';
import { crops, plantParts, cultivationTypes, nutrientRanges, nTesterMappings } from '@/data/mockData';

const MasterData = () => {
  return (
    <MainLayout title="Master Data Configuration">
      <div className="space-y-6">
        <Tabs defaultValue="crops" className="space-y-6">
          <TabsList>
            <TabsTrigger value="crops">Crops & Parts</TabsTrigger>
            <TabsTrigger value="nutrients">Nutrient Ranges</TabsTrigger>
            <TabsTrigger value="ntester">N-Tester Mappings</TabsTrigger>
          </TabsList>

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
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-1" />
                      Add
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {crops.map(crop => (
                      <div key={crop} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                        <span className="font-medium">{crop}</span>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
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
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-1" />
                      Add
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {plantParts.map(part => (
                      <div key={part} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                        <span className="font-medium">{part}</span>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
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
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-1" />
                      Add
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {cultivationTypes.map(type => (
                      <Badge key={type} variant="secondary" className="px-4 py-2 text-sm">
                        {type}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="nutrients" className="space-y-6">
            {Object.entries(nutrientRanges).map(([crop, parts]) => (
              <Card key={crop} className="border-border/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-display">{crop} - Nutrient Ranges</CardTitle>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit Ranges
                    </Button>
                  </div>
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
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {ranges.map(range => (
                            <TableRow key={range.nutrient}>
                              <TableCell className="font-medium">{range.nutrient}</TableCell>
                              <TableCell className="text-center font-mono text-nutrient-low">{range.lowGrade}</TableCell>
                              <TableCell className="text-center font-mono text-nutrient-high">{range.highGrade}</TableCell>
                              <TableCell className="text-center">{range.unit}</TableCell>
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

          <TabsContent value="ntester" className="space-y-6">
            {Object.entries(nTesterMappings).map(([crop, cultivations]) => (
              <Card key={crop} className="border-border/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-display flex items-center gap-2">
                      <TestTube className="h-5 w-5 text-primary" />
                      {crop} - N-Tester to N Top-up Mapping
                    </CardTitle>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit Mappings
                    </Button>
                  </div>
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
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {mappings.map((mapping, idx) => (
                            <TableRow key={idx}>
                              <TableCell className="font-mono">
                                {mapping.minReading} - {mapping.maxReading}
                              </TableCell>
                              <TableCell className="text-center">
                                <Badge 
                                  variant={mapping.topUp >= 70 ? 'destructive' : mapping.topUp >= 40 ? 'default' : 'secondary'}
                                  className="font-mono"
                                >
                                  {mapping.topUp}
                                </Badge>
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
    </MainLayout>
  );
};

export default MasterData;
