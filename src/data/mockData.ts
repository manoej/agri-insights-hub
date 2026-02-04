import { Country, Region, Agronomist, LandOwner, LandSegment, LeafSample, NTesterReading, NutrientRange } from '@/types/agronomy';

export const countries: Country[] = [
  { id: 'c1', name: 'India', code: 'IN' },
  { id: 'c2', name: 'United States', code: 'US' },
];

export const regions: Region[] = [
  { id: 'r1', countryId: 'c1', name: 'Maharashtra' },
  { id: 'r2', countryId: 'c1', name: 'Punjab' },
  { id: 'r3', countryId: 'c2', name: 'California' },
];

export const agronomists: Agronomist[] = [
  { id: 'a1', regionId: 'r1', name: 'Dr. Priya Sharma', email: 'priya.sharma@eihl.com' },
  { id: 'a2', regionId: 'r1', name: 'Rajesh Kumar', email: 'rajesh.kumar@eihl.com' },
  { id: 'a3', regionId: 'r2', name: 'Harpreet Singh', email: 'harpreet.singh@eihl.com' },
  { id: 'a4', regionId: 'r3', name: 'John Miller', email: 'john.miller@eihl.com' },
];

export const landOwners: LandOwner[] = [
  { id: 'lo1', agronomistId: 'a1', name: 'Ramesh Patil', contactNumber: '+91 98765 43210' },
  { id: 'lo2', agronomistId: 'a1', name: 'Suresh Deshmukh', contactNumber: '+91 98765 43211' },
  { id: 'lo3', agronomistId: 'a2', name: 'Ganesh Kulkarni', contactNumber: '+91 98765 43212' },
  { id: 'lo4', agronomistId: 'a3', name: 'Gurpreet Kaur', contactNumber: '+91 98765 43213' },
  { id: 'lo5', agronomistId: 'a4', name: 'Robert Johnson', contactNumber: '+1 555 123 4567' },
];

export const landSegments: LandSegment[] = [
  { id: 'ls1', landOwnerId: 'lo1', name: 'North Field - Block A', area: 15.5, areaUnit: 'hectares', crop: 'Sugarcane', cultivationType: 'Irrigated' },
  { id: 'ls2', landOwnerId: 'lo1', name: 'South Field - Block B', area: 12.3, areaUnit: 'hectares', crop: 'Cotton', cultivationType: 'Rainfed' },
  { id: 'ls3', landOwnerId: 'lo2', name: 'East Orchard', area: 8.7, areaUnit: 'hectares', crop: 'Mango', cultivationType: 'Drip Irrigation' },
  { id: 'ls4', landOwnerId: 'lo3', name: 'Vineyard Plot 1', area: 5.2, areaUnit: 'hectares', crop: 'Grapes', cultivationType: 'Drip Irrigation' },
  { id: 'ls5', landOwnerId: 'lo4', name: 'Wheat Field Alpha', area: 25.0, areaUnit: 'hectares', crop: 'Wheat', cultivationType: 'Irrigated' },
  { id: 'ls6', landOwnerId: 'lo5', name: 'Almond Grove West', area: 50.0, areaUnit: 'acres', crop: 'Almonds', cultivationType: 'Drip Irrigation' },
];

