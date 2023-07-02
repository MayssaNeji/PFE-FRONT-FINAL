
import { Employe } from "./Employe";
export interface Shift {
    referenceShift: string;
    lundi?: string;
    mardi?: string;
    mercredi?: string;
    jeudi?: string;
    vendredi?: string;
    samedi?: string;
    dimanche?: string;
    employes?: Employe[];
  }
  