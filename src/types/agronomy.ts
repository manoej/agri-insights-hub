export interface Country {
  id: string;
  name: string;
  code: string;
}

export interface Region {
  id: string;
  countryId: string;
  name: string;
}

export interface Agronomist {
  id: string;
  regionId: string;
  name: string;
  email: string;
}

export interface LandOwner {
  id: string;
  agronomistId: string;
  name: string;
  contactNumber?: string;
}

export interface LandSegment {
  id: string;
  landOwnerId: string;
  name: string;
  area: number;
  areaUnit: 'hectares' | 'acres';
  crop: string;
  cultivationType?: string;
}

export interface NutrientRange {
  nutrient: string;
  lowGrade: number;
  highGrade: number;
  unit: string;
}

export interface LeafSample {
  id: string;
  landSegmentId: string;
  sampleDate: string;
  crop: string;
  plantPart: string;
  nutrients: NutrientValue[];
  status: 'pending' | 'analyzed';
}

export interface NutrientValue {
  nutrient: string;
  value: number;
  unit: string;
  status: 'optimal' | 'low' | 'high';
}

export interface NTesterReading {
  id: string;
  landSegmentId: string;
  readingDate: string;
  reading: number;
  crop: string;
  cultivationType: string;
  recommendedTopUp: number;
  topUpUnit: string;
}

export type HierarchyLevel = 'country' | 'region' | 'agronomist' | 'landOwner' | 'landSegment';

export interface BreadcrumbItem {
  level: HierarchyLevel;
  id: string;
  name: string;
}
