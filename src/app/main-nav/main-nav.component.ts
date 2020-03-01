import { Component , Output, EventEmitter, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { TaskService } from '../services/task.service';
import {Router} from '@angular/router';
import {LoginComponent} from '../login/login.component'
@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements AfterViewInit{
  @ViewChild(LoginComponent,{static: true}) child;

  type:string;
getValue:any=true;
getproduct:any=false;
logout()
{
  localStorage.setItem("type","null")
  console.log(localStorage.getItem("type"))

  
}
  ngAfterViewInit() {
    console.log(localStorage.getItem("type"))
  
    console.log(localStorage.getItem("username"))
   // localStorage.setItem('typp',"admin")
  this.type=localStorage.getItem("type")
   if(this.type=="normal")
   {
     this.getproduct=true;
     this.getValue=true;
   }
   else if(this.type=="admin")
   {
     this.getValue=false;
   }
  }


admin=true
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
    //to show something and something not 
    private authListener:Subscription;

  constructor(private breakpointObserver: BreakpointObserver,private task:TaskService,private router: Router) {}


  @Output() messageEvent = new EventEmitter<string>();
   searchCat:string
  search(e)
  {

this.task.searchProduct(this.searchCat).subscribe(res=>{
  this.messageEvent.emit(this.searchCat)
  this.router.navigate(['../searchcat',this.searchCat]); //this to route to other page 
})

  }

}
