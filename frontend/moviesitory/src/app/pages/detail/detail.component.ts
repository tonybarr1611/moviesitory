import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actor, ActorPopulated } from '../../models/actor.model';
import { Movie, MoviePopulated } from '../../models/movie.model';
import { MoviesitoryService } from '../../services/moviesitory.service';
import { CarouselComponent } from '../../components/carousel/carousel.component';
import { CardComponent } from '../../components/card/card.component';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

type Detail = {
  id: number;
  title: string; // Either movie title or actor name
  description: string; // Description of the movie or biography of the actor
  images: string[]; // Images of the movie or actor
  popularity: number; // Popularity of the movie or actor
  year: number; // Year of the movie or birth year of the actor
  related: (Actor | Movie)[]; // Related actors or movies
};

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    CommonModule,
    CarouselComponent,
    CardComponent,
    MatPaginatorModule,
    MatIconModule,
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
})
export class DetailComponent implements OnInit {
  detail: Detail = {
    id: 0,
    title: '',
    description: '',
    images: [],
    popularity: 0,
    year: 0,
    related: [],
  };
  detailType: string = 'movie';
  id: string = '';

  pagedRelated: (Actor | Movie)[] = [];
  page_size = 4;
  current_page = 0;

  constructor(
    private router: Router,
    private moviesitoryService: MoviesitoryService
  ) {}

  ngOnInit(): void {
    try {
      const path = window.location.pathname.split('/').reverse();
      this.id = path[0];
      this.detailType = path[1] ? path[1] : 'movie';
    } catch (error) {
      console.log('Did not find search term in URL');
    }

    switch (this.detailType) {
      case 'movie':
        this.moviesitoryService
          .getMoviesService()
          .getMovieById(this.id)
          .subscribe((movie) => {
            this.updateDetail(movie);
            this.updatePagedItems();
          });
        break;
      case 'actor':
        this.moviesitoryService
          .getActorsService()
          .getActorById(this.id)
          .subscribe((actor) => {
            this.updateDetail(actor);
            this.updatePagedItems();
          });
        break;
    }
  }

  updateDetail(response: ActorPopulated | MoviePopulated): void {
    this.detail.id = response.id;
    this.detail.title =
      (response as ActorPopulated).name || (response as MoviePopulated).title;
    this.detail.description =
      (response as ActorPopulated).biography ||
      (response as MoviePopulated).overview;
    this.detail.images = (response as ActorPopulated).images;
    this.detail.popularity = (response as ActorPopulated).popularity;
    this.detail.year = parseInt(
      (
        (response as ActorPopulated).birthdate ||
        (response as MoviePopulated).release_date ||
        '1900'
      ).slice(0, 4)
    );
    this.detail.related =
      (response as ActorPopulated).movies || (response as MoviePopulated).cast;
  }

  onPageChange(event: PageEvent) {
    this.page_size = event.pageSize;
    this.current_page = event.pageIndex;
    this.updatePagedItems();
  }

  updatePagedItems() {
    const startIndex = this.current_page * this.page_size;
    const endIndex = startIndex + this.page_size;
    this.pagedRelated = this.detail.related.slice(startIndex, endIndex);
  }

  editDetail() {
    switch (this.detailType) {
      case 'movie':
        this.router.navigateByUrl('admin/movie/edit', {
          state: this.detail as unknown as Movie,
        });
        break;
      case 'actor':
        this.router.navigateByUrl('admin/actor/edit', {
          state: this.detail as unknown as Actor,
        });
    }
  }

  deleteDetail() {
    switch (this.detailType) {
      case 'movie':
        this.moviesitoryService
          .getMoviesService()
          .deleteMovieById(`${this.detail.id}`)
          .subscribe((res) => this.router.navigateByUrl('all'));
        break;
      case 'actor':
        this.moviesitoryService
          .getActorsService()
          .deleteActorById(`${this.detail.id}`)
          .subscribe((res) => this.router.navigateByUrl('all'));
    }
  }
}
