import { Station } from "./Station";
import { PlanSegment } from "./PlanSegment";
import { Segment } from "./Segment";
import { Shift } from "./Shift";
export interface Employe {
    matricule: number;
   
    nom?: string;
    prenom?: string;
    contreMaitre?: string;
    nomDuGroupe?: string;
    ps?: string;
    telephone?: number;
    centreDeCout?: string;
    station?: string;
    segment?: string;
    shift?: string;
    planSegments?: PlanSegment[];
    segmentNavigation?: Segment;
    shiftNavigation?: Shift;
    stationNavigation?: Station;
  }