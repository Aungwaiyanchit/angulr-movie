import { Component } from '@angular/core';
import { Tv, TvResponse } from 'src/app/models/movie';
import { ApiService } from 'src/app/shared/services/api.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-tv-shows',
  templateUrl: './tv-shows.component.html',
  styleUrls: ['./tv-shows.component.css']
})
export class TvShowsComponent {
    tvs: Tv[] = [];
    private subs = new SubSink();
    imageBaseUrl: string = 'https://image.tmdb.org/t/p/original/';
    total_pages?: number;
    current_page: number = 1;

    constructor(private apiService: ApiService) {}

    ngOnInit(): void {
      this.getMovies();
    }

    getMovies() {
        this.subs.sink = this.apiService.getTv('popular').subscribe({
          next: ((res: TvResponse) => {
              this.tvs = res.results;
              this.total_pages = res.total_pages;
          }),
          error: ((err) => {
            console.log(err)
          })
        })
      
    }

  getMoviePerPage(page: number) {
      this.subs.sink = this.apiService.getTv('popular', page).subscribe({
        next: ((res: TvResponse) => {
          this.tvs = res.results;
          this.total_pages = res.total_pages
        }),
        error: ((err) => {
          console.log(err)
        })
      })
    }
}
