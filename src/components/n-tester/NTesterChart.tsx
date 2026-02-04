import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts';
import { NTesterReading } from '@/types/agronomy';
import { landSegments } from '@/data/mockData';

interface NTesterChartProps {
  readings: NTesterReading[];
}

export function NTesterChart({ readings }: NTesterChartProps) {
  const chartData = readings.map(reading => {
    const segment = landSegments.find(s => s.id === reading.landSegmentId);
    return {
      name: segment?.name?.split(' - ')[0] || 'Unknown',
      reading: reading.reading,
      topUp: reading.recommendedTopUp,
    };
  });

  const getBarColor = (topUp: number) => {
    if (topUp >= 70) return 'hsl(0 72% 51%)';
    if (topUp >= 40) return 'hsl(42 85% 55%)';
    return 'hsl(142 70% 45%)';
  };

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="name" 
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            axisLine={{ stroke: 'hsl(var(--border))' }}
          />
          <YAxis 
            yAxisId="left"
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            axisLine={{ stroke: 'hsl(var(--border))' }}
            label={{ value: 'N-Tester Reading', angle: -90, position: 'insideLeft', fill: 'hsl(var(--muted-foreground))' }}
          />
          <YAxis 
            yAxisId="right" 
            orientation="right"
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            axisLine={{ stroke: 'hsl(var(--border))' }}
            label={{ value: 'N Top-up (kg/ha)', angle: 90, position: 'insideRight', fill: 'hsl(var(--muted-foreground))' }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'hsl(var(--card))', 
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}
            labelStyle={{ color: 'hsl(var(--foreground))' }}
          />
          <Legend />
          <Bar 
            yAxisId="left" 
            dataKey="reading" 
            name="N-Tester Reading" 
            fill="hsl(var(--primary))" 
            radius={[4, 4, 0, 0]}
          />
          <Bar 
            yAxisId="right" 
            dataKey="topUp" 
            name="N Top-up (kg/ha)" 
            radius={[4, 4, 0, 0]}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(entry.topUp)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
