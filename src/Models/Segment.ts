import { Employe } from "./Employe";
import { PlanSegment } from "./PlanSegment";

export interface Segment {
    nom: string;
    centreDeCout: string;
    nomSegSapRef: string;
    rhSegment: string;
    chefDeSegment: string;
    id?: number;
    Employes?:Employe;
    PlanSegments?:PlanSegment;
    }
  