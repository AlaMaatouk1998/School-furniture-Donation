import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';
export const AUTH_STATE_NAME = 'auth';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectToken = createSelector(selectAuthState, (state) => state.token);
export const selectUser = createSelector(selectAuthState, (state) => state.user);
export const selectRole = createSelector(selectAuthState, (state) => state.role);
export const selectLoginError = createSelector(selectAuthState, (state) => state.loginError);
