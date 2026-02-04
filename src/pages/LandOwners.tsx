import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Search,
  Users,
  Phone,
  MapPin,
  MoreHorizontal,
  User
} from 'lucide-react';
import { landOwners, landSegments, agronomists } from '@/data/mockData';
import { useState } from 'react';

const LandOwners = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOwners = landOwners.filter(owner => {
    return owner.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const getOwnerStats = (ownerId: string) => {
    const segments = landSegments.filter(s => s.landOwnerId === ownerId);
    const totalArea = segments.reduce((acc, s) => acc + s.area, 0);
    return { segments: segments.length, totalArea };
  };

  return (
    <MainLayout title="Land Owners">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex items-center justify-between">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Search land owners..." 
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Land Owner
          </Button>
        </div>

        {/* Owners Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredOwners.map(owner => {
            const stats = getOwnerStats(owner.id);
            const agronomist = agronomists.find(a => a.id === owner.agronomistId);
            const ownerSegments = landSegments.filter(s => s.landOwnerId === owner.id);
            
            return (
              <Card key={owner.id} className="border-border/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg font-display">{owner.name}</CardTitle>
                        {owner.contactNumber && (
                          <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1">
                            <Phone className="h-3 w-3" />
                            <span>{owner.contactNumber}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>Managed by: {agronomist?.name}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-lg bg-muted p-3 text-center">
                      <p className="text-2xl font-bold text-foreground">{stats.segments}</p>
                      <p className="text-xs text-muted-foreground">Land Segments</p>
                    </div>
                    <div className="rounded-lg bg-muted p-3 text-center">
                      <p className="text-2xl font-bold text-foreground">{stats.totalArea.toFixed(1)}</p>
                      <p className="text-xs text-muted-foreground">Hectares</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Crops</p>
                    <div className="flex flex-wrap gap-1">
                      {[...new Set(ownerSegments.map(s => s.crop))].map(crop => (
                        <Badge key={crop} variant="outline" className="text-xs">
                          {crop}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button variant="outline" className="w-full" size="sm">
                    <MapPin className="h-4 w-4 mr-2" />
                    View Segments
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </MainLayout>
  );
};

export default LandOwners;
