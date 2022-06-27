import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IContact } from '../interfaces/contact';
import { IUser } from '../interfaces/user';
import { VisitorUserData } from 'src/app/constants/appConstant';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  visitorUserData;
  constructor(private httpClient:HttpClient) { 
    this.visitorUserData = VisitorUserData;
  }

  login(formData:object){
    return this.httpClient.post('http://localhost:3000/login', formData);
  }

  signUp(formData:object){
    return this.httpClient.post('http://localhost:3000/signup', formData);
  }

  get_current_user(){
    let currentUserData = JSON.parse(localStorage.getItem('currentUser')!);

    console.log("currentUserData = JSON.parse(localStorage.getItem('currentUser')!);");
    console.log(currentUserData);
    if (currentUserData){
      return currentUserData;
    } 
    else{
      console.log("return this.visitorUserData;");
      console.log(this.visitorUserData);
      return this.visitorUserData;
    }
 //   return JSON.parse(localStorage.getItem('currentUser')!);
  }

  isAuthenticated(){
    return this.get_current_user() ? true: false;
  }

  findUserByName(userName:string){
    return this.httpClient.get<IUser>(`http://localhost:3000/users/${userName}`);
  }

  findInExistingContacts(currentUserID: number, contactUserID: number){
    return this.httpClient.get(`http://localhost:3000/contacts/${currentUserID}/${contactUserID}`);
  }

  getContacts(currentUserID: number){
    return this.httpClient.get<IContact[]>(`http://localhost:3000/contacts/${currentUserID}`);
  }

  createContact(contact:any){
    return this.httpClient.post("http://localhost:3000/contacts", contact);
  }

  manageContacts(updateInstructions: any){
    return this.httpClient.patch("http://localhost:3000/contacts", updateInstructions);
  }

  deleteContact(relationID: number){
    return this.httpClient.delete(`http://localhost:3000/contacts/${relationID}`);
  }
}
