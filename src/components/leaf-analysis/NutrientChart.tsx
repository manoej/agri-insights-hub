import { NutrientValue, NutrientRange } from '@/types/agronomy';
import { cn } from '@/lib/utils';

interface NutrientChartProps {
  nutrients: NutrientValue[];
  ranges?: NutrientRange[];
}

export function NutrientChart({ nutrients }: NutrientChartProps) {
  const getStatusColor = (status: NutrientValue['status']) => {
    switch (status) {
      case 'optimal':
        return 'bg-nutrient-optimal';
      case 'low':
        return 'bg-nutrient-low';
      case 'high':
        return 'bg-nutrient-high';
    }
  };

  const getStatusLabel = (status: NutrientValue['status']) => {
    switch (status) {
      case 'optimal':
        return 'Within Range';
      case 'low':
        return 'Below Range';
      case 'high':
        return 'Above Range';
    }
  };

  return (
    <div className="space-y-4">
      {/* Legend */}
      <div className="flex items-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-nutrient-optimal" />
          <span className="text-muted-foreground">Within Range</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-nutrient-low" />
          <span className="text-muted-foreground">Below Range</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-nutrient-high" />
          <span className="text-muted-foreground">Above Range</span>
        </div>
      </div>

      {/* Nutrient bars */}
      <div className="grid gap-3">
        {nutrients.map((nutrient, index) => (
          <div 
            key={nutrient.nutrient} 
            className="flex items-center gap-4 animate-slide-up"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="w-32 text-sm font-medium text-foreground truncate">
              {nutrient.nutrient}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <div className="flex-1 h-8 bg-muted rounded-lg overflow-hidden relative">
                  <div 
                    className={cn(
                      'h-full rounded-lg transition-all duration-700 ease-out flex items-center justify-end pr-2',
                      getStatusColor(nutrient.status)
                    )}
                    style={{ 
                      width: `${Math.min(100, (nutrient.value / (nutrient.unit === '%' ? 5 : 300)) * 100)}%`,
                      minWidth: '60px'
                    }}
                  >
                    <span className="text-xs font-semibold text-white">
                      {nutrient.value} {nutrient.unit}
                    </span>
                  </div>
                </div>
                <div className={cn(
                  'w-24 text-xs font-medium px-2 py-1 rounded-full text-center',
                  nutrient.status === 'optimal' && 'bg-nutrient-optimal/10 text-nutrient-optimal',
                  nutrient.status === 'low' && 'bg-nutrient-low/10 text-nutrient-low',
                  nutrient.status === 'high' && 'bg-nutrient-high/10 text-nutrient-high',
                )}>
                  {getStatusLabel(nutrient.status)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
