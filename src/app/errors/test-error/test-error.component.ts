import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.css'],
})
export class TestErrorComponent implements OnInit {
  baseUrl = 'https://localhost:5000/api/Buggy/';
  validationError:string[] = [];

  constructor(private _httpClient: HttpClient) {}

  ngOnInit(): void {
    
  }

  postValidationError() {
    this._httpClient.post("https://localhost:5000/api/account/register",{}).subscribe({
      next: (val) => {
        console.log(val);
      },
      error: (err) => {
        console.log(err);
        this.validationError = err;
      },
      complete: () => {},
    });
  
  }

  get404Error() {
    this._httpClient.get(this.baseUrl + 'not-found').subscribe({
      next: (val) => {
        console.log(val);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {},
    });
  }
  getServerError() {
    this._httpClient.get(this.baseUrl + 'server-error').subscribe({
      next: (val) => {
        console.log(val);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {},
    });
  }

  getBadRequest() {
    this._httpClient.get(this.baseUrl + 'bad-request').subscribe({
      next: (val) => {
        console.log(val);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {},
    });
  }
  getAuth() {
    this._httpClient.get(this.baseUrl + 'auth').subscribe({
      next: (val) => {
        console.log(val);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {},
    });
  }
}
