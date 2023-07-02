import { Component, OnInit } from '@angular/core';
import { Compte } from 'Models/Compte';
import { UserService } from 'Services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-affecter-role',
  templateUrl: './affecter-role.component.html',
  styleUrls: ['./affecter-role.component.css']
})
export class AffecterRoleComponent implements OnInit {

  data: any[] = [];
  constructor(private userService:UserService,private router: Router) { }

  ngOnInit(): void {

    this.userService.GetAllUsers()
      .subscribe(data => {
        this.data = data;
        console.log(this.data);
      });
      
  }



  navigateToEdit(User: Compte): void {
    this.router.navigate(['/editRole',  User.id , User.nom ,User.login,User.prenom,
    User.matricule,User.tel,User.dateDeNaissance ]);
  }
}
