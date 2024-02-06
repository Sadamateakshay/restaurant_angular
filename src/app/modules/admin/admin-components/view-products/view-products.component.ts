import { Component } from '@angular/core';
import { AdminService } from '../../admin-services/admin.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.scss']
})
export class ViewProductsComponent {

  categoryId:number=this.activatedRoute.snapshot.params['categoryId'];
  products:any=[];
  isSpinning:boolean;
  validateForm!:FormGroup;
  size:NzButtonSize='large';
  
  constructor(private adminService:AdminService,
    private activatedRoute:ActivatedRoute,
    private fb:FormBuilder,
    private message:NzMessageService){}

  ngOnInit():void{
    this.validateForm=this.fb.group({
      title:[null,[Validators.required]]
    })
    this.getProductsByCategory();
  }

  getProductsByCategory(){
    this.products=[];
    this.adminService.getProductsByCategory(this.categoryId).subscribe((res)=>{
      res.forEach(element=>{
        element.processedImg='data:image/jpeg;base64,'+element.returnedImg;
        this.products.push(element);
      })
    })
  }

  submitForm(){
    this.isSpinning=true;
    this.products=[];
    this.adminService.getProductsByCategoryAndTitle(this.categoryId,this.validateForm.get(['title'])!.value).subscribe((res)=>{
      console.log(res);
      res.forEach(element=>{
        element.processedImg='data:image/jpeg;base64,'+element.returnedImg;
        this.products.push(element);
        this.isSpinning=false;
      })
    })
  }

  deleteProduct(productId:any){
    this.adminService.deleteProduct(productId).subscribe((res)=>{
      if(res==null){
        this.getProductsByCategory()
        this.message.success("Product Deleted Successfully",{nzDuration:5000})
      }else{
        this.message.error("Something went wrong!",{nzDuration:5000})
      }
    })
  }
}
