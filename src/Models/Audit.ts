
import { Chauffeur } from "./Chauffeur";
export interface Audit {
    id?: number;
    bus: string | null;
    dateAudit: Date | null;
    commentaires?: string | null;
    resultat: string | null;
    nomAuditeur: string | null;
    personneAuditee: string | null;

    feux: boolean;
    maintenance: boolean;
    chaises: boolean;
    pneux: boolean;
    vitres: boolean;
    assurance: boolean;
    carteProfessionelle: boolean;
    contratLeoni: boolean;
    horraires: boolean;
    comportements: boolean;
    personneAuditeeNavigation?: Chauffeur | null;
  }
  
 
  