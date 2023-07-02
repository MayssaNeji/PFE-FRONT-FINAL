
import { Employe } from "./Employe";
import { Circuit } from "./Circuit";
export interface Station {
    referenceRegion?: string;
    refSapLeoni: string;
    longitude?: number;
    latitude?: number;
    rayon?: number;
    id?: number;

    
    employes?: Employe[];
    refSapLeoniNavigation?: Circuit;
  }
  