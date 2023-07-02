import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard', icon: 'dashboard', class: '' },
 
  { path: '/gestion-chauffeur', title: 'Gérer les chauffeurs', icon: 'emoji_people', class: '' },
  { path: '/gestion-vehicule', title: 'Gérer les véhicules', icon: 'commute', class: '' },
  { path: '/gestion-segment', title: 'Gérer les segments', icon: 'precision_manufacturing', class: '' },
  { path: '/gestion-circuit', title: 'Gérer les circuits', icon: 'route', class: '' },
  { path: '/gestion-station', title: 'Gérer les stations', icon: 'fmd_good', class: '' },
  { path: '/gestion-employe', title: 'Gérer les employés', icon: 'groups', class: '' },
  { path: '/gestion-agence', title: 'Gérer les Agences', icon: 'groups', class: '' },
  { path: '/gestion-user', title: 'Gérer les utilisateurs', icon: 'groups', class: '' },


  { path: '/facture', title: 'Factures', icon: 'receipt_long', class: '' },
  { path: '/maps', title: 'Maps', icon: 'location_on', class: '' },
  { path: '/audit', title: 'Audit véhicule', icon: 'bus_alert', class: '' },
  { path: '/shift', title: 'Shifts', icon: 'schedule', class: '' },

  
 
  { path: '/shifts', title: 'Planification Evenmentielle', icon: 'event', class: '' },
  { path: '/cotisation', title: 'Cotisation', icon: 'monetization_on', class: '' },
  { path: '/shifts', title: 'Exonoration des contributions', icon: 'library_books', class: '' },
 
  { path: '/etatAudit', title: 'État Audit', icon: 'receipt_long', class: '' },
  { path: '/AffecterRole', title: 'Affectation des Roles', icon: 'receipt_long', class: '' },
  { path: '/PlanHebdo', title: 'planification Hebdomadaire ', icon: 'receipt_long', class: '' },
  { path: '/PlanHebdoGlob', title: 'planification Hebdomadaire des liste des employés', icon: 'receipt_long', class: '' },
  { path: '/ListePointage', title: 'Liste de pointage', icon: 'content_paste', class: '' },
 
  { path: '/ImportEmploye', title: 'Importer les employés', icon: 'bus_alert', class: '' },
  { path: '/ImportSegment', title: 'Importer les segments', icon: 'bus_alert', class: '' },
  { path: '/ImportStation', title: 'Importer les stations', icon: 'bus_alert', class: '' },
  { path: '/ImportCircuit', title: 'Importer les circuits', icon: 'bus_alert', class: '' },
  { path: '/ArriveBus', title: 'Arrivée des bus', icon: 'bus_alert', class: '' },
]; 

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: RouteInfo[] = [];

  constructor() {}

  ngOnInit() {
    const role = localStorage.getItem('role');
    this.menuItems = ROUTES.filter(menuItem => {
      if (role === 'Admin') {
        return true; // Show all menu items for admin
      } else if (role === 'Super Admin') {
        const allowedPaths = ['/AffecterRole','/ArriveBus','gestion-user' ];
        return allowedPaths.includes(menuItem.path);
      } else if (role === 'Agent de paie') {
        const allowedPaths = ['/cotisation','/ArriveBus'];
        return allowedPaths.includes(menuItem.path);
      } else if (role === 'Chef de Segment') {
        const allowedPaths = ['/planSegment','/ListePointage','/ArriveBus','/PlanHebdoGlob'];
        return allowedPaths.includes(menuItem.path);
      } else if (role === 'Agent de finance') {
        const allowedPaths = ['/facture','/ArriveBus'];
        return allowedPaths.includes(menuItem.path);
      } else if (role === 'Agent juridique') {
        const allowedPaths = ['/etatAudit','/ArriveBus'];
        return allowedPaths.includes(menuItem.path);
      } else if (role === 'Agent SOS/SHE/PPE') {
        const allowedPaths = ['/audit','/ArriveBus'];
        return allowedPaths.includes(menuItem.path);
      } else if (role === 'Responsable de Transport') {
        const allowedPaths = ['/facture', '/gestion-station','/gestion-employe', '/ArriveBus','/gestion-circuit', '/gestion-segment', '/gestion-vehicule', '/gestion-chauffeur', '/gestion-agence', '/maps','/calendrier','/PlanHebdo'];
        return allowedPaths.includes(menuItem.path);
      } else if (role === 'PS Manager') {
        const allowedPaths = [ '/user-profile', '/table-list','/ArriveBus'];
        return allowedPaths.includes(menuItem.path);
      } else if (role === 'Responsable segment') {
        const allowedPaths = ['/planSegment','/ArriveBus','/PlanHebdoGlob'];
        return allowedPaths.includes(menuItem.path);
      } else if (role === 'DG/RH') {
        const allowedPaths = ['/dashboard','/ArriveBus'];
        return allowedPaths.includes(menuItem.path);

      } else if (role === 'Key user Transport') {
        const allowedPaths = ['/ImportEmploye','/ArriveBus','/ImportCircuit','/ImportStation','/ImportSegment'];
        return allowedPaths.includes(menuItem.path);
      
     
      }
      return false; 
    });
  }
  

  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }
}