export const nutrientRanges: Record<string, Record<string, NutrientRange[]>> = {
  'Sugarcane': {
    'Leaf': [
      { nutrient: 'Nitrogen (N)', lowGrade: 1.8, highGrade: 2.5, unit: '%' },
      { nutrient: 'Phosphorus (P)', lowGrade: 0.15, highGrade: 0.25, unit: '%' },
      { nutrient: 'Potassium (K)', lowGrade: 1.2, highGrade: 1.8, unit: '%' },
      { nutrient: 'Calcium (Ca)', lowGrade: 0.2, highGrade: 0.5, unit: '%' },
      { nutrient: 'Magnesium (Mg)', lowGrade: 0.1, highGrade: 0.3, unit: '%' },
      { nutrient: 'Sulfur (S)', lowGrade: 0.12, highGrade: 0.2, unit: '%' },
      { nutrient: 'Iron (Fe)', lowGrade: 50, highGrade: 200, unit: 'ppm' },
      { nutrient: 'Zinc (Zn)', lowGrade: 15, highGrade: 50, unit: 'ppm' },
      { nutrient: 'Manganese (Mn)', lowGrade: 20, highGrade: 150, unit: 'ppm' },
      { nutrient: 'Boron (B)', lowGrade: 10, highGrade: 50, unit: 'ppm' },
    ],
  },
  'Cotton': {
    'Leaf': [
      { nutrient: 'Nitrogen (N)', lowGrade: 3.0, highGrade: 4.5, unit: '%' },
      { nutrient: 'Phosphorus (P)', lowGrade: 0.25, highGrade: 0.5, unit: '%' },
      { nutrient: 'Potassium (K)', lowGrade: 1.5, highGrade: 2.5, unit: '%' },
      { nutrient: 'Calcium (Ca)', lowGrade: 1.5, highGrade: 3.0, unit: '%' },
      { nutrient: 'Magnesium (Mg)', lowGrade: 0.3, highGrade: 0.8, unit: '%' },
      { nutrient: 'Sulfur (S)', lowGrade: 0.2, highGrade: 0.4, unit: '%' },
      { nutrient: 'Iron (Fe)', lowGrade: 50, highGrade: 300, unit: 'ppm' },
      { nutrient: 'Zinc (Zn)', lowGrade: 20, highGrade: 60, unit: 'ppm' },
      { nutrient: 'Manganese (Mn)', lowGrade: 25, highGrade: 200, unit: 'ppm' },
      { nutrient: 'Boron (B)', lowGrade: 25, highGrade: 75, unit: 'ppm' },
    ],
  },
  'Wheat': {
    'Leaf': [
      { nutrient: 'Nitrogen (N)', lowGrade: 2.5, highGrade: 4.0, unit: '%' },
      { nutrient: 'Phosphorus (P)', lowGrade: 0.2, highGrade: 0.4, unit: '%' },
      { nutrient: 'Potassium (K)', lowGrade: 1.5, highGrade: 3.0, unit: '%' },
      { nutrient: 'Calcium (Ca)', lowGrade: 0.2, highGrade: 0.6, unit: '%' },
      { nutrient: 'Magnesium (Mg)', lowGrade: 0.15, highGrade: 0.5, unit: '%' },
      { nutrient: 'Sulfur (S)', lowGrade: 0.15, highGrade: 0.35, unit: '%' },
      { nutrient: 'Iron (Fe)', lowGrade: 25, highGrade: 100, unit: 'ppm' },
      { nutrient: 'Zinc (Zn)', lowGrade: 15, highGrade: 70, unit: 'ppm' },
      { nutrient: 'Manganese (Mn)', lowGrade: 25, highGrade: 100, unit: 'ppm' },
      { nutrient: 'Boron (B)', lowGrade: 5, highGrade: 25, unit: 'ppm' },
    ],
  },
};

export const leafSamples: LeafSample[] = [
  {
    id: 'sample1',
    landSegmentId: 'ls1',
    sampleDate: '2024-01-15',
    crop: 'Sugarcane',
    plantPart: 'Leaf',
    status: 'analyzed',
    nutrients: [
      { nutrient: 'Nitrogen (N)', value: 2.1, unit: '%', status: 'optimal' },
      { nutrient: 'Phosphorus (P)', value: 0.12, unit: '%', status: 'low' },
      { nutrient: 'Potassium (K)', value: 1.5, unit: '%', status: 'optimal' },
      { nutrient: 'Calcium (Ca)', value: 0.35, unit: '%', status: 'optimal' },
      { nutrient: 'Magnesium (Mg)', value: 0.22, unit: '%', status: 'optimal' },
      { nutrient: 'Sulfur (S)', value: 0.25, unit: '%', status: 'high' },
      { nutrient: 'Iron (Fe)', value: 120, unit: 'ppm', status: 'optimal' },
      { nutrient: 'Zinc (Zn)', value: 12, unit: 'ppm', status: 'low' },
      { nutrient: 'Manganese (Mn)', value: 85, unit: 'ppm', status: 'optimal' },
      { nutrient: 'Boron (B)', value: 28, unit: 'ppm', status: 'optimal' },
    ],
  },
  {
    id: 'sample2',
    landSegmentId: 'ls2',
    sampleDate: '2024-01-18',
    crop: 'Cotton',
    plantPart: 'Leaf',
    status: 'analyzed',
    nutrients: [
      { nutrient: 'Nitrogen (N)', value: 3.8, unit: '%', status: 'optimal' },
      { nutrient: 'Phosphorus (P)', value: 0.35, unit: '%', status: 'optimal' },
      { nutrient: 'Potassium (K)', value: 1.2, unit: '%', status: 'low' },
      { nutrient: 'Calcium (Ca)', value: 2.2, unit: '%', status: 'optimal' },
      { nutrient: 'Magnesium (Mg)', value: 0.55, unit: '%', status: 'optimal' },
      { nutrient: 'Sulfur (S)', value: 0.28, unit: '%', status: 'optimal' },
      { nutrient: 'Iron (Fe)', value: 180, unit: 'ppm', status: 'optimal' },
      { nutrient: 'Zinc (Zn)', value: 75, unit: 'ppm', status: 'high' },
      { nutrient: 'Manganese (Mn)', value: 110, unit: 'ppm', status: 'optimal' },
      { nutrient: 'Boron (B)', value: 45, unit: 'ppm', status: 'optimal' },
    ],
  },
  {
    id: 'sample3',
    landSegmentId: 'ls5',
    sampleDate: '2024-01-20',
    crop: 'Wheat',
    plantPart: 'Leaf',
    status: 'analyzed',
    nutrients: [
      { nutrient: 'Nitrogen (N)', value: 2.2, unit: '%', status: 'low' },
      { nutrient: 'Phosphorus (P)', value: 0.32, unit: '%', status: 'optimal' },
      { nutrient: 'Potassium (K)', value: 2.1, unit: '%', status: 'optimal' },
      { nutrient: 'Calcium (Ca)', value: 0.4, unit: '%', status: 'optimal' },
      { nutrient: 'Magnesium (Mg)', value: 0.28, unit: '%', status: 'optimal' },
      { nutrient: 'Sulfur (S)', value: 0.22, unit: '%', status: 'optimal' },
      { nutrient: 'Iron (Fe)', value: 65, unit: 'ppm', status: 'optimal' },
      { nutrient: 'Zinc (Zn)', value: 42, unit: 'ppm', status: 'optimal' },
      { nutrient: 'Manganese (Mn)', value: 55, unit: 'ppm', status: 'optimal' },
      { nutrient: 'Boron (B)', value: 12, unit: 'ppm', status: 'optimal' },
    ],
  },
];

