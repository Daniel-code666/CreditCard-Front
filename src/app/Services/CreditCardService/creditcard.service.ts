import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreditcardService {

  private headers: any

  constructor(private http: HttpClient) {
    if (sessionStorage.getItem('Token') != null) {
      this.headers = new HttpHeaders({
        'Authorization': 'Bearer ' + sessionStorage.getItem('Token')
      })
    }
  }

  public GetCrediCardFromUser(): any {
    return this.http.get<any>(environment.HOST2 + "GetCreditCardFromUser", { headers: this.headers })
    // return this.http.get<any>("https://localhost:44379/api/CreditCard/GetCreditCardFromUser", { headers: this.headers })
  }

  public CreateCreditCard(card: object): any {
    return this.http.post<any>(environment.HOST2 + "CreateCreditCard", card, { headers: this.headers })
  }

  public DeleteCreditCard(CardId: number): any {
    return this.http.delete<any>(environment.HOST2 + "DeleteCreditCard/" + CardId, { headers: this.headers })
    //return this.http.delete<any>("https://localhost:44379/api/CreditCard/DeleteCreditCard/" + CardId, { headers: this.headers })
  }
}
