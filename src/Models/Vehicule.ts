import { Agence } from 'Models/Agence';

export interface Vehicule {
  nomDeReference?: string;
  type?: string;
  agence?: string;
  dateDeMiseEnRoute?: Date;
  capacite?: number;
  numSerie?: string;
  id?: number;
  agenceNavigation?: Agence;
}
