import { Component, Input, OnInit } from '@angular/core';
import { IRegistration } from 'src/app/interfaces/registration';

@Component({
  selector: 'app-registration-for-org',
  templateUrl: './registration-for-org.component.html',
  styleUrls: ['./registration-for-org.component.scss'],
})
export class RegistrationForOrgComponent implements OnInit {

  @Input() regForOrg!:IRegistration;

  constructor() { }

  ngOnInit() {

    console.log(" RegistrationForOrgComponent regForOrg");
    console.log(this.regForOrg);
  }

}
