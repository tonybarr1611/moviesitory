import { Component, Input } from '@angular/core';
import { MoviesSearchComponent } from '../movies-search/movies-search.component';
import { ActorsSearchComponent } from '../actors-search/actors-search.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [MoviesSearchComponent, ActorsSearchComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  @Input() searchTerm: string = '';

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      if (params['searchTerm']) {
        this.searchTerm = params['searchTerm'];
      }
    });
  }
}
