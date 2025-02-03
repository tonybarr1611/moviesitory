import { Component, Input } from '@angular/core';
import { ActorRequestResponse } from '../../models/actor.model';
import { MoviesitoryService } from '../../services/moviesitory.service';
import { CardComponent } from '../../components/card/card.component';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { isAdmin } from '../../utils/admin';

@Component({
  selector: 'actors-search',
  standalone: true,
  imports: [CommonModule, CardComponent, MatPaginatorModule, MatIconModule],
  templateUrl: './actors-search.component.html',
  styleUrl: './actors-search.component.scss',
})
export class ActorsSearchComponent {
  @Input() searchTerm: string = '';
  @Input() results: number = 5;
  @Input() limit: number = 5;
  actors: ActorRequestResponse = {
    actors: [],
    totalActors: 0,
    totalPages: 0,
    currentPage: 0,
  };
  currentLimit = this.limit;
  currentPage = 1;

  readonly isAdmin = isAdmin;

  constructor(
    private moviesitoryService: MoviesitoryService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => {
      if (params['searchTerm']) {
        this.searchTerm = params['searchTerm'];
      }
    });
  }

  ngOnInit(): void {
    this.updateSearch();
  }

  addActor() {
    window.location.href = 'admin/actor/add';
  }

  pageChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.currentLimit = event.pageSize;
    this.updateSearch();
  }

  updateSearch() {
    this.moviesitoryService
      .getActorsService()
      .getActors({
        search: this.searchTerm,
        limit: this.currentLimit,
        page: this.currentPage,
      })
      .subscribe((actors) => {
        this.actors = actors;
      });
  }
}
