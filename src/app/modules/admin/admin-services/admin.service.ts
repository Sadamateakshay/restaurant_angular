import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/auth-services/storage-service/storage.service';

const BASIC_URL=["http://localhost:8080/"]

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }

  postCategory(categoryDto:any):Observable<any>{
    return this.http.post<[]>(BASIC_URL+"api/admin/category",categoryDto,
    {
      headers:this.createAuthorizationHeader()
    })
  }

  getAllCategories():Observable<any>{
    return this.http.get<[]>(BASIC_URL+"api/admin/categories",
    {
      headers:this.createAuthorizationHeader()
    })
  }

  getAllCategoriesByTitle(title:string):Observable<any>{
    return this.http.get<[]>(BASIC_URL+`api/admin/categories/${title}`,
    {
      headers:this.createAuthorizationHeader()
    })
  }

  //product operations

  postProduct(categoryId:number,productDto:any):Observable<any>{
    return this.http.post<[]>(BASIC_URL+`api/admin/${categoryId}/product`,productDto,
    {
      headers:this.createAuthorizationHeader()
    })
  }

  getProductsByCategory(categoryId:number):Observable<any>{
    return this.http.get<[]>(BASIC_URL+`api/admin/${categoryId}/products`,
    {
      headers:this.createAuthorizationHeader()
    })
  }

  getProductsByCategoryAndTitle(categoryId:number,title:string):Observable<any>{
    return this.http.get<[]>(BASIC_URL+`api/admin/${categoryId}/product/${title}`,
    {
      headers:this.createAuthorizationHeader()
    })
  }


  deleteProduct(productId:number):Observable<any>{
    return this.http.delete<[]>(BASIC_URL+`api/admin/product/${productId}`,
    {
      headers:this.createAuthorizationHeader()
    })
  }

  getProductById(productId:number):Observable<any>{
    return this.http.get<[]>(BASIC_URL+`api/admin/product/${productId}`,
    {
      headers:this.createAuthorizationHeader()
    })
  }

  updateProduct(productId:number,productDto:any):Observable<any>{
    return this.http.put<[]>(BASIC_URL+`api/admin/product/${productId}`,productDto,
    {
      headers:this.createAuthorizationHeader()
    })
  }

  //reservation operations

  getReservations():Observable<any>{
    return this.http.get<[]>(BASIC_URL+"api/admin/reservations",{
      headers:this.createAuthorizationHeader()
    })
  }

  changeReservationStatus(reservationId:number,status:string):Observable<any>{
    return this.http.get<[]>(BASIC_URL+`api/admin/reservation/${reservationId}/${status}`,{
      headers:this.createAuthorizationHeader()
    })
  }

  //create authorization header

  createAuthorizationHeader():HttpHeaders{
    let authHeaders:HttpHeaders=new HttpHeaders();
    return authHeaders.set(
      "Authorization","Bearer "+StorageService.getToken()
    );
  }
}
