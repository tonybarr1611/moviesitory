import { Component, Input, OnInit } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  Actor,
  ActorPopulated,
  ActorRequestResponse,
} from '../../../models/actor.model';
import { MoviesitoryService } from '../../../services/moviesitory.service';
import { CommonModule } from '@angular/common';
import { Movie, MovieRequestResponse } from '../../../models/movie.model';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { CardComponent } from '../../../components/card/card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-actor-form',
  standalone: true,
  imports: [
    CommonModule,
    MatFormField,
    MatInputModule,
    FormsModule,
    MatPaginatorModule,
    CardComponent,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './actor-form.component.html',
  styleUrl: './actor-form.component.scss',
})
export class ActorFormComponent implements OnInit {
  @Input() actor: Actor = {
    id: 0,
    name: '',
    biography: '',
    birthdate: '',
    pob: '',
    gender: 0,
    popularity: 0,
    images: [],
    movies: [],
  };
  isNew = true;
  image: string = '';
  movies: MovieRequestResponse = {
    movies: [],
    totalMovies: 0,
    totalPages: 0,
    currentPage: 1,
  };
  limit = 4;
  searchTerm = '';
  moviesRelated: { id: number; name: string }[] = [];

  constructor(
    private moviesitoryService: MoviesitoryService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    try {
      this.route.paramMap.subscribe((params) => {
        this.actor.id = window.history.state.id;
        this.moviesitoryService
          .getActorsService()
          .getActorById(`${this.actor.id}`)
          .subscribe((res: ActorPopulated) => {
            this.actor = {
              ...res,
              movies: res.movies.map((movie) => movie.id),
              birthdate: new Date(res.birthdate).toISOString().split('T')[0],
            };
            res.movies.forEach((movie) =>
              this.moviesRelated.push({ id: movie.id, name: movie.title })
            );
          });
        console.log('state', window.history.state);
        console.log('actor', this.actor);
        const related = window.history.state.related;
        this.actor.movies = [];
        related.forEach((movie: Movie) => {
          this.actor.movies.push(movie.id);
          this.moviesRelated.push({ id: movie.id, name: movie.title });
        });
      });
    } catch (error) {}
    if (this.actor.id != 0) {
      this.isNew = false;
    }
    this.refreshMovies();
  }

  refreshMovies(): void {
    this.moviesitoryService
      .getMoviesService()
      .getMovies({
        page: this.movies.currentPage,
        limit: this.limit,
        search: this.searchTerm,
        sortBy: 'title',
        order: 'asc',
      })
      .subscribe((movies) => {
        this.movies = movies;
      });
  }

  addImage() {
    this.actor.images.push(this.image);
    this.image = '';
  }

  removeImage(image: string) {
    this.actor.images = this.actor.images.filter(
      (curr_img) => curr_img !== image
    );
  }

  pageChange(event: PageEvent) {
    this.limit = event.pageSize;
    this.movies.currentPage = event.pageIndex + 1;
    this.refreshMovies();
  }

  addMovie(data: { id: number; name: string }) {
    if (!this.actor.movies.includes(data.id)) {
      this.moviesRelated.push(data);
      this.actor.movies.push(data.id);
    }
  }

  removeMovie(id: number) {
    this.actor.movies = this.actor.movies.filter((movieId) => movieId !== id);
    this.moviesRelated = this.moviesRelated.filter((movie) => movie.id !== id);
  }

  getMovieName(id: number): string {
    const movieData = this.moviesRelated.find((related) => related.id === id);

    return movieData ? movieData.name : 'Unknown';
  }

  submit(): void {
    this.actor.images = this.actor.images.filter((image) => image !== '');
    if (this.isNew) {
      this.moviesitoryService
        .getActorsService()
        .addActor(this.actor)
        .subscribe((res) => (window.location.href = `all`));
    } else {
      this.moviesitoryService
        .getActorsService()
        .updateActor(this.actor)
        .subscribe((res) => (window.location.href = `actor/${this.actor.id}`));
    }
  }
}
