import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { switchMap, tap, map, catchError } from 'rxjs/operators';
import { HttpEventType, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { Inject } from '@angular/core';
import { User, UserRole } from 'src/app/@core/models/user.model';
import { AuthService } from 'src/app/@core/services/auth/auth.service';
import { UserService } from 'src/app/@core/services/user/user.service';

export interface File {
  data: any;
  progress: number;
  inProgress: boolean;
}

@Component({
  selector: 'da-security-settings',
  templateUrl: './security-settings.component.html',
  styleUrls: ['../user-settings.component.scss'],
})
export class SecuritySettingsComponent implements OnInit {
  user: User;

  constructor(private authService: AuthService, private userService: UserService) {
    this.user = {
      id: 0,
      name: '',
      username: '',
      email: '',
      password: '',
      role: UserRole.ADMIN,
      profileImage: '',
    };
  }

  ngOnInit(): void {
    const id = this.authService.getUserId();
    this.userService
      .findOne(id)
      .pipe(
        tap((u: User) => {
          this.user = u;
        })
      )
      .subscribe();
  }
}
