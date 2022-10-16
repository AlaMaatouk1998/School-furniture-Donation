import { User } from 'src/app/@core/models/user.model';
import { createAction, props } from '@ngrx/store';

export const loginRequest = createAction('[Auth] Login Request', props<{ email: string; password: string }>());

export const loginSuccess = createAction('[Auth] Login Success', props<{ user: User; token: string; role: string }>());

export const loginFailure = createAction('[Auth] Login Failure', props<{ error: string }>());

export const logout = createAction('[Auth] Logout');
export const dummyAction = createAction('[dummy action]');
