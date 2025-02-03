import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { MoviesitoryService } from '../../services/moviesitory.service';
import { MovieRequestResponse } from '../../models/movie.model';
import { CardComponent } from '../../components/card/card.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { isAdmin } from '../../utils/admin';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'movies-search',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatIconModule,
  ],
  templateUrl: './movies-search.component.html',
  styleUrl: './movies-search.component.scss',
})
export class MoviesSearchComponent implements OnInit {
  @Input() searchTerm: string = '';
  @Input() results: number = 4;
  @Input() limit: number = 4;
  movies: MovieRequestResponse = {
    movies: [],
    totalMovies: 0,
    totalPages: 0,
    currentPage: 0,
  };
  currentPage = 1;
  currentLimit = this.limit;
  filterForm!: FormGroup;

  readonly isAdmin = isAdmin;

  constructor(
    private moviesitoryService: MoviesitoryService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => {
      if (params['searchTerm']) {
        this.searchTerm = params['searchTerm'];
      }
    });
  }

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      genre: [''],
      year: [''],
      popularity: [''],
      sortBy: ['title'],
      order: ['asc'],
    });
    this.updateSearch();
  }

  addMovie() {
    window.location.href = 'admin/movie/add';
  }

  pageChange(event: PageEvent) {
    console.log(event);
    this.currentPage = event.pageIndex + 1;
    this.currentLimit = event.pageSize;
    this.updateSearch();
  }

  updateSearch() {
    this.moviesitoryService
      .getMoviesService()
      .getMovies({
        search: this.searchTerm,
        sortBy: this.filterForm.value.sortBy,
        limit: this.currentLimit,
        order: this.filterForm.value.order,
        page: this.currentPage,
        genre: this.filterForm.value.genre,
        year: this.filterForm.value.year,
        popularity: this.filterForm.value.popularity / 0.5,
      })
      .subscribe((movies) => {
        this.movies.movies = [];
        this.movies = movies;
      });
  }
}
