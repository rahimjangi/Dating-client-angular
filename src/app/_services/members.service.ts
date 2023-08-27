import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';
import { map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;
  members: Member[] = [];

  constructor(private _http: HttpClient) { }
  
  getMembers() {
    if (this.members.length > 0) return of(this.members);
    return this._http.get<Member[]>(this.baseUrl + "appusers").pipe(
      map(members => {
        this.members = members;
        return members;
      })
    )
  }

  getMember(username: string) {
    const member = this.members.find(x => x.userName.toLowerCase() === username.toLowerCase());
    if (member) return of(member);
    return this._http.get<Member>(this.baseUrl + 'appusers/' + username);
  }

  updateMember(member: Member) {
    
    return this._http.put(this.baseUrl + 'appusers', member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = { ...this.members[index],...member };
      })
    );
  }
}
