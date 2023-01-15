import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IResponse, MovieDetail, TvResponse } from '../../models/movie';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly baseUrl: string = "https://api.themoviedb.org/3/";
  private readonly apiKey: string = "c9e1e6aa29a0a71e75f1283b538df6ce";
  constructor(private http: HttpClient) { }

  private errorHandler (err: HttpErrorResponse){
    let errorMessage: string = '';
    if (err.status === 0) {
      console.log('network error.')
    } else if (err.status === 404) {
      errorMessage = err.error?.status_message;
    }
    return throwError(() => {
      return errorMessage;
    })
  }

  getMovies(option: string, page: number = 1) {
    return this.http.get<IResponse>(`${this.baseUrl}/movie/${option}?api_key=${this.apiKey}&page=${page}`)
  }

  getTv(option: string, page: number = 1) {
    return this.http.get<TvResponse>(`${this.baseUrl}/tv/${option}?api_key=${this.apiKey}&page=${page}`)
  }

  getMovieDetail(id: number) {
    return this.http.get<MovieDetail>(`${this.baseUrl}/movie/${id}?api_key=${this.apiKey}`).pipe(catchError(this.errorHandler));
  }

  getCredits(id: number) {
    return this.http.get<any>(`${this.baseUrl}/movie/${id}/credits?api_key=${this.apiKey}`)
  }
}
