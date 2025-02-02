import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SearchComponent } from './pages/search/search.component';
import { MoviesSearchComponent } from './pages/movies-search/movies-search.component';
import { ActorsSearchComponent } from './pages/actors-search/actors-search.component';

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
];
