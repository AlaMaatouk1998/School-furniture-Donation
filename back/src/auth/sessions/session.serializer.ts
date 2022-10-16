import { Strategy } from 'passport-local';
import { PassportSerializer } from '@nestjs/passport';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  serializeUser(user: any, done: (err: Error, user: any) => void): any {
    done(null, user);
  }

  deserializeUser(
    payload: any,
    done: (err: Error, payload: String) => void,
  ): any {
    done(null, payload);
  }
}
