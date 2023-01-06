import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient,private https:HttpClient) { }
  getUserData(){
    let url=`https://reqres.in/api/unknown`
    return this.http.get(url);
  }
  getUserData1(){
    let url=`https://reqres.in/api/users?page=2`
    return this.https.get(url);
  }
  reload1(){
      location.reload() 
  }
}
