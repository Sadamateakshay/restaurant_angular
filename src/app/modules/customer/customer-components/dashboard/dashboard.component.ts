import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzButtonModule, NzButtonSize } from 'ng-zorro-antd/button';
import { AdminService } from 'src/app/modules/admin/admin-services/admin.service';
import { CustomerService } from '../../customer-service/customer.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  categories:any=[];
  isSpinning:boolean;
  validateForm!:FormGroup;
  size:NzButtonSize='large';

  constructor(private customerService:CustomerService,
    private fb:FormBuilder){}

  ngOnInit():void{
    this.validateForm=this.fb.group({
      title:[null,[Validators.required]]
    })
    this.getAllCategories();
  }

  searchCategory(){
    console.log(this.validateForm.value);
    this.categories=[];
    this.customerService.getCategoriesByName(this.validateForm.get(['title'])!.value).subscribe(
      (res)=>{
        res.forEach(element=>{
          element.processedImg='data:image/jpeg;base64,'+element.returnedImg;
          this.categories.push(element);
        });
      })
  }

  getAllCategories(){
    this.categories=[];
    this.customerService.getAllCategories().subscribe(
      (res)=>{
        res.forEach(element=>{
          element.processedImg='data:image/jpeg;base64,'+element.returnedImg;
          this.categories.push(element);
        })
      }
    )
  }

}
