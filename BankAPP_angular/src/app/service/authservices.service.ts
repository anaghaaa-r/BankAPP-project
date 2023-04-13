import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthservicesService {

  username: any
  database: any =
    {
      1000: { acno: 1000, uname: "Vignesh", password: 1000, Balance: 10000 }
    }
  constructor(private http:HttpClient) { }
  
  register(acno: any, uname: any, password: any)
  {
    console.log("RESnameservice: ", acno, uname, password)
    const data={
      "acno": acno,
      "uname": uname,
      "password": password
    }
    return this.http.post("http://localhost:3007/register", data)
  }
    // var database: any=this.database
    // if(acno in database)
    // {
    //   return false
    // }
    // else
    // {
    //   database[acno]=
    //   {
    //     acno,
    //     uname,
    //     "password": pswd,
    //     Balance: 0
    //   }
    //   console.log("database", this.database)
    // return true
    // }

  login(acno: any, password: any)
  {
    const data={
      "acno": acno,
      "password": password
    }
    return this.http.post("http://localhost:3007/login", data)
  }
  // {
  //   let db=this.database

  //   if(acno in db)
  //   {
  //     if(password=db[acno]['password'])
  //     {
  //       return true
  //     }
  //     else
  //     {
  //       alert("Incorrect Password")
  //       return false
  //     }
  //   }
  //   else
  //   {
  //     alert("Not a user, Register first")
  //     return false
  //   }
  // }
}



