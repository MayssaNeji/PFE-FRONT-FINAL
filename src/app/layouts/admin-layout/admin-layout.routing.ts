import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';

import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';

import { GestionChauffeurComponent } from 'app/gestion-chauffeur/gestion-chauffeur.component';
import { AuditComponent } from 'app/audit/audit.component';
import { GestionVehiculeComponent } from 'app/gestion-vehicule/gestion-vehicule.component';
import { GestionCircuitComponent } from 'app/gestion-circuit/gestion-circuit.component';
import { GestionStationComponent } from 'app/gestion-station/gestion-station.component';
import { ShiftsComponent } from 'app/shifts/shifts.component';
import { GestionSegmentComponent } from 'app/gestion-segment/gestion-segment.component';
import { GestionAgenceComponent } from 'app/gestion-agence/gestion-agence.component';

import { AddStationComponent } from 'app/gestion-station/add-station/add-station.component';
import { AddCircuitComponent } from 'app/gestion-circuit/add-circuit/add-circuit.component';
import { AddSegmentComponent } from 'app/gestion-segment/add-segment/add-segment.component';
import { AddChauffeurComponent } from 'app/gestion-chauffeur/add-chauffeur/add-chauffeur.component';
import { AddVehiculeComponent } from 'app/gestion-vehicule/add-vehicule/add-vehicule.component';
import { CalendrierComponent } from 'app/calendrier/calendrier.component';
import { CotisationComponent } from 'app/cotisation/cotisation.component';
import { EtatAuditComponent } from 'app/etat-audit/etat-audit.component';
import { PlanSegmentComponent } from 'app/plan-segment/plan-segment.component';
import { AddPlanSegmentComponent } from 'app/plan-segment/add-plan-segment/add-plan-segment.component';
import { AddAgenceComponent } from 'app/gestion-agence/add-agence/add-agence.component';
import { AddShiftComponent } from 'app/shifts/add-shift/add-shift.component';
import { PresenceBusComponent } from 'app/presence-bus/presence-bus.component';
import { AffecterRoleComponent } from 'app/affecter-role/affecter-role.component';
import { EditRoleComponent } from 'app/affecter-role/edit-role/edit-role.component';
import { EditChauffeurComponent } from 'app/gestion-chauffeur/edit-chauffeur/edit-chauffeur.component';
import { ListePointageComponent } from 'app/liste-pointage/liste-pointage.component';
import { ArriveeBusComponent } from 'app/arrivee-bus/arrivee-bus.component';
import { ViewDetAuditComponent } from 'app/etat-audit/view-det-audit/view-det-audit.component';
import { ImportEmployeComponent } from 'app/import-employe/import-employe.component';
import { EditCircuitComponent } from 'app/gestion-circuit/edit-circuit/edit-circuit.component';
import { EditVehiculeComponent } from 'app/gestion-vehicule/edit-vehicule/edit-vehicule.component';
import { EditSegmentComponent } from 'app/gestion-segment/edit-segment/edit-segment.component';
import { EditStationComponent } from 'app/gestion-station/edit-station/edit-station.component';
import { GestionEmployeComponent } from 'app/gestion-employe/gestion-employe.component';
import { AddEmployeComponent } from 'app/gestion-employe/add-employe/add-employe.component';
import { EditEmployeComponent } from 'app/gestion-employe/edit-employe/edit-employe.component';
import { ImportStationComponent } from 'app/import-station/import-station.component';
import { ImportSegmentsComponent } from 'app/import-segments/import-segments.component';
import { ImportCircuitComponent } from 'app/import-circuit/import-circuit.component';
import { PlanHebdoGlobComponent } from 'app/plan-hebdo-glob/plan-hebdo-glob.component';
import { AddSemaineComponent } from 'app/plan-hebdo-glob/add-semaine/add-semaine.component';
import { PlanHebdoComponent } from 'app/plan-hebdo/plan-hebdo.component';
import { AddPlanHebdoComponent } from 'app/plan-hebdo/add-plan-hebdo/add-plan-hebdo.component';
import { ViewPlanHebdoComponent } from 'app/plan-hebdo/view-plan-hebdo/view-plan-hebdo.component';
import { EditShiftComponent } from 'app/shifts/edit-shift/edit-shift.component';
import { EditAgenceComponent } from 'app/gestion-agence/edit-agence/edit-agence.component';
import { GestionUtilisateurComponent } from 'app/gestion-utilisateur/gestion-utilisateur.component';
import { EditUserComponent } from 'app/gestion-utilisateur/edit-user/edit-user.component';
import { AddUserComponent } from 'app/gestion-utilisateur/add-user/add-user.component';


