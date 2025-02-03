import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MoviesitoryService } from '../../services/moviesitory.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatButtonModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private moviesitoryService: MoviesitoryService
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      isAdmin: [false, [Validators.required]],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.moviesitoryService
        .getUsersService()
        .register({
          email: this.registerForm.get('email')?.value,
          username: this.registerForm.get('username')?.value,
          password: this.registerForm.get('password')?.value,
          admin: this.registerForm.get('isAdmin')?.value,
        })
        .subscribe((res) => {
          console.log(res);
          window.location.href = 'user/login';
        });
    }
  }
}
