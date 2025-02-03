import { Routes } from '@angular/router';
import { SearchComponent } from './pages/search/search.component';
import { MoviesSearchComponent } from './pages/movies-search/movies-search.component';
import { ActorsSearchComponent } from './pages/actors-search/actors-search.component';
import { DetailComponent } from './pages/detail/detail.component';
import { MovieFormComponent } from './pages/forms/movie-form/movie-form.component';
import { ActorFormComponent } from './pages/forms/actor-form/actor-form.component';

export const routes: Routes = [
  {
    path: '',
    component: SearchComponent,
  },
  {
    path: 'all',
    component: SearchComponent,
  },
  {
    path: 'all/:searchTerm',
    component: SearchComponent,
  },
  {
    path: 'movies',
    component: MoviesSearchComponent,
  },
  {
    path: 'movies/:searchTerm',
    component: MoviesSearchComponent,
  },
  {
    path: 'actors',
    component: ActorsSearchComponent,
  },
  {
    path: 'actors/:searchTerm',
    component: ActorsSearchComponent,
  },
  {
    path: 'actor/:id',
    component: DetailComponent,
  },
  {
    path: 'movie/:id',
    component: DetailComponent,
  },
  {
    path: 'admin/movie/add',
    component: MovieFormComponent,
  },
  {
    path: 'admin/actor/add',
    component: ActorFormComponent,
  },
  {
    path: 'admin/movie/edit',
    component: MovieFormComponent,
  },
  {
    path: 'admin/actor/edit',
    component: ActorFormComponent,
  },
];
