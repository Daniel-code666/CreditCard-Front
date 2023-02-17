import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private headers: any

  constructor(private http: HttpClient) {
    if (sessionStorage.getItem('Token') != null) {
      this.headers = new HttpHeaders({
        'Authorization': 'Bearer ' + sessionStorage.getItem('Token')
      })
    }
  }

  public login(user: object): any {
    return this.http.post<any>(environment.HOST1 + "Login", user)
  }

  public register(user: object): any {
    return this.http.post<any>(environment.HOST1 + "Register", user)
  }
}
