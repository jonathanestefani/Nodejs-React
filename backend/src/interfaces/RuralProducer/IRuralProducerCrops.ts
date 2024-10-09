export interface IRuralProducerCrops {
  id?: BigInt | number;
  rural_producer_id?: BigInt | number;
  type: string;
  total_area: number;
  agricultural_area_hectares: number;
  vegetation_area_hectares: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}