import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap, switchMap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/@core/models/user.model';
import { AuthResponseData } from '../../models/AuthResponseData.model';
type Ex = {
  [key: string]: any;
  user: User;
  jwt: string;
};
export interface LoginForm {
  email: string;
  password: string;
}

export const JWT_NAME = 'token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  login(email: String, password: String) {
    return this.http.post<any>('http://localhost:3000/api/users/login', { email: email, password: password }).pipe(
      map((res) => {
        console.log('token' + res.user); // DONT CONSOLE IN  MAP
        return { token: res.jwt, user: res.user };
      })
    );
  }

  setSession(token: string | null) {
    if (token) localStorage.setItem(JWT_NAME, token);
  }
  logout() {
    localStorage.removeItem(JWT_NAME);
  }

  register(user: User) {
    return this.http.post<any>('/api/users', user);
  }

  isUserLoggedIn(): boolean {
    const token = localStorage.getItem(JWT_NAME);
    if (token) return !this.jwtHelper.isTokenExpired(token);
    else return false;
  }
  formatUserTokenRes(data: AuthResponseData) {
    const res = { token: data.jwt };
    return res;
  }

  getUserId(): number {
    const jwt = localStorage.getItem(JWT_NAME);
    if (jwt) {
      const decoded = this.jwtHelper.decodeToken(jwt);
      return decoded.user.id;
    } else return 0;
  }
  getUserIdFromToken(token: string): string {
    if (token) {
      const decoded = this.jwtHelper.decodeToken(token);
      return decoded.user.role;
    } else return 'no role';
  }
}
