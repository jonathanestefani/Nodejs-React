import { IRuralProducerCrops } from "./IRuralProducerCrops";

export interface IRuralProducer {
  id?: BigInt | number;
  producer_name: string;
  farm_name: string;
  inscrition: string;
  city_id: number;
  state_id: number;

  crops?: IRuralProducerCrops[];

  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}