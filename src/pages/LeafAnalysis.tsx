import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { LeafSampleCard } from '@/components/leaf-analysis/LeafSampleCard';
import { NutrientChart } from '@/components/leaf-analysis/NutrientChart';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Upload, 
  FileSpreadsheet, 
  Search,
  Filter,
  Download,
  Leaf,
  Calendar,
  MapPin
} from 'lucide-react';
import { leafSamples, landSegments, crops, plantParts } from '@/data/mockData';
import { LeafSample } from '@/types/agronomy';

const LeafAnalysis = () => {
  const [selectedSample, setSelectedSample] = useState<LeafSample | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCrop, setSelectedCrop] = useState<string>('all');

  const handleViewDetails = (sample: LeafSample) => {
    setSelectedSample(sample);
    setIsDetailsOpen(true);
  };

  const filteredSamples = leafSamples.filter(sample => {
    const segment = landSegments.find(s => s.id === sample.landSegmentId);
    const matchesSearch = segment?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         sample.crop.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCrop = selectedCrop === 'all' || sample.crop === selectedCrop;
    return matchesSearch && matchesCrop;
  });

  return (
    <MainLayout 
      title="Leaf Sample Analysis"
      breadcrumbs={[
        { level: 'country', id: 'c1', name: 'India' },
        { level: 'region', id: 'r1', name: 'Maharashtra' },
      ]}
    >
      <div className="space-y-6">
        <Tabs defaultValue="samples" className="space-y-6">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="samples">Sample Reports</TabsTrigger>
              <TabsTrigger value="upload">Upload Data</TabsTrigger>
            </TabsList>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export Reports
            </Button>
          </div>

          <TabsContent value="samples" className="space-y-6">
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
                </div>
              </CardContent>
            </Card>

            {/* Sample Cards Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredSamples.map(sample => (
                <LeafSampleCard 
                  key={sample.id} 
                  sample={sample} 
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>

            {filteredSamples.length === 0 && (
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Leaf className="h-12 w-12 text-muted-foreground/50 mb-4" />
                  <h3 className="text-lg font-medium text-muted-foreground">No samples found</h3>
                  <p className="text-sm text-muted-foreground/70 mt-1">
                    Try adjusting your search or filter criteria
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="upload" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Upload Form */}
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="font-display flex items-center gap-2">
                    <FileSpreadsheet className="h-5 w-5 text-primary" />
                    Upload Lab Data
                  </CardTitle>
                  <CardDescription>
                    Upload structured CSV or Excel files containing leaf nutrient values
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label>Land Segment</Label>
                      <Select>
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
                        <Select>
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
                        <Label>Plant Part</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select part" />
                          </SelectTrigger>
                          <SelectContent>
                            {plantParts.map(part => (
                              <SelectItem key={part} value={part}>{part}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Sample Date</Label>
                      <Input type="date" />
                    </div>
                  </div>

                  {/* File Upload Area */}
                  <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                    <p className="text-sm font-medium text-foreground">
                      Drop your file here or click to browse
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Supports CSV, XLSX (Max 10MB)
                    </p>
                  </div>

                  <Button className="w-full">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload and Analyze
                  </Button>
                </CardContent>
              </Card>

              {/* Template Download */}
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="font-display">Data Template</CardTitle>
                  <CardDescription>
                    Download the template file to ensure your data is formatted correctly
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-lg bg-muted p-4">
                    <h4 className="font-medium text-sm mb-3">Required Columns:</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {['Nitrogen (N)', 'Phosphorus (P)', 'Potassium (K)', 'Calcium (Ca)', 'Magnesium (Mg)', 'Sulfur (S)', 'Iron (Fe)', 'Zinc (Zn)', 'Manganese (Mn)', 'Boron (B)'].map(nutrient => (
                        <div key={nutrient} className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-primary" />
                          <span className="text-muted-foreground">{nutrient}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Download Template
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Sample Details Dialog */}
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-display text-xl flex items-center gap-3">
                <Leaf className="h-6 w-6 text-primary" />
                Leaf Sample Analysis Report
              </DialogTitle>
              <DialogDescription>
                Detailed nutrient analysis with reference range comparison
              </DialogDescription>
            </DialogHeader>
            {selectedSample && (
              <div className="space-y-6 mt-4">
                {/* Sample Info */}
                <div className="flex flex-wrap gap-4">
                  <Badge variant="outline" className="gap-2">
                    <MapPin className="h-3 w-3" />
                    {landSegments.find(s => s.id === selectedSample.landSegmentId)?.name}
                  </Badge>
                  <Badge variant="outline" className="gap-2">
                    <Leaf className="h-3 w-3" />
                    {selectedSample.crop} - {selectedSample.plantPart}
                  </Badge>
                  <Badge variant="outline" className="gap-2">
                    <Calendar className="h-3 w-3" />
                    {new Date(selectedSample.sampleDate).toLocaleDateString()}
                  </Badge>
                </div>

                {/* Summary Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="rounded-xl bg-nutrient-optimal/10 p-4 text-center">
                    <p className="text-3xl font-bold text-nutrient-optimal">
                      {selectedSample.nutrients.filter(n => n.status === 'optimal').length}
                    </p>
                    <p className="text-sm text-nutrient-optimal/80">Within Range</p>
                  </div>
                  <div className="rounded-xl bg-nutrient-low/10 p-4 text-center">
                    <p className="text-3xl font-bold text-nutrient-low">
                      {selectedSample.nutrients.filter(n => n.status === 'low').length}
                    </p>
                    <p className="text-sm text-nutrient-low/80">Below Range</p>
                  </div>
                  <div className="rounded-xl bg-nutrient-high/10 p-4 text-center">
                    <p className="text-3xl font-bold text-nutrient-high">
                      {selectedSample.nutrients.filter(n => n.status === 'high').length}
                    </p>
                    <p className="text-sm text-nutrient-high/80">Above Range</p>
                  </div>
                </div>

                {/* Nutrient Chart */}
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="text-lg">Nutrient Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <NutrientChart nutrients={selectedSample.nutrients} />
                  </CardContent>
                </Card>

                {/* Actions */}
                <div className="flex gap-3">
                  <Button className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Download Report (PDF)
                  </Button>
                  <Button variant="outline">
                    Share
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
};

export default LeafAnalysis;
