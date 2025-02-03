import { Component, OnInit } from '@angular/core';
import { SearchbarComponent } from '../searchbar/searchbar.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    SearchbarComponent,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  clickLogo(): void {
    window.location.href = '';
  }

  ngOnInit(): void {
    this.isLoggedIn = localStorage.getItem('loggedIn') === 'true';
  }

  logOut(): void {
    localStorage.setItem('loggedIn', 'false');
    localStorage.setItem('admin', 'false');
    this.isLoggedIn = false;
  }

  handleSign(): void {
    console.log('Handling sign');
    if (this.isLoggedIn) {
      this.logOut();
    } else {
      window.location.href = '/user/login';
    }
  }
}
