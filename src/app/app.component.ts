import { Component } from '@angular/core';
import { AuthService } from './auth-services/auth-service/auth.service';
import { FormBuilder } from '@angular/forms';
import { StorageService } from './auth-services/storage-service/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'restaurant_angular';

  constructor(private router:Router){}

  isAdminLoggedIn:boolean=StorageService.isAdminLoggedIn();
  isCustomerLoggedIn:boolean=StorageService.isCustomerLoggedIn();

  ngOnInit(){
    this.router.events.subscribe(event=>{
      if(event.constructor.name==="NavigationEnd"){
        this.isAdminLoggedIn=StorageService.isAdminLoggedIn();
        this.isCustomerLoggedIn=StorageService.isCustomerLoggedIn();
      }
    })
  }

  logout(){
    StorageService.signout();
    this.router.navigateByUrl("/login");
  }
}


