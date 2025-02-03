import { Routes } from '@angular/router';
import { SearchComponent } from './pages/search/search.component';
import { MoviesSearchComponent } from './pages/movies-search/movies-search.component';
import { ActorsSearchComponent } from './pages/actors-search/actors-search.component';
import { DetailComponent } from './pages/detail/detail.component';
import { MovieFormComponent } from './pages/forms/movie-form/movie-form.component';
import { ActorFormComponent } from './pages/forms/actor-form/actor-form.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

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
    path: 'admin',
    children: [
      {
        path: 'movie',
        children: [
          { path: 'add', component: MovieFormComponent },
          { path: 'edit', component: MovieFormComponent },
        ],
      },
      {
        path: 'actor',
        children: [
          { path: 'add', component: ActorFormComponent },
          { path: 'edit', component: ActorFormComponent },
        ],
      },
    ],
  },
  {
    path: 'user',
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
    ],
  },
];
