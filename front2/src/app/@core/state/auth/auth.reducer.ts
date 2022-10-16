import { User } from 'src/app/@core/models/user.model';
import { loginFailure, loginSuccess, logout } from './auth.actions';
import { createReducer, on } from '@ngrx/store';
import { initialState } from './auth.state';
export const authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, action) => {
    return {
      ...state,
      token: action.token,
      role: action.role,
      user: action.user,
    };
  }),
  on(loginFailure, (state, { error }) => {
    return {
      ...state,
      loginError: [
        {
          severity: 'error',
          summary: 'Login Failed',
          content: error,
        },
      ],
      token: null,
      user: null,
      role: null,
    };
  }),
  on(logout, (state) => {
    return {
      ...state,
      token: null,
      user: null,
      role: null,
    };
  })
);
