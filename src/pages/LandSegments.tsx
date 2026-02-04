import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Plus, 
  Search,
  MapPin,
  Crop,
  Droplets,
  MoreHorizontal
} from 'lucide-react';
import { landSegments, landOwners, leafSamples, nTesterReadings } from '@/data/mockData';
import { useState } from 'react';

const LandSegments = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSegments = landSegments.filter(segment => {
    const owner = landOwners.find(o => o.id === segment.landOwnerId);
    return segment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           segment.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
           owner?.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const getSegmentStats = (segmentId: string) => {
    const samples = leafSamples.filter(s => s.landSegmentId === segmentId);
    const readings = nTesterReadings.filter(r => r.landSegmentId === segmentId);
    return { samples: samples.length, readings: readings.length };
  };

  return (
    <MainLayout title="Land Segments">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex items-center justify-between">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Search segments, crops, or owners..." 
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Segment
          </Button>
        </div>

        {/* Segments Table */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              All Land Segments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Segment Name</TableHead>
                  <TableHead>Land Owner</TableHead>
                  <TableHead>Crop</TableHead>
                  <TableHead>Cultivation</TableHead>
                  <TableHead className="text-right">Area</TableHead>
                  <TableHead className="text-center">Samples</TableHead>
                  <TableHead className="text-center">N-Tester</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSegments.map(segment => {
                  const owner = landOwners.find(o => o.id === segment.landOwnerId);
                  const stats = getSegmentStats(segment.id);
                  return (
                    <TableRow key={segment.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Crop className="h-4 w-4 text-primary" />
                          </div>
                          <span className="font-medium">{segment.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{owner?.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{segment.crop}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5">
                          <Droplets className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{segment.cultivationType}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-mono">
                        {segment.area} {segment.areaUnit}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="secondary">{stats.samples}</Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="secondary">{stats.readings}</Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default LandSegments;
