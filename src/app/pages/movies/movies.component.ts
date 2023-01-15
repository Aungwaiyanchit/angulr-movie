import { Component, OnInit, OnDestroy } from '@angular/core';
import { Movie, IResponse } from 'src/app/models/movie';
import { ApiService } from 'src/app/shared/services/api.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit, OnDestroy{

    movies: Movie[] = [];
    private subs = new SubSink();
    imageBaseUrl: string = 'https://image.tmdb.org/t/p/original/';
    total_pages?: number;
    current_page: number = 1;

    constructor(private apiService: ApiService) {}

    ngOnInit(): void {
      this.getMovies();
    }

    ngOnDestroy(): void {
      this.subs.unsubscribe();
    }

    getMovies() {
      this.subs.sink = this.apiService.getMovies('popular').subscribe({
        next: ((res: IResponse) => {
          this.movies = res.results;
          this.total_pages = res.total_pages;
        })
      })
    }

    getMoviePerPage(page: number) {
      this.subs.sink = this.apiService.getMovies('popular', page).subscribe({
        next: ((res: IResponse) => {
          this.movies = res.results
          this.total_pages = res.total_pages;
        })
      })
    }
}
