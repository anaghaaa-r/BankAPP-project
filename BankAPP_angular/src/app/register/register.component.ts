import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthservicesService } from '../service/authservices.service';
import { FormBuilder,Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // accno: any
  // name: any
  // pswd: any
  registerform=this.fb.group({
    uname: ["",[Validators.required,Validators.pattern('[a-zA-Z]*')]],
    acno: ['',[Validators.required,Validators.pattern('[0-9]*')],],
    password: ['',[Validators.required,Validators.pattern('[0-9]*'),Validators.minLength(4),Validators.maxLength(4)]]
  })
  
  constructor(private ds: AuthservicesService, private route: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  registercheck()
  {
    var acno: any=this.registerform.value.acno
    var uname: any=this.registerform.value.uname
    var password: any=this.registerform.value.password

    if(this.registerform.valid)
    {
      this.ds.register(acno, uname, password)
      .subscribe((result)=>{
        console.log("result: ", result);
        if(result)
        {
          alert("Registered Successfully")
          this.route.navigateByUrl('')
        }
        else
        {
          alert("Invalid Form")
        }
      }, (result)=>{
        console.log("test: ", result.error.message)
        alert(result.error.message)
        this.route.navigateByUrl('')
      })  
    }


    // const result=this.ds.register(acno, uname, password)

    // if(result)
    // {
    //   alert("Register Successfull")
    //   this.router.navigateByUrl('')
    // }
    // else
    // {
    //   alert("Register Failed")
    // }
  }
}
