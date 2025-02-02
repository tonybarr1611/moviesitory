import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MoviesitoryService } from '../../services/moviesitory.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule,
    FormsModule,
  ],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.scss',
})
export class SearchbarComponent implements OnInit {
  searchOptions = [
    { value: 'all', viewValue: 'All', icon: 'search', default: true },
    { value: 'movies', viewValue: 'Movies', icon: 'movie' },
    { value: 'actors', viewValue: 'Actors', icon: 'people' },
  ];
  selectedOption = 'all';
  searchTerm = '';

  constructor(private moviesitoryService: MoviesitoryService) {}

  ngOnInit(): void {}

  public search(): void {
    console.log(`searching ${this.searchTerm} in ${this.selectedOption}`);
  }

  // async search(): Promise<void> {
  //   const value =
  //     this.searchTerm ||
  //     (document.getElementById('search') as HTMLInputElement)!.value;
  //   if (this.selectedOption === 'all') {
  //     console.log(
  //       await this.moviesitoryService.getMovies({
  //         search: value,
  //         sortBy: 'title',
  //         limit: 10,
  //         order: 'asc',
  //         page: 1,
  //       })
  //     );
  //     console.log(
  //       await this.moviesitoryService.getActorsService().getActors({
  //         search: value,
  //         limit: 10,
  //         page: 1,
  //       })
  //     );
  //   } else if (this.selectedOption === 'movies') {
  //     console.log(
  //       this.moviesitoryService.getMoviesService().getMovies({
  //         search: value,
  //         sortBy: 'title',
  //         limit: 10,
  //         order: 'asc',
  //         page: 1,
  //       })
  //     );
  //   } else if (this.selectedOption === 'actors') {
  //     console.log(
  //       this.moviesitoryService.getActorsService().getActors({
  //         search: value,
  //         limit: 10,
  //         page: 1,
  //       })
  //     );
  //   }
  // }
}
