import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import {
  Actor,
  ActorPopulated,
  ActorRequestResponse,
  ActorSearchParams,
} from '../../models/actor.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ActorsService {
  private url = environment.baseUrl;
  constructor(private httpClient: HttpClient) {}

  public getActors(
    params: ActorSearchParams
  ): Observable<ActorRequestResponse> {
    return this.httpClient.get<ActorRequestResponse>(`${this.url}/actors`, {
      params,
    });
  }

  public getActorById(id: string): Observable<ActorPopulated> {
    return this.httpClient.get<ActorPopulated>(`${this.url}/actors/${id}`);
  }

  public updateActor(actor: Actor) {
    if (!actor.id) {
      throw new Error('El id es necesario');
    }
    return this.httpClient.put(`${this.url}/actors/${actor.id}`, actor);
  }

  public deleteActorById(id: string) {
    return this.httpClient.delete(`${this.url}/actors/${id}`);
  }

  public addActor(actor: Actor) {
    actor.id = Math.floor(Math.random() * 10000000000);
    return this.httpClient.post(`${this.url}/actors`, actor);
  }
}
