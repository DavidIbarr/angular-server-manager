import { Component, OnInit } from '@angular/core';
import { CustomResponse } from './models/interfaces/custom-response';
import { AppState } from './models/enums/app-state';
import { Observable, catchError, map, of, startWith } from 'rxjs';
import { ServerService } from './service/server.service';
import { DataState } from './models/enums/data-state.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  appState$: Observable<AppState<CustomResponse>>;

  constructor(private serverService: ServerService) {}

  ngOnInit(): void {
    this.appState$ = this.serverService.servers$
    .pipe(
      map(response => {
        return { 
          dataState: DataState.LOADED_STATE, 
          appData: response 
        }
      }),
      startWith({
          dataState: DataState.LOADING_STATE
      }),
      catchError((error: string) => {
        return of({
          dataState: DataState.ERROR_STATE, error
        })
      })
    )

    throw new Error('Method not implemented.');
  }
  
}
