import { Component } from '@angular/core';
import { CustomerService } from 'src/app/modules/customer/customer-service/customer.service';
import { AdminService } from '../../admin-services/admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-get-reservations',
  templateUrl: './get-reservations.component.html',
  styleUrls: ['./get-reservations.component.scss']
})
export class GetReservationsComponent {

  isSpinning:boolean=false;
  reservations:any=[];


  constructor(private adminService:AdminService,
    private message:NzMessageService){}

  ngOnInit(){
    this.getReservations();
  }

  getReservations(){
    this.adminService.getReservations().subscribe((res)=>{
      console.log(res);
      this.reservations=res;
    })
  }

  changeReservationStatus(reservationId:number,status:string){
    console.log(reservationId);
    console.log(status);
    this.adminService.changeReservationStatus(reservationId,status).subscribe((res)=>{
      console.log(res);
      if(res.id!=null){
        this.getReservations();
        this.message.success('Reservation status changed!',{nzDuration:5000})
      }else{
        this.message.error('Something went wrong',{nzDuration:5000})
      }
    })
  }
  
}
