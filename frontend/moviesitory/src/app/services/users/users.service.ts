import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type logInResponse = {
  valid: boolean;
  admin: boolean;
};

export type registerData = {
  email: string;
  password: string;
  username: string;
  admin: boolean;
};

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private url = environment.baseUrl;

  constructor(private httpClient: HttpClient) {}

  logIn(email: string, password: string): Observable<logInResponse> {
    return this.httpClient.post<logInResponse>(`${this.url}/user/login`, {
      email: email,
      password: password,
    });
  }

  register(data: registerData) {
    return this.httpClient.post(`${this.url}/user/register`, data);
  }
}
