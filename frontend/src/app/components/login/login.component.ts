import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @Output() loggedInEvent = new EventEmitter;
  loginForm;

  constructor(private service:UserService, private formBuilder: FormBuilder) {
    this.loginForm = formBuilder.group({
      userName: ['', [Validators.required]],
      passWord: ['', [Validators.required]]
    });
  }


  login(){
    let formData = this.loginForm.value;
    this.service.login(formData).subscribe((result) => {
      localStorage.setItem('currentUser', JSON.stringify(result)); //Storing the data of the currently logged in user on the browser
      alert('Login successful!');

      this.onLoggedIn();
    }, (err) => {
      alert('Incorrect Username/password');
      console.log(err);
    });
  }

  onLoggedIn(){
    this.loggedInEvent.emit(true);
  }

  ngOnInit(): void {
  }

}
