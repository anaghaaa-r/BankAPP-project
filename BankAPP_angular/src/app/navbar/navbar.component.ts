import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  username: any
  constructor(private route:Router) { 
    this.username = JSON.parse(localStorage.getItem("CurrentName") || '')
  }

  // username=JSON.parse(localStorage.getItem("CurrentName")||'')
  ngOnInit(): void {
  }

  logout()
  {
    localStorage.removeItem('CurrentAccountNumber')
    this.route.navigateByUrl('')
  }
}
