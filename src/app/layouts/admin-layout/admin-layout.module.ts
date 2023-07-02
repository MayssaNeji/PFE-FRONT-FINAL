import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';

import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import {MatButtonModule} from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import { ForgotpwrdComponent } from 'app/forgotpwrd/forgotpwrd.component';
import { GestionChauffeurComponent } from 'app/gestion-chauffeur/gestion-chauffeur.component';
import { AuditComponent } from 'app/audit/audit.component';
import { GestionVehiculeComponent } from 'app/gestion-vehicule/gestion-vehicule.component';
import { GestionSegmentComponent } from 'app/gestion-segment/gestion-segment.component';
import { GestionCircuitComponent } from 'app/gestion-circuit/gestion-circuit.component';
import { GestionStationComponent } from 'app/gestion-station/gestion-station.component';
import { ShiftsComponent } from 'app/shifts/shifts.component';
import { GestionAgenceComponent } from 'app/gestion-agence/gestion-agence.component';

import { AddStationComponent } from 'app/gestion-station/add-station/add-station.component';
import { AddCircuitComponent } from 'app/gestion-circuit/add-circuit/add-circuit.component';
import { AddSegmentComponent } from 'app/gestion-segment/add-segment/add-segment.component';
import { AddChauffeurComponent } from 'app/gestion-chauffeur/add-chauffeur/add-chauffeur.component';
import { AddVehiculeComponent } from 'app/gestion-vehicule/add-vehicule/add-vehicule.component';
import { CalendrierComponent } from 'app/calendrier/calendrier.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CotisationComponent } from 'app/cotisation/cotisation.component';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
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

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
   MatDatepickerModule,
   FullCalendarModule
  ],
  declarations: [
   
    UserProfileComponent,
    TableListComponent,
  
    GestionChauffeurComponent,
    AuditComponent,
    DashboardComponent,
    GestionVehiculeComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    GestionAgenceComponent,

    AddStationComponent,
    AddCircuitComponent,
    AddSegmentComponent,
    AddChauffeurComponent,
    AddVehiculeComponent,
    CalendrierComponent,
    CotisationComponent,
    EtatAuditComponent,
    PlanSegmentComponent,
    AddPlanSegmentComponent,
    AddAgenceComponent,
    AddShiftComponent,
   PresenceBusComponent,
   AffecterRoleComponent,
    ListePointageComponent,
 GestionSegmentComponent,
 GestionCircuitComponent,
 GestionStationComponent,
 ShiftsComponent,
 EditRoleComponent,
 EditChauffeurComponent,
 ArriveeBusComponent,
 ViewDetAuditComponent,
 ImportEmployeComponent,
 EditCircuitComponent,
 EditVehiculeComponent,
 EditSegmentComponent,
 EditStationComponent,
 GestionEmployeComponent,
 AddEmployeComponent,
 EditEmployeComponent,
 ImportStationComponent,
 ImportSegmentsComponent,
 ImportCircuitComponent,
 PlanHebdoGlobComponent,
 AddSemaineComponent,
 PlanHebdoComponent,
 AddPlanHebdoComponent,
 ViewPlanHebdoComponent,
 EditShiftComponent,
 EditAgenceComponent,
 GestionUtilisateurComponent,
 EditUserComponent,
 AddUserComponent,
  ]
})

export class AdminLayoutModule {}
