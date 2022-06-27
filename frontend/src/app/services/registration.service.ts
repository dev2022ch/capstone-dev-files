import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private httpClient:HttpClient) { }

  bulkCreateRegistrations(Data: any) {
    return this.httpClient.post("http://localhost:3000/registrations", Data);
  }


  putRegistration(regId:number, Data: any) {
    return this.httpClient.put(`http://localhost:3000/registrations/${regId}`, Data);
  }

  manageRegsByOrg(updateInstructions: any){
    console.log("updateInstructions");
    console.log(updateInstructions);
   
    return this.httpClient.patch(`http://localhost:3000/registrations`, updateInstructions);
  }
  
}