export const nTesterReadings: NTesterReading[] = [
  { id: 'nt1', landSegmentId: 'ls1', readingDate: '2024-01-15', reading: 520, crop: 'Sugarcane', cultivationType: 'Irrigated', recommendedTopUp: 45, topUpUnit: 'kg N/ha' },
  { id: 'nt2', landSegmentId: 'ls2', readingDate: '2024-01-16', reading: 380, crop: 'Cotton', cultivationType: 'Rainfed', recommendedTopUp: 65, topUpUnit: 'kg N/ha' },
  { id: 'nt3', landSegmentId: 'ls5', readingDate: '2024-01-18', reading: 450, crop: 'Wheat', cultivationType: 'Irrigated', recommendedTopUp: 55, topUpUnit: 'kg N/ha' },
  { id: 'nt4', landSegmentId: 'ls1', readingDate: '2024-01-25', reading: 580, crop: 'Sugarcane', cultivationType: 'Irrigated', recommendedTopUp: 35, topUpUnit: 'kg N/ha' },
  { id: 'nt5', landSegmentId: 'ls5', readingDate: '2024-01-28', reading: 510, crop: 'Wheat', cultivationType: 'Irrigated', recommendedTopUp: 40, topUpUnit: 'kg N/ha' },
];

// N-Tester to N Top-up mapping master data
export const nTesterMappings: Record<string, Record<string, { minReading: number; maxReading: number; topUp: number }[]>> = {
  'Sugarcane': {
    'Irrigated': [
      { minReading: 0, maxReading: 400, topUp: 80 },
      { minReading: 401, maxReading: 450, topUp: 65 },
      { minReading: 451, maxReading: 500, topUp: 50 },
      { minReading: 501, maxReading: 550, topUp: 40 },
      { minReading: 551, maxReading: 600, topUp: 30 },
      { minReading: 601, maxReading: 700, topUp: 15 },
      { minReading: 701, maxReading: 999, topUp: 0 },
    ],
    'Rainfed': [
      { minReading: 0, maxReading: 400, topUp: 60 },
      { minReading: 401, maxReading: 450, topUp: 50 },
      { minReading: 451, maxReading: 500, topUp: 40 },
      { minReading: 501, maxReading: 550, topUp: 30 },
      { minReading: 551, maxReading: 600, topUp: 20 },
      { minReading: 601, maxReading: 700, topUp: 10 },
      { minReading: 701, maxReading: 999, topUp: 0 },
    ],
  },
  'Wheat': {
    'Irrigated': [
      { minReading: 0, maxReading: 350, topUp: 90 },
      { minReading: 351, maxReading: 400, topUp: 75 },
      { minReading: 401, maxReading: 450, topUp: 60 },
      { minReading: 451, maxReading: 500, topUp: 45 },
      { minReading: 501, maxReading: 550, topUp: 35 },
      { minReading: 551, maxReading: 600, topUp: 25 },
      { minReading: 601, maxReading: 999, topUp: 0 },
    ],
  },
  'Cotton': {
    'Rainfed': [
      { minReading: 0, maxReading: 320, topUp: 85 },
      { minReading: 321, maxReading: 380, topUp: 70 },
      { minReading: 381, maxReading: 420, topUp: 55 },
      { minReading: 421, maxReading: 480, topUp: 40 },
      { minReading: 481, maxReading: 550, topUp: 25 },
      { minReading: 551, maxReading: 999, topUp: 0 },
    ],
  },
};

export const crops = ['Sugarcane', 'Cotton', 'Wheat', 'Mango', 'Grapes', 'Almonds'];
export const plantParts = ['Leaf', 'Petiole', 'Stem', 'Root'];
export const cultivationTypes = ['Irrigated', 'Rainfed', 'Drip Irrigation', 'Sprinkler'];
