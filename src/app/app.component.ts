import { AfterViewInit, Component, Output, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { UserService } from './auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { outputAst } from '@angular/compiler';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10,name:'Neon', weight: 20.1797, symbol: 'Ne'},
// ];
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnInit, OnDestroy {
  title = 'forms-Practise';
 show:boolean=false
  apiData: any;
  apiData1: any;
  filterValue: any;
  filter: boolean = false
  private _liveAnnouncer: any;
  dataSource: any;
  subs!: Subscription;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort
  subs1!: Subscription;
  displayElem: any;
  hide: boolean=true;
  constructor(private auth: UserService, private  router:Router) {

  }
  ngOnInit(): void {
    this.getApiData()
    this.getApiData1()
  }

  getApiData() {
    this.subs = this.auth.getUserData().subscribe(res => {
      this.apiData = res;
      console.log("Response from Api Call using Subscribe::::", this.apiData)
      this.dataSource = new MatTableDataSource(this.apiData.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.apiData.data.forEach((elem: any) => {
        console.log(elem)
        if (this.filterValue == elem.name) {
          // console.log(this.filterValue)
          return elem
        }
      });
    })
  }

  getApiData1() {
    this.subs1 = this.auth.getUserData1().subscribe(resp => {
      this.apiData1 = resp;
      console.log("Response from 2nd Api call::::", this.apiData1);
    })
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }


  displayedColumns:string[]=['position','name','weight','symbol'];
  // dataSource = ELEMENT_DATA;

  ngAfterViewInit() {

  }

  applyFilter(event: Event) {
    this.filter =!this.filter
    this.filterValue = (event.target as HTMLInputElement).value;
    console.log(":: filter value",this.filterValue)
    this.apiData.data.forEach((elem: any) => {
      // console.log(":: element",elem)
      if (this.filterValue.toLowerCase().startsWith(elem.name) || this.filterValue == elem.id ||this.filterValue == elem.year ||this.filterValue == elem.pantone_value ||this.filterValue == elem.color){
        this.displayElem=elem;
        console.log(":: id",this.displayElem)
        console.log(":: id",this.displayElem.name)
      }
    })
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
    
  }
reload(){
this.auth.reload1()
}
 announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
goToAngular(){
  this.hide=!this.hide
  this.show=true
  this.router.navigate(['/angular']);
}
goToHome(){
  this.hide=true
  this.show=false
}
}

function output() {
  throw new Error('Function not implemented.');
}
