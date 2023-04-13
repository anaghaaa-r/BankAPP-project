import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthservicesService } from '../service/authservices.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  database: any =
    {
      1000: { acno: 1000, uname: "Vignesh", password: 1000, Balance: 10000 }
    }
  abc: any = "Welcome to BANK"
  enteracno: any = "Enter your account number"
  enterpass: any = "Enter your password"
  accountnumber: any
  pass: any = ""

  constructor(private route: Router, private ds: AuthservicesService) { }

  ngOnInit(): void { }

  login()
  {
    var acno: any = this.accountnumber
    var password: any = this.pass

    this.ds.login(acno, password)
    .subscribe((result: any)=>{
      alert(result.message)
      localStorage.setItem("CurrentAccountNumber", JSON.stringify(result.currentacno))
      localStorage.setItem("CurrentName", JSON.stringify(result.currentname))
      localStorage.setItem("token", JSON.stringify(result.token))
      this.route.navigateByUrl('dashboard')
    }, (result)=>{
      alert(result.error.message)
    })
  }
    // if (acno in this.database) 
    // {
    //   if (pswd == this.database[acno]['password']) 
    //   {
    //     alert("Login Successful")
    //     this.route.navigateByUrl("dashboard")
    //   }
    //   else 
    //   {
    //     alert("Incorrect Password")
    //   }
    // }
    // else 
    // {
    //   alert("Not a user, Register first")
    // }
  
  // acnochange(event: any) 
  // {
  //   console.log(event)
  //   console.log("INPUT: ", event.target.value)
  //   this.accountnumber = event.target.value
  // }
  // passwordchange(event: any)
  // {
  //   this.pswd1=event.target.value
  // }
}
