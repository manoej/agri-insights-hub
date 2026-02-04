import { NTesterReading } from '@/types/agronomy';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Gauge, Droplets, Crop } from 'lucide-react';
import { landSegments } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface NTesterReadingCardProps {
  reading: NTesterReading;
}

export function NTesterReadingCard({ reading }: NTesterReadingCardProps) {
  const segment = landSegments.find(s => s.id === reading.landSegmentId);
  
  // Determine urgency based on top-up recommendation
  const getUrgencyLevel = (topUp: number) => {
    if (topUp >= 70) return 'critical';
    if (topUp >= 40) return 'moderate';
    return 'low';
  };

  const urgency = getUrgencyLevel(reading.recommendedTopUp);

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg font-display">{segment?.name || 'Unknown Segment'}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{reading.crop} • {reading.cultivationType}</p>
          </div>
          <Badge variant={
            urgency === 'critical' ? 'destructive' : 
            urgency === 'moderate' ? 'default' : 
            'secondary'
          }>
            {urgency === 'critical' ? 'Urgent' : urgency === 'moderate' ? 'Moderate' : 'Low Priority'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            <span>{new Date(reading.readingDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Crop className="h-4 w-4" />
            <span>{segment?.area} {segment?.areaUnit}</span>
          </div>
        </div>

        {/* Reading and Recommendation */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-muted p-4 text-center">
            <Gauge className="h-5 w-5 mx-auto mb-2 text-primary" />
            <p className="text-2xl font-bold text-foreground">{reading.reading}</p>
            <p className="text-xs text-muted-foreground">N-Tester Reading</p>
          </div>
          <div className={cn(
            'rounded-xl p-4 text-center',
            urgency === 'critical' && 'bg-nutrient-low/10',
            urgency === 'moderate' && 'bg-accent/20',
            urgency === 'low' && 'bg-nutrient-optimal/10',
          )}>
            <Droplets className={cn(
              'h-5 w-5 mx-auto mb-2',
              urgency === 'critical' && 'text-nutrient-low',
              urgency === 'moderate' && 'text-accent',
              urgency === 'low' && 'text-nutrient-optimal',
            )} />
            <p className={cn(
              'text-2xl font-bold',
              urgency === 'critical' && 'text-nutrient-low',
              urgency === 'moderate' && 'text-accent-foreground',
              urgency === 'low' && 'text-nutrient-optimal',
            )}>
              {reading.recommendedTopUp}
            </p>
            <p className="text-xs text-muted-foreground">{reading.topUpUnit}</p>
          </div>
        </div>

        {/* Visual indicator bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>N-Tester Scale</span>
            <span>{reading.reading}/700+</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-nutrient-low via-accent to-nutrient-optimal transition-all duration-500"
              style={{ width: `${Math.min(100, (reading.reading / 700) * 100)}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
