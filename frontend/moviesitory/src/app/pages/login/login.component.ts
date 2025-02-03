import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MoviesitoryService } from '../../services/moviesitory.service';
import { logInResponse } from '../../services/users/users.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  failed = false;

  constructor(
    private fb: FormBuilder,
    private moviesitoryService: MoviesitoryService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    localStorage.clear();
  }

  register() {
    window.location.href = '/user/register';
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.moviesitoryService
        .getUsersService()
        .logIn(
          this.loginForm.get('email')?.value,
          this.loginForm.get('password')?.value
        )
        .subscribe((res: logInResponse) => {
          if (res.valid) {
            localStorage.setItem('admin', `${res.admin}`);
            localStorage.setItem('loggedIn', 'true');
            window.location.href = '';
          } else {
            this.loginForm.reset();
            this.failed = true;
          }
        });
    }
  }
}
