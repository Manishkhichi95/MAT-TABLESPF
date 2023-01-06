import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/auth.service';
@Component({
  selector: 'app-angular',
  templateUrl: './angular.component.html',
  styleUrls: ['./angular.component.css']
})
export class AngularComponent implements OnInit {
  @Input()shows!: boolean;
  @Input()diplayElements!:any;
  constructor(private auth:UserService) { 
  }
  reload(){
  this.auth.reload1()
  }
  ngOnInit(): void {
  }
}
