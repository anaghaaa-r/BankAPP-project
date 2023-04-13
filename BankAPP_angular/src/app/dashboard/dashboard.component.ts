import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthservicesService } from '../service/authservices.service';
import { Router } from '@angular/router';

const Options={
  headers: new HttpHeaders
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  acnod: any
  pswdd: any
  amountd: any
  // accno: any
  // pswd: any
  // amount: any

  acnow: any
  pswdw: any
  amountw: any

  delacc:any
  constructor(private ds: AuthservicesService, private http: HttpClient, private route: Router) { }

  ngOnInit(): void {
  }

  getOptions()
  {
    var token=JSON.parse(localStorage.getItem('token') || '')
    let headers=new HttpHeaders()
    console.log('token', token, headers)
    if(token)
    {
      headers=headers.append("x-access-token", token)
      Options.headers=headers
    }
    return Options
  }

  deposit()
  {
    var acno=this.acnod
    var password=this.pswdd
    var amount=this.amountd

    const data={
      "acno": acno,
      "password": password,
      "amount": amount
    }

    console.log("DATA: ", data)
    this.http.post("http://localhost:3007/deposit", data, this.getOptions())
    .subscribe((result: any)=>{
      console.log("result: ", result)
      alert(result.message)
    }, (result: any)=>{
      alert(result.error.message)
    })
  }

  withdraw()
  {
    var acno=this.acnow
    var password=this.pswdw
    var amount=this.amountw

    const data={
      acno,
      password,
      amount
    }

    console.log("DATA: ", data)
    this.http.post("http://localhost:3007/withdraw", data, this.getOptions())
    .subscribe((result: any)=>{
      alert(result.message)
    }, (result: any)=>{
      alert(result.error.message)
    })
  }

  //parent-child communication - Deleting Account
  Deleteaccount()
  {
    this.delacc=JSON.parse(localStorage.getItem("CurrentAccountNumber")||'')
  }
  deleted(acno: any)
  {
    console.log("DELETE: ", acno)
    
    this.http.delete(`http://localhost:3007/delete/${acno}`)
    .subscribe((result: any)=>{
      console.log("result: ", result)
      this.route.navigateByUrl('')
    })
  }
  cancel()
  {
    this.delacc=''
  }
}


  // deposit() {
  //   var db = this.ds.database
  //   var acc = this.accno
  //   var psw = this.pswd
  //   var amt = this.amount
  //   if (acc in db) {
  //     if (psw == db[acc]['password']) {
  //       db[acc]['Balance'] = Number(db[acc]['Balance']) + Number(amt)
  //       db[acc]['transaction'] =
  //       {
  //         "Mode": "Online",
  //         "Type": "Deposit",
  //         "Balance": amt
  //       }
  //       console.log("DATABASE", db)
  //       alert(`Amount ${amt} added successfully, Current Balance is ${db[acc]['Balance']}`)
  //     }
  //     else {
  //       alert("Check Password")
  //     }
  //   }
  //   else {
  //     alert("No such Account")
  //   }
  // }

  // withdraw() {
  //   var db = this.ds.database
  //   var acc = this.accnow
  //   var psw = this.pswdw
  //   var amt = this.amountw
  //   if (acc in db) {
  //     if (psw == db[acc]['password']) 
  //     {
  //       if (Number(amt) < Number(db[acc]['Balance'])) 
  //       {
  //         db[acc]['Balance'] = Number(db[acc]['Balance']) - Number(amt)
  //         db[acc]['transaction'] =
  //         {
  //           "Mode": "Online",
  //           "Type": "Deposit",
  //           "Balance": amt
  //         }
  //         console.log("DATABASE", db)
  //         alert(`Amount ${amt} debited successfully, Current Balance is ${db[acc]['Balance']}`)
  //       }
  //       else 
  //       {
  //         alert("Insufficient Balance")
  //       }
  //     }
  //     else 
  //     {
  //       alert("Check Password")
  //     }
  //   }
  //   else {
  //     alert("No such Account")
  //   }
  // }


