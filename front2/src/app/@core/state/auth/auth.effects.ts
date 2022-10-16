import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/@core/services/auth/auth.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as AuthActions from './auth.actions';
import { Store } from '@ngrx/store';

import { AuthResponseData } from '../../models/AuthResponseData.model';
import { AppState } from '../app.state';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService, private router: Router, private store: Store<AppState>) {}

  loginRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginRequest),
      exhaustMap((action) =>
        this.authService.login(action.email, action.password).pipe(
          map((res) => {
            const role = this.authService.getUserIdFromToken(res.token);
            console.log(res.token);
            return AuthActions.loginSuccess({ token: res.token, user: res.user, role: role });
          }),
          catchError((error) => {
            console.log('error login');
            return of(AuthActions.loginFailure({ error: 'Please input correct username and password' }));
          })
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap((action) => {
          this.router.navigate(['/']);
          alert('Login Successful! ' + 'Welcome, ');
        })
      ),
    { dispatch: false }
  );
}
