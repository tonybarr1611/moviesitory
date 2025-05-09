import { Component, Input, OnInit } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Actor, ActorRequestResponse } from '../../../models/actor.model';
import { MoviesitoryService } from '../../../services/moviesitory.service';
import { CommonModule } from '@angular/common';
import { Movie, MoviePopulated } from '../../../models/movie.model';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { CardComponent } from '../../../components/card/card.component';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-form',
  standalone: true,
  imports: [
    CommonModule,
    MatFormField,
    MatInputModule,
    FormsModule,
    MatPaginatorModule,
    CardComponent,
    MatButtonModule,
  ],
  templateUrl: './movie-form.component.html',
  styleUrl: './movie-form.component.scss',
})
export class MovieFormComponent implements OnInit {
  @Input() movie: Movie = {
    id: 0,
    title: '',
    overview: '',
    popularity: 0,
    release_date: '',
    cast: [],
    images: [],
  };
  isNew = true;
  image: string = '';
  actors: ActorRequestResponse = {
    actors: [],
    totalActors: 0,
    totalPages: 0,
    currentPage: 1,
  };
  limit = 4;
  searchTerm = '';
  cast: { id: number; name: string }[] = [];

  constructor(
    private moviesitoryService: MoviesitoryService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    try {
      this.route.paramMap.subscribe((params) => {
        this.movie.id = window.history.state.id;
        this.moviesitoryService
          .getMoviesService()
          .getMovieById(`${this.movie.id}`)
          .subscribe((res: MoviePopulated) => {
            this.movie = {
              ...res,
              cast: res.cast.map((actor) => actor.id),
              release_date: new Date(res.release_date)
                .toISOString()
                .split('T')[0],
            };
            res.cast.forEach((actor) => {
              this.cast.push({ id: actor.id, name: actor.name });
            });
          });
      });
    } catch (error) {
      console.log('Windows does not exist');
    }
    if (this.movie.id !== 0 && this.movie.id !== undefined) {
      this.isNew = false;
    }
    console.log(this.isNew);
    this.refreshActors();
  }

  refreshActors(): void {
    this.moviesitoryService
      .getActorsService()
      .getActors({
        page: this.actors.currentPage,
        limit: this.limit,
        search: this.searchTerm,
      })
      .subscribe((actors) => {
        this.actors = actors;
      });
  }

  addImage() {
    this.movie.images.push(this.image);
    this.image = '';
  }

  removeImage(image: string) {
    this.movie.images = this.movie.images.filter(
      (curr_img) => curr_img !== image
    );
  }

  pageChange(event: PageEvent) {
    this.limit = event.pageSize;
    this.actors.currentPage = event.pageIndex + 1;
    this.refreshActors();
  }

  addCast(data: { id: number; name: string }) {
    if (!this.movie.cast.includes(data.id)) {
      this.cast.push(data);
      this.movie.cast.push(data.id);
    }
  }

  removeCast(id: number) {
    this.movie.cast = this.movie.cast.filter((castId) => castId !== id);
    this.cast = this.cast.filter((actor) => actor.id !== id);
  }

  getCastName(id: number) {
    const castMember = this.cast.find((member) => member.id === id);
    return castMember ? castMember.name : 'Unknown';
  }

  submit() {
    this.movie.images = this.movie.images.filter((image) => image !== '');
    if (this.isNew) {
      this.movie.id = Math.floor(Math.random() * 10000000000000);
      this.moviesitoryService
        .getMoviesService()
        .addMovie(this.movie)
        .subscribe((res) => {
          window.location.href = 'all';
        });
    } else {
      this.moviesitoryService
        .getMoviesService()
        .updateMovie(this.movie)
        .subscribe((res) => {
          window.location.href = `movie/${this.movie.id}`;
        });
    }
  }
}
