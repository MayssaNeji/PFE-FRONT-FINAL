import { Agence } from 'Models/Agence';
import { Station } from './Station';

export interface Circuit {
  refSapLeoni?: string;
  refChemin?: string;
  nbKm?: number;
  contributionEmploye?: number;
  coutKm?: number;
  pointArrivee?: string;
  agence: string;
  id?: number;
  agenceNavigation?: Agence;
  Station?:Station;
}
