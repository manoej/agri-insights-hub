import { LeafSample } from '@/types/agronomy';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Leaf, FileText, Eye } from 'lucide-react';
import { landSegments } from '@/data/mockData';

interface LeafSampleCardProps {
  sample: LeafSample;
  onViewDetails: (sample: LeafSample) => void;
}

export function LeafSampleCard({ sample, onViewDetails }: LeafSampleCardProps) {
  const segment = landSegments.find(s => s.id === sample.landSegmentId);
  
  const optimalCount = sample.nutrients.filter(n => n.status === 'optimal').length;
  const lowCount = sample.nutrients.filter(n => n.status === 'low').length;
  const highCount = sample.nutrients.filter(n => n.status === 'high').length;

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg font-display">{segment?.name || 'Unknown Segment'}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{sample.crop} • {sample.plantPart}</p>
          </div>
          <Badge variant={sample.status === 'analyzed' ? 'default' : 'secondary'}>
            {sample.status === 'analyzed' ? 'Analyzed' : 'Pending'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            <span>{new Date(sample.sampleDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Leaf className="h-4 w-4" />
            <span>{sample.nutrients.length} nutrients</span>
          </div>
        </div>

        {/* Status summary */}
        <div className="flex gap-2">
          <div className="flex-1 rounded-lg bg-nutrient-optimal/10 p-2 text-center">
            <p className="text-lg font-bold text-nutrient-optimal">{optimalCount}</p>
            <p className="text-xs text-nutrient-optimal/80">Optimal</p>
          </div>
          <div className="flex-1 rounded-lg bg-nutrient-low/10 p-2 text-center">
            <p className="text-lg font-bold text-nutrient-low">{lowCount}</p>
            <p className="text-xs text-nutrient-low/80">Low</p>
          </div>
          <div className="flex-1 rounded-lg bg-nutrient-high/10 p-2 text-center">
            <p className="text-lg font-bold text-nutrient-high">{highCount}</p>
            <p className="text-xs text-nutrient-high/80">High</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => onViewDetails(sample)}
          >
            <Eye className="h-4 w-4 mr-1.5" />
            View Details
          </Button>
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
