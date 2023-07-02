import { Audit } from "./Audit";
import { Agence } from "./Agence";
export interface Chauffeur {
    nom: string;
    prenom: string;
    dateDeNaissance?: Date;
    telephone: number;
    agence?: string;
    id?: number;
    agenceNavigation?: Agence;
    Audits?:Audit[];
  }
  
 