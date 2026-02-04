import { MainLayout } from '@/components/layout/MainLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { HierarchyNav } from '@/components/dashboard/HierarchyNav';
import { LeafSampleCard } from '@/components/leaf-analysis/LeafSampleCard';
import { NTesterReadingCard } from '@/components/n-tester/NTesterReadingCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Leaf, 
  TestTube, 
  MapPin, 
  Users,
  Plus,
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { leafSamples, nTesterReadings, landSegments, landOwners } from '@/data/mockData';
import { useState } from 'react';
import { LeafSample } from '@/types/agronomy';
import { Link } from 'react-router-dom';

const Index = () => {
  const [selectedSample, setSelectedSample] = useState<LeafSample | null>(null);

  // Stats calculations
  const totalSegments = landSegments.length;
  const totalOwners = landOwners.length;
  const analyzedSamples = leafSamples.filter(s => s.status === 'analyzed').length;
  const recentReadings = nTesterReadings.length;

  const handleViewDetails = (sample: LeafSample) => {
    setSelectedSample(sample);
  };

  return (
    <MainLayout title="Dashboard">
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary/80 p-8 text-primary-foreground">
          <div className="relative z-10">
            <h2 className="font-display text-2xl font-bold mb-2">
              Welcome back, Dr. Priya Sharma
            </h2>
            <p className="text-primary-foreground/80 max-w-lg">
              Monitor crop health, analyze leaf samples, and manage nitrogen top-up recommendations across your assigned regions.
            </p>
            <div className="flex gap-3 mt-6">
              <Button variant="secondary" asChild>
                <Link to="/leaf-analysis">
                  <Leaf className="h-4 w-4 mr-2" />
                  New Leaf Analysis
                </Link>
              </Button>
              <Button variant="ghost" className="bg-primary-foreground/10 hover:bg-primary-foreground/20" asChild>
                <Link to="/n-tester">
                  <TestTube className="h-4 w-4 mr-2" />
                  N-Tester Reading
                </Link>
              </Button>
            </div>
          </div>
          <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-primary-foreground/5 to-transparent" />
          <Leaf className="absolute right-8 top-1/2 -translate-y-1/2 h-32 w-32 text-primary-foreground/10" />
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Land Segments"
            value={totalSegments}
            subtitle="Active segments"
            icon={MapPin}
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Land Owners"
            value={totalOwners}
            subtitle="Under management"
            icon={Users}
            trend={{ value: 8, isPositive: true }}
          />
          <StatCard
            title="Leaf Samples"
            value={analyzedSamples}
            subtitle="Analyzed this month"
            icon={Leaf}
            trend={{ value: 23, isPositive: true }}
          />
          <StatCard
            title="N-Tester Readings"
            value={recentReadings}
            subtitle="Recent readings"
            icon={TestTube}
            trend={{ value: 5, isPositive: false }}
          />
        </div>

        {/* Hierarchy Navigation */}
        <Card className="border-border/50">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="font-display text-lg">Navigate Hierarchy</CardTitle>
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                <TrendingUp className="h-4 w-4 mr-1.5" />
                View Analytics
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <HierarchyNav 
              onSelectionChange={(selection) => {
                console.log('Selection changed:', selection);
              }}
            />
          </CardContent>
        </Card>

        {/* Recent Activity Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Leaf Samples */}
          <Card className="border-border/50">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="font-display text-lg flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-primary" />
                  Recent Leaf Samples
                </CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/leaf-analysis">
                    View All <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {leafSamples.slice(0, 2).map(sample => (
                <LeafSampleCard 
                  key={sample.id} 
                  sample={sample} 
                  onViewDetails={handleViewDetails}
                />
              ))}
              <Button variant="outline" className="w-full" asChild>
                <Link to="/leaf-analysis">
                  <Plus className="h-4 w-4 mr-2" />
                  Upload New Sample
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Recent N-Tester Readings */}
          <Card className="border-border/50">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="font-display text-lg flex items-center gap-2">
                  <TestTube className="h-5 w-5 text-primary" />
                  N-Tester Readings
                </CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/n-tester">
                    View All <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {nTesterReadings.slice(0, 2).map(reading => (
                <NTesterReadingCard key={reading.id} reading={reading} />
              ))}
              <Button variant="outline" className="w-full" asChild>
                <Link to="/n-tester">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Reading
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
