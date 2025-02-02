import { Component, Input, OnInit } from '@angular/core';
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
  cardTitle!: string;
  constructor() {}

  ngOnInit(): void {
    this.cardTitle = 'title' in this.data ? this.data.title : this.data.name;
  }

  get isMovie(): boolean {
    return 'title' in this.data;
  }

  get isActor(): boolean {
    return 'name' in this.data;
  }
}
