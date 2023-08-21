import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;

  constructor(private _http: HttpClient) { }
  
  getMembers() {
    return this._http.get<Member[]>(this.baseUrl + "users",this.getHttpOptions());
  }

  getHttpOptions() {
    const userString = localStorage.getItem("user");
    if (!userString) return;
    const user = JSON.parse(userString);
    return {
      headers: new HttpHeaders({
        Authorization:"Bearer "+user.token
      })
    }
  }

  getMember(username:string) {
    return this._http.get(this.baseUrl + "users/"+ username, this.getHttpOptions());
  }
}
