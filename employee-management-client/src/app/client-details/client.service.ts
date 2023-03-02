import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { IClient } from '../client-details/IClient';
import { catchError, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class ClientService {
  clientUrl = 'http://localhost:8080/api/client';
  clientList!: IClient[];

  constructor(private _http: HttpClient) {}

  form: FormGroup = new FormGroup({
    clientId: new FormControl(0, Validators.required),
    clientName: new FormControl('', Validators.required),
    clientLocation: new FormControl('', Validators.required),
  });

  initializeFormGroup() {
    this.form.setValue({
      clientId: 0,
      clientName: '',
      clientLocation: '',
    });
  }

  getClientData(): Observable<IClient[]> {
    return this._http.get<IClient[]>(this.clientUrl + '/allClients').pipe(
      map((res: IClient[]) => {
        return res;
      }),
      catchError((err: HttpErrorResponse) => {
        return throwError(err);
      })
    );
  }

  searchClientData(searchPattern: String): Observable<IClient[]> {
    return this._http
      .get<IClient[]>(this.clientUrl + '/search?clientName=' + searchPattern)
      .pipe(
        map((res: IClient[]) => {
          return res;
        }),
        catchError((err: HttpErrorResponse) => {
          return throwError(err);
        })
      );
  }

  insertClient(client: IClient) {
    console.log(client);
    let clientArray = [];
    clientArray.push(client);
    console.log(clientArray);
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(clientArray);
    console.log(body);
    return this._http
      .post(this.clientUrl, body, {
        headers: headers,
      })
      .pipe(
        map((res: any) => {
          return res;
        }),
        catchError((err: HttpErrorResponse) => {
          return throwError(err);
        })
      );
  }

  populateForm(client: IClient) {
    this.form.setValue(client);
  }
}
