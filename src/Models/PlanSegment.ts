import { Employe } from "./Employe";
import { Segment } from "./Segment";
export interface PlanSegment {
    matricule?: number;
    id?: number;
    nom?: string;
    prenom?: string;
    samedi?: string;
    dimanche?: string;
    lundi?: string;
    mardi?: string;
    mercredi?: string;
    jeudi?: string;
    vendredi?: string;
    segment?: string;
    refSemaine: string;
    shift?: string;
    Annee?: number;
    Mois?: number;
    matriculeNavigation?: Employe;
    segmentNavigation?: Segment;
  }
  
