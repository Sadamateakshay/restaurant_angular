import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../customer-service/customer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzButtonSize } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-view-products-by-category',
  templateUrl: './view-products-by-category.component.html',
  styleUrls: ['./view-products-by-category.component.scss']
})
export class ViewProductsByCategoryComponent {

  categoryId:number=this.activatedRoute.snapshot.params['categoryId'];
  products:any=[];
  isSpinning:boolean=false;
  validateForm!:FormGroup;
  size:NzButtonSize='large';

  constructor(private activatedRoute:ActivatedRoute,
    private customerService:CustomerService,
    private fb:FormBuilder){}


  ngOnInit(){
    this.validateForm=this.fb.group({
      title:[null,[Validators.required]]
    })
    this.getProductsByCategory();
  }

  getProductsByCategory(){
    this.products=[];
    this.customerService.getProductsByCategory(this.categoryId).subscribe((res)=>{
      console.log(res);
      res.forEach(element=>{
        element.processedImg='data:image/jpeg;base64,'+element.returnedImg;
        this.products.push(element);
      })
    })
  }

  submitForm(){
    this.isSpinning=true;
    this.products=[];
    this.customerService.getProductsByCategoryAndTitle(this.categoryId,this.validateForm.get(['title'])!.value).subscribe((res)=>{
      console.log(res);
      res.forEach(element=>{
        element.processedImg='data:image/jpeg;base64,'+element.returnedImg;
        this.products.push(element);
        this.isSpinning=false;
      })
    })
  }
}
