import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserTypes } from 'src/app/constants/appConstant';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss'],
})
export class SidemenuComponent implements OnInit {
    displayLogInMenu: boolean;
    displaySignUpMenu: boolean;
    displayLogOutMenu: boolean;
    displayLogInPage: boolean;
    displaySignUpPage: boolean;

    currentUserData;
    currentUser;
  
  constructor(private userService: UserService, private router:Router) { 

    console.log("constructor called");

    this.displayLogInMenu = true;
    this.displaySignUpMenu = true;
    this.displayLogOutMenu = false;
    this.displayLogInPage = false;
    this.displaySignUpPage = false;
  }

  closeLogInPage(){
    this.displayLogInPage = false;
  }
  
  logIn(){
    this.displayLogInPage = true;
  }

  signUp(){
    this.displaySignUpPage = true;
  }

  closeSignUpPage(){
    this.displaySignUpPage = false;
    this.displayLogInPage = true;
  }

  logOut(){
    localStorage.removeItem("currentUser");
    this.currentUserData = this.userService.get_current_user();

    alert("user logged out");
    
    this.displayLogInMenu = true;
    this.displaySignUpMenu = true;
    this.displayLogOutMenu = false;
    this.displayLogInPage = false;
    this.displaySignUpPage = false;

    this.router.navigateByUrl('/tabs/tab5', {skipLocationChange: true}).then(() => {
      this.router.navigate(["/tabs/tab5"]);
      });
  }

  loggedIn(ifSucceeded: boolean){
    this.currentUserData = this.userService.get_current_user();
    if (ifSucceeded) {
      this.currentUserData = this.userService.get_current_user();
      this.displayLogInMenu = false;
      this.displaySignUpMenu = false;
      this.displayLogOutMenu = true;
      this.displayLogInPage = false;
      this.displaySignUpPage = false;

      this.router.navigateByUrl('/tabs/tab5', {skipLocationChange: true}).then(() => {
        this.router.navigate(["/tabs/tab5"]);
      });
      
     }  
  }

  signedUp(ifSucceeded: boolean){
    if (ifSucceeded) {
      this.displayLogInMenu = true;
      this.displaySignUpMenu = true;
      this.displayLogOutMenu = false;
      this.displayLogInPage = true;
      this.displaySignUpPage = false;
     }  
  }

  ngOnInit() {
    this.currentUserData = this.userService.get_current_user();

    this.currentUser = this.currentUserData.userID;

    if (this.currentUser === UserTypes.VISITOR) {
        this.displayLogInMenu = true;
        this.displaySignUpMenu = true;
        this.displayLogOutMenu = false;
        this.displayLogInPage = false;
        this.displaySignUpPage = false;
    }
    else{
        this.displayLogInMenu = false;
        this.displaySignUpMenu = false;
        this.displayLogOutMenu = true;
        this.displayLogInPage = false;
        this.displaySignUpPage = false;
    }
  }
}
