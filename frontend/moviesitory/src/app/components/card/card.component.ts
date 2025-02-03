import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Movie } from '../../models/movie.model';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Actor } from '../../models/actor.model';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent implements OnInit {
  @Input() data!: Movie | Actor;
  @Input() isAdd: boolean = false;
  @Output() sendID = new EventEmitter<{ id: number; name: string }>();

  cardTitle!: string;
  constructor() {}

  ngOnInit(): void {
    this.cardTitle = 'title' in this.data ? this.data.title : this.data.name;
  }

  seeDetails(): void {
    if (this.isAdd) {
      this.sendID.emit({
        id: this.data.id,
        name: this.isActor
          ? (this.data as Actor).name
          : (this.data as Movie).title,
      });
      return;
    }
    try {
      window.location.href = `${this.isMovie ? 'movie' : 'actor'}/${
        this.data.id
      }`;
    } catch (error) {
      console.log('Failed to navigate to details');
    }
  }

  get isMovie(): boolean {
    return 'title' in this.data;
  }

  get isActor(): boolean {
    return 'name' in this.data;
  }
}
