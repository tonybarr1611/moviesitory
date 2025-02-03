import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
})
export class CarouselComponent {
  @Input() size: number = 256;
  @Input() slides: string[] = [];
  current_slide = 0;

  constructor() {}

  getSlide(): string {
    return this.slides[this.current_slide];
  }

  getPrev(): void {
    this.current_slide == 0
      ? (this.current_slide = this.slides.length - 1)
      : this.current_slide--;
  }

  getNext(): void {
    this.current_slide < this.slides.length - 1
      ? this.current_slide++
      : (this.current_slide = 0);
  }
}
