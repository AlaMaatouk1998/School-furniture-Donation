import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../state/app.state';
import { selectToken } from '../state/auth/auth.selector';

@Injectable({ providedIn: 'root' })
export class TokenInterceptor implements HttpInterceptor {
  constructor(private store: Store<AppState>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = '';

    this.store.select(selectToken).subscribe((v) => {
      if (v) token = v;
    });
    let jwttoken = req.clone({
      setHeaders: {
        Authorization: `bearer ` + token,
        'Content-Type': 'application/json',
      },
    });
    // const authReq = req.clone({
    //   headers: req.headers.set('Authorization', token),
    // });

    // Pass on the cloned request instead of the original request.
    return next.handle(jwttoken);
  }
}
