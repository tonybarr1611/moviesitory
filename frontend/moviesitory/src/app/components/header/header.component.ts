import { Component } from '@angular/core';
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
export class HeaderComponent {
  clickLogo(): void {
    window.location.href = '';
  }
}
