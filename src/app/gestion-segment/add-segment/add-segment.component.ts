import { Component } from '@angular/core';
import { SegService } from 'Services/seg.sevice';
import { AgenceService } from 'Services/agence.service';
import { Segment } from 'Models/Segment';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { UserService } from 'Services/user.service';
declare var $: any;

@Component({
  selector: 'app-add-segment',
  templateUrl: './add-segment.component.html',
  styleUrls: ['./add-segment.component.css']
})
export class AddSegmentComponent {
  RHSegment:any[]=[];
  chefSegment:any[]=[];
  message: string='';
  ok: boolean=true;

  segmentForm: FormGroup = new FormGroup({
    nom: new FormControl('', Validators.required),
    centreDeCout: new FormControl('', Validators.required),
    nomSegSapRef: new FormControl('', Validators.required),
    rhSegment: new FormControl('', Validators.required),
    chefDeSegment: new FormControl('', Validators.required)
  });
  constructor(private segService: SegService, userservice:UserService) { 

    userservice.GetAllUsers().subscribe(data => {
      this.chefSegment = data.filter(user => user.role === "Chef de Segment");
      console.log(this.chefSegment)
    });
    

    userservice.GetAllUsers().subscribe(data => {
      this.RHSegment = data.filter(user => user.role === "RH Segment");
      console.log(this.RHSegment)
    });
    
    
  }





  



  CreateSeg(Segment:Segment) {
    const segment = ({
      nom: this.segmentForm.controls['nom'].value,
      centreDeCout: this.segmentForm.controls['centreDeCout'].value,
      nomSegSapRef: this.segmentForm.controls['nomSegSapRef'].value,
      rhSegment: this.segmentForm.controls['rhSegment'].value,
      chefDeSegment: this.segmentForm.controls['chefDeSegment'].value
      
    });
    console.log(segment);
 
  
 this.segService.CreateSeg(Segment).subscribe(
  () => {
    console.log('Segment created successfully');
    this.message = 'Segment ajouté avec succès';
    this.showNotification('top', 'center', 'success', this.message);
  }, error => {
    if (error.error && error.error instanceof ErrorEvent) {
      // Client-side error
      this.message = error.error.message;
    } else if (error.error && typeof error.error === 'string') {
      // Backend returned an error message as a string
      this.message = error.error;
    } else {
      // Other types of errors
      this.message = 'Verifiez les types des entrées';
    }
    this.showNotification('top', 'center', 'danger',this.message);
  }
);
  }
  
  showNotification(from: string, align: string, type: string,message:string) {
  
    $.notify(
      {
        icon: "notifications",
        message: message
      },
      {
        type: type,
        timer: 3000,
        placement: {
          from: from,
          align: align
        },
        template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
          '<button mat-button type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss"><i class="material-icons">close</i></button>' +
          '<i class="material-icons" data-notify="icon">notifications</i> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
          '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          '</div>' +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
          '</div>'
      }
    );
  }
  


}
