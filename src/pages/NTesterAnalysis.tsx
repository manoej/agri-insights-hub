import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { NTesterReadingCard } from '@/components/n-tester/NTesterReadingCard';
import { NTesterChart } from '@/components/n-tester/NTesterChart';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Search,
  Filter,
  Download,
  TestTube,
  Gauge,
  BarChart3,
  List
} from 'lucide-react';
import { nTesterReadings, landSegments, crops, cultivationTypes, nTesterMappings } from '@/data/mockData';
import { cn } from '@/lib/utils';

const NTesterAnalysis = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCrop, setSelectedCrop] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  
  // New reading form state
  const [newReading, setNewReading] = useState({
    landSegmentId: '',
    reading: '',
    crop: '',
    cultivationType: '',
  });

  const filteredReadings = nTesterReadings.filter(reading => {
    const segment = landSegments.find(s => s.id === reading.landSegmentId);
    const matchesSearch = segment?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         reading.crop.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCrop = selectedCrop === 'all' || reading.crop === selectedCrop;
    return matchesSearch && matchesCrop;
  });

  const calculateTopUp = (reading: number, crop: string, cultivationType: string): number | null => {
    const cropMappings = nTesterMappings[crop];
    if (!cropMappings) return null;
    
    const typeMappings = cropMappings[cultivationType];
    if (!typeMappings) return null;
    
    const mapping = typeMappings.find(m => reading >= m.minReading && reading <= m.maxReading);
    return mapping?.topUp ?? null;
  };

  const getUrgencyBadge = (topUp: number) => {
    if (topUp >= 70) return <Badge variant="destructive">Urgent</Badge>;
    if (topUp >= 40) return <Badge variant="default">Moderate</Badge>;
    return <Badge variant="secondary">Low Priority</Badge>;
  };

  return (
    <MainLayout 
      title="N-Tester Soil Analysis"
      breadcrumbs={[
        { level: 'country', id: 'c1', name: 'India' },
        { level: 'region', id: 'r1', name: 'Maharashtra' },
      ]}
    >
      <div className="space-y-6">
        <Tabs defaultValue="readings" className="space-y-6">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="readings">Readings & Recommendations</TabsTrigger>
              <TabsTrigger value="new">New Reading</TabsTrigger>
              <TabsTrigger value="chart">Analytics</TabsTrigger>
            </TabsList>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </div>

          <TabsContent value="readings" className="space-y-6">
            {/* Filters */}
            <Card className="border-border/50">
              <CardContent className="pt-6">
                <div className="flex flex-wrap gap-4">
                  <div className="flex-1 min-w-64">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input 
                        placeholder="Search by segment or crop..." 
                        className="pl-9"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                  <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                    <SelectTrigger className="w-48">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Filter by crop" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Crops</SelectItem>
                      {crops.map(crop => (
                        <SelectItem key={crop} value={crop}>{crop}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="flex rounded-lg border border-input p-1">
                    <Button 
                      variant={viewMode === 'cards' ? 'secondary' : 'ghost'} 
                      size="sm"
                      onClick={() => setViewMode('cards')}
                    >
                      <BarChart3 className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant={viewMode === 'table' ? 'secondary' : 'ghost'} 
                      size="sm"
                      onClick={() => setViewMode('table')}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Readings Display */}
            {viewMode === 'cards' ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredReadings.map(reading => (
                  <NTesterReadingCard key={reading.id} reading={reading} />
                ))}
              </div>
            ) : (
              <Card className="border-border/50">
                <CardContent className="pt-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Land Segment</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Crop</TableHead>
                        <TableHead>Cultivation</TableHead>
                        <TableHead className="text-center">N-Tester</TableHead>
                        <TableHead className="text-center">N Top-up</TableHead>
                        <TableHead>Priority</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredReadings.map(reading => {
                        const segment = landSegments.find(s => s.id === reading.landSegmentId);
                        return (
                          <TableRow key={reading.id}>
                            <TableCell className="font-medium">{segment?.name}</TableCell>
                            <TableCell>{new Date(reading.readingDate).toLocaleDateString()}</TableCell>
                            <TableCell>{reading.crop}</TableCell>
                            <TableCell>{reading.cultivationType}</TableCell>
                            <TableCell className="text-center">
                              <span className="font-mono font-bold">{reading.reading}</span>
                            </TableCell>
                            <TableCell className="text-center">
                              <span className={cn(
                                'font-mono font-bold',
                                reading.recommendedTopUp >= 70 && 'text-nutrient-low',
                                reading.recommendedTopUp >= 40 && reading.recommendedTopUp < 70 && 'text-accent-foreground',
                                reading.recommendedTopUp < 40 && 'text-nutrient-optimal',
                              )}>
                                {reading.recommendedTopUp} {reading.topUpUnit}
                              </span>
                            </TableCell>
                            <TableCell>{getUrgencyBadge(reading.recommendedTopUp)}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}

            {filteredReadings.length === 0 && (
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <TestTube className="h-12 w-12 text-muted-foreground/50 mb-4" />
                  <h3 className="text-lg font-medium text-muted-foreground">No readings found</h3>
                  <p className="text-sm text-muted-foreground/70 mt-1">
                    Try adjusting your search or filter criteria
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="new" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* New Reading Form */}
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="font-display flex items-center gap-2">
                    <Gauge className="h-5 w-5 text-primary" />
                    Record N-Tester Reading
                  </CardTitle>
                  <CardDescription>
                    Enter the N-Tester reading to get nitrogen top-up recommendations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label>Land Segment</Label>
                      <Select 
                        value={newReading.landSegmentId}
                        onValueChange={(value) => setNewReading(prev => ({ ...prev, landSegmentId: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select land segment" />
                        </SelectTrigger>
                        <SelectContent>
                          {landSegments.map(segment => (
                            <SelectItem key={segment.id} value={segment.id}>
                              {segment.name} ({segment.crop})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Crop</Label>
                        <Select
                          value={newReading.crop}
                          onValueChange={(value) => setNewReading(prev => ({ ...prev, crop: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select crop" />
                          </SelectTrigger>
                          <SelectContent>
                            {crops.map(crop => (
                              <SelectItem key={crop} value={crop}>{crop}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Cultivation Type</Label>
                        <Select
                          value={newReading.cultivationType}
                          onValueChange={(value) => setNewReading(prev => ({ ...prev, cultivationType: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            {cultivationTypes.map(type => (
                              <SelectItem key={type} value={type}>{type}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>N-Tester Reading</Label>
                      <Input 
                        type="number" 
                        placeholder="Enter reading (e.g., 520)"
                        value={newReading.reading}
                        onChange={(e) => setNewReading(prev => ({ ...prev, reading: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Reading Date</Label>
                      <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
                    </div>
                  </div>

                  <Button className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Save Reading & Calculate Top-up
                  </Button>
                </CardContent>
              </Card>

              {/* Preview / Result */}
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="font-display">Recommendation Preview</CardTitle>
                  <CardDescription>
                    See the calculated N top-up based on your input
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {newReading.reading && newReading.crop && newReading.cultivationType ? (
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="rounded-xl bg-muted p-6 text-center">
                          <Gauge className="h-8 w-8 mx-auto mb-3 text-primary" />
                          <p className="text-3xl font-bold text-foreground">{newReading.reading}</p>
                          <p className="text-sm text-muted-foreground">N-Tester Reading</p>
                        </div>
                        <div className={cn(
                          'rounded-xl p-6 text-center',
                          (() => {
                            const topUp = calculateTopUp(
                              parseInt(newReading.reading), 
                              newReading.crop, 
                              newReading.cultivationType
                            );
                            if (topUp === null) return 'bg-muted';
                            if (topUp >= 70) return 'bg-nutrient-low/10';
                            if (topUp >= 40) return 'bg-accent/20';
                            return 'bg-nutrient-optimal/10';
                          })()
                        )}>
                          <TestTube className="h-8 w-8 mx-auto mb-3 text-primary" />
                          <p className="text-3xl font-bold text-foreground">
                            {calculateTopUp(
                              parseInt(newReading.reading), 
                              newReading.crop, 
                              newReading.cultivationType
                            ) ?? 'N/A'}
                          </p>
                          <p className="text-sm text-muted-foreground">kg N/ha recommended</p>
                        </div>
                      </div>
                      {calculateTopUp(parseInt(newReading.reading), newReading.crop, newReading.cultivationType) !== null && (
                        <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                          <p className="text-sm text-foreground">
                            <strong>Recommendation:</strong> Based on the N-Tester reading of {newReading.reading} for {newReading.crop} under {newReading.cultivationType} conditions, 
                            apply {calculateTopUp(parseInt(newReading.reading), newReading.crop, newReading.cultivationType)} kg N/ha as top-up fertilizer.
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <Gauge className="h-12 w-12 text-muted-foreground/30 mb-4" />
                      <p className="text-muted-foreground">
                        Enter reading details to see the recommendation
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="chart" className="space-y-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="font-display flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  N-Tester Analysis Overview
                </CardTitle>
                <CardDescription>
                  Compare N-Tester readings and recommended top-up values across land segments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <NTesterChart readings={filteredReadings} />
              </CardContent>
            </Card>

            {/* Summary Stats */}
            <div className="grid gap-4 sm:grid-cols-3">
              <Card className="border-border/50">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-4xl font-bold text-foreground">
                      {Math.round(filteredReadings.reduce((acc, r) => acc + r.reading, 0) / filteredReadings.length)}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">Average N-Tester Reading</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-border/50">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-4xl font-bold text-foreground">
                      {Math.round(filteredReadings.reduce((acc, r) => acc + r.recommendedTopUp, 0) / filteredReadings.length)}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">Average N Top-up (kg/ha)</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-border/50">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-4xl font-bold text-nutrient-low">
                      {filteredReadings.filter(r => r.recommendedTopUp >= 70).length}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">Urgent Attention Needed</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default NTesterAnalysis;
