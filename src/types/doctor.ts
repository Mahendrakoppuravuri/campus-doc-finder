
export interface Doctor {
  id: number;
  name: string;
  specialty: string[];
  experience: number;
  fees: number;
  videoConsult: boolean;
  inClinic: boolean;
  image: string;
  expertise?: string;
  rating?: number;
}
