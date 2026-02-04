import { useState } from 'react';
import { ChevronRight, Globe, MapPin, User, Users, Crop } from 'lucide-react';
import { cn } from '@/lib/utils';
import { countries, regions, agronomists, landOwners, landSegments } from '@/data/mockData';

interface HierarchyNavProps {
  onSelectionChange?: (selection: {
    country?: string;
    region?: string;
    agronomist?: string;
    landOwner?: string;
    landSegment?: string;
  }) => void;
}

export function HierarchyNav({ onSelectionChange }: HierarchyNavProps) {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedAgronomist, setSelectedAgronomist] = useState<string | null>(null);
  const [selectedLandOwner, setSelectedLandOwner] = useState<string | null>(null);
  const [selectedLandSegment, setSelectedLandSegment] = useState<string | null>(null);

  const filteredRegions = regions.filter(r => r.countryId === selectedCountry);
  const filteredAgronomists = agronomists.filter(a => a.regionId === selectedRegion);
  const filteredLandOwners = landOwners.filter(lo => lo.agronomistId === selectedAgronomist);
  const filteredLandSegments = landSegments.filter(ls => ls.landOwnerId === selectedLandOwner);

  const handleCountrySelect = (countryId: string) => {
    setSelectedCountry(countryId);
    setSelectedRegion(null);
    setSelectedAgronomist(null);
    setSelectedLandOwner(null);
    setSelectedLandSegment(null);
    onSelectionChange?.({ country: countryId });
  };

  const handleRegionSelect = (regionId: string) => {
    setSelectedRegion(regionId);
    setSelectedAgronomist(null);
    setSelectedLandOwner(null);
    setSelectedLandSegment(null);
    onSelectionChange?.({ country: selectedCountry!, region: regionId });
  };

  const handleAgronomistSelect = (agronomistId: string) => {
    setSelectedAgronomist(agronomistId);
    setSelectedLandOwner(null);
    setSelectedLandSegment(null);
    onSelectionChange?.({ 
      country: selectedCountry!, 
      region: selectedRegion!, 
      agronomist: agronomistId 
    });
  };

  const handleLandOwnerSelect = (landOwnerId: string) => {
    setSelectedLandOwner(landOwnerId);
    setSelectedLandSegment(null);
    onSelectionChange?.({ 
      country: selectedCountry!, 
      region: selectedRegion!, 
      agronomist: selectedAgronomist!,
      landOwner: landOwnerId
    });
  };

  const handleLandSegmentSelect = (landSegmentId: string) => {
    setSelectedLandSegment(landSegmentId);
    onSelectionChange?.({ 
      country: selectedCountry!, 
      region: selectedRegion!, 
      agronomist: selectedAgronomist!,
      landOwner: selectedLandOwner!,
      landSegment: landSegmentId
    });
  };

  return (
    <div className="flex gap-4 overflow-x-auto pb-2">
      {/* Countries */}
      <div className="min-w-48 flex-shrink-0">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
          <Globe className="h-4 w-4" />
          <span>Country</span>
        </div>
        <div className="space-y-1">
          {countries.map(country => (
            <button
              key={country.id}
              onClick={() => handleCountrySelect(country.id)}
              className={cn(
                'w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all',
                selectedCountry === country.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card hover:bg-muted border border-border'
              )}
            >
              <span>{country.name}</span>
              {selectedCountry === country.id && <ChevronRight className="h-4 w-4" />}
            </button>
          ))}
        </div>
      </div>

      {/* Regions */}
      {selectedCountry && (
        <div className="min-w-48 flex-shrink-0 animate-fade-in">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
            <MapPin className="h-4 w-4" />
            <span>Region</span>
          </div>
          <div className="space-y-1">
            {filteredRegions.map(region => (
              <button
                key={region.id}
                onClick={() => handleRegionSelect(region.id)}
                className={cn(
                  'w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all',
                  selectedRegion === region.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card hover:bg-muted border border-border'
                )}
              >
                <span>{region.name}</span>
                {selectedRegion === region.id && <ChevronRight className="h-4 w-4" />}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Agronomists */}
      {selectedRegion && (
        <div className="min-w-52 flex-shrink-0 animate-fade-in">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
            <User className="h-4 w-4" />
            <span>Agronomist</span>
          </div>
          <div className="space-y-1">
            {filteredAgronomists.map(agronomist => (
              <button
                key={agronomist.id}
                onClick={() => handleAgronomistSelect(agronomist.id)}
                className={cn(
                  'w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all',
                  selectedAgronomist === agronomist.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card hover:bg-muted border border-border'
                )}
              >
                <span className="truncate">{agronomist.name}</span>
                {selectedAgronomist === agronomist.id && <ChevronRight className="h-4 w-4" />}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Land Owners */}
      {selectedAgronomist && (
        <div className="min-w-48 flex-shrink-0 animate-fade-in">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
            <Users className="h-4 w-4" />
            <span>Land Owner</span>
          </div>
          <div className="space-y-1">
            {filteredLandOwners.map(owner => (
              <button
                key={owner.id}
                onClick={() => handleLandOwnerSelect(owner.id)}
                className={cn(
                  'w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all',
                  selectedLandOwner === owner.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card hover:bg-muted border border-border'
                )}
              >
                <span className="truncate">{owner.name}</span>
                {selectedLandOwner === owner.id && <ChevronRight className="h-4 w-4" />}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Land Segments */}
      {selectedLandOwner && (
        <div className="min-w-56 flex-shrink-0 animate-fade-in">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
            <Crop className="h-4 w-4" />
            <span>Land Segment</span>
          </div>
          <div className="space-y-1">
            {filteredLandSegments.map(segment => (
              <button
                key={segment.id}
                onClick={() => handleLandSegmentSelect(segment.id)}
                className={cn(
                  'w-full flex flex-col items-start px-3 py-2 rounded-lg text-sm transition-all',
                  selectedLandSegment === segment.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card hover:bg-muted border border-border'
                )}
              >
                <span className="font-medium truncate w-full">{segment.name}</span>
                <span className={cn(
                  'text-xs',
                  selectedLandSegment === segment.id 
                    ? 'text-primary-foreground/70' 
                    : 'text-muted-foreground'
                )}>
                  {segment.crop} • {segment.area} {segment.areaUnit}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
