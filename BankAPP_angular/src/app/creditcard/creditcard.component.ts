import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-creditcard',
  templateUrl: './creditcard.component.html',
  styleUrls: ['./creditcard.component.css']
})
export class CreditcardComponent implements OnInit {

  
  FirstName: any
  LastName: any
  Age: any
  PANCard: any
  AccountNumber: any
  AAdhar: any
  dummyarray: any=[]
  credDatabase: any={}
  constructor() { }

  ngOnInit(): void {
  }
  creditcardfun()
  {
    this.credDatabase[this.AccountNumber]=
    {
      "FirstName": this.FirstName,
      "LastName": this.LastName,
      "Age": this.Age,
      "PanCard": this.PANCard,
      "AccountNumber": this.AccountNumber,
      "AAdhar": this.AAdhar
    }

    alert("Applied Successully")
    console.log(this.credDatabase)

    this.dummyarray.push
    ({
      "FirstName": this.FirstName,
      "LastName": this.LastName,
      "Age": this.Age,
      "PanCard": this.PANCard,
      "AccountNumber": this.AccountNumber,
      "AAdhar": this.AAdhar
    })
    console.log(this.dummyarray)
  }

}
