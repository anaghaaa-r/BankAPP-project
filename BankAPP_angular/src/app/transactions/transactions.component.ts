import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  transaction: any=[]
  datenew=new Date()
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    
    var acno=JSON.parse(localStorage.getItem('CurrentAccountNumber')||'')
    this.http.post("http://localhost:3007/transactions", {"acno": acno})

    .subscribe((result:any)=>{
      console.log("RESULT: ", result)
      this.transaction=result.transaction
      console.log('Transaction', this.transaction)
    })
  }

}
