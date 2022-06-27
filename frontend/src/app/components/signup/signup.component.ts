import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  @Output() signedUpEvent = new EventEmitter;
  signUpForm;
  thisImage;

  constructor(private service:UserService, private formBuilder: FormBuilder) {
    this.signUpForm = formBuilder.group({
      userName: ['', [Validators.required]],
      passWord: ['', [Validators.required]],
      email: [''],
      phone: [''],
      image: ['']
     });
  }

  onFileChange(event:any) {  
    const file = event.target.files[0];

    this.signUpForm.patchValue({

      image: file
    });    

    console.log("file.name");
    console.log(file.name);
    
  }

  signUp(){
    let formData = this.signUpForm.value;
 

    let f = new FormData();

    //Transfer of all formgroup data into the FormData object;
    for(let k in formData)
    {
      f.append(k, formData[k]);
    }
    console.log("f");
    console.log(f);

    this.service.signUp(f).subscribe((result) => {
      alert('sign-up successful!');
      this.onSignedUp();
    }, (err) => {
      alert('sign-up failed!');
      console.log(err);
    });
  }

  onSignedUp(){
    this.signedUpEvent.emit(true);
  }
  
  ngOnInit(): void {
  }
}