export const AdminLayoutRoutes: Routes = [
   
  
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'table-list',     component: TableListComponent },
   
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    { path: 'dashboard',      component: DashboardComponent },
   
    { path: 'gestion-chauffeur',        component: GestionChauffeurComponent },
    { path: 'audit',        component: AuditComponent },
    { path: 'gestion-vehicule',        component: GestionVehiculeComponent },
    { path: 'gestion-circuit',        component: GestionCircuitComponent },
    { path: 'gestion-station',        component: GestionStationComponent },
    { path: 'shift',        component: ShiftsComponent },
    { path: 'gestion-segment',        component: GestionSegmentComponent },
    { path: 'gestion-agence',        component: GestionAgenceComponent },
  
    { path: 'add-station',        component:AddStationComponent},
    { path: 'add-circuit',        component:AddCircuitComponent},
    { path: 'add-employe',        component:AddEmployeComponent},

    { path: 'add-segment',        component:AddSegmentComponent},
    { path: 'add-chauffeur',        component:AddChauffeurComponent},
    { path: 'add-vehicule',        component:AddVehiculeComponent},
    { path: 'calendrier',        component:CalendrierComponent},
    { path: 'cotisation',        component:CotisationComponent},
    { path: 'etatAudit',        component:EtatAuditComponent},
    { path: 'planSegment',        component:PlanSegmentComponent},
    { path: 'add-planSegment',        component:AddPlanSegmentComponent},
    { path: 'add-agence',        component:AddAgenceComponent},
    { path: 'add-shift',        component:AddShiftComponent},
    { path: 'PrecenceBus',        component:PresenceBusComponent},
    { path: 'AffecterRole',        component:AffecterRoleComponent},
    { path: 'editRole',        component:EditRoleComponent},
    { path: 'editChauffeur',        component:EditChauffeurComponent},
    { path: 'ListePointage',        component:ListePointageComponent},
    { path: 'ArriveBus',        component:ArriveeBusComponent},
    { path: 'ViewDetAudit',        component:ViewDetAuditComponent},
    { path: 'ImportEmploye',        component:ImportEmployeComponent},
    { path: 'editCircuit',        component:EditCircuitComponent},
    { path: 'EDITVEHICULE',        component:EditVehiculeComponent},
    { path: 'editSegment',        component:EditSegmentComponent},
    { path: 'editStation',        component:EditStationComponent},
    { path: 'gestion-employe',        component:GestionEmployeComponent},
    { path: 'editEmploye',        component:EditEmployeComponent},
    { path: 'ImportStation',        component:ImportStationComponent},
    { path: 'ImportSegment',        component:ImportSegmentsComponent},
    { path: 'ImportCircuit',        component:ImportCircuitComponent},
    { path: 'PlanHebdoGlob',        component:PlanHebdoGlobComponent},
    { path: 'AddSemaine',        component:AddSemaineComponent},
    { path: 'PlanHebdo',        component:PlanHebdoComponent},
    { path: 'AddPlanHebdo',        component: AddPlanHebdoComponent},
    { path: 'ViewPlanHebdo',        component: ViewPlanHebdoComponent},
    { path: 'editShift',        component:EditShiftComponent},
    { path: 'editAgence',        component: EditAgenceComponent,},
    { path: 'gestion-user',        component: GestionUtilisateurComponent, },
    { path: 'editUser',        component:   EditUserComponent},
    { path: 'AddUser',        component:     AddUserComponent,},
];
