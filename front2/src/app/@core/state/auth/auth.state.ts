import { User } from 'src/app/@core/models/user.model';
export interface AuthState {
  token: string | null;
  role: string | null;
  user: User | null;
  loginError?: object;
}

export const initialState: AuthState = {
  token: null,
  user: null,
  role: null,

  loginError: {
    severity: '',
    summary: '',
    content: '',
  },
};
