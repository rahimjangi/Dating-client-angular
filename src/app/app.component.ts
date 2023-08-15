import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  urlPath = 'https://localhost:5000/api/AppUsers';
  title = 'client';
  users: any;
  constructor(private _httpClient: HttpClient) {}

  ngOnInit(): void {
    this._httpClient.get(this.urlPath).subscribe({
      next: (response) => {
        this.users = response;
        console.log(response);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
