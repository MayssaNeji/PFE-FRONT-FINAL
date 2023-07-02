import { Chauffeur } from 'Models/Chauffeur';
import { Circuit } from './Circuit';
import { Vehicule } from './Vehicule';


export interface Agence {
  nom: string;
  id? :number;
  adresse: string;
  telephone: number;
  matriculeFiscale: number;
  siteInternet?: string;
  email?: string;
  chauffeurs?: Chauffeur[];
  Vehicules?: Vehicule[];
  Circuits?: Circuit[];
 
}