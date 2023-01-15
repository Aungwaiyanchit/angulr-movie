import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieDetail } from 'src/app/models/movie';
import { ApiService } from 'src/app/shared/services/api.service';
import { SubSink } from 'subsink/dist/subsink';
import * as moment from 'moment';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit, OnDestroy {

  movieId?: string | null;
  movieDetail?: MovieDetail | null = null;
  imageBaseUrl: string = 'https://image.tmdb.org/t/p/original/';
  casts: any[] = []
  errorMessage: string = '';
  private subs = new SubSink();

  constructor(private route: ActivatedRoute, private api: ApiService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      this.movieId = paramMap.get('id');
    })
    if (this.movieId !== null && this.movieId !== undefined) {
      this.getMovieDetail(this.movieId);
      this.getCast(this.movieId);
    }
  }

  ngOnDestroy(): void {
    this.subs.sink?.unsubscribe();
  }

  getUrl() {
    return `url(${this.imageBaseUrl}${this.movieDetail?.backdrop_path})`
  }

  getMovieDetail(movieId: string) {
    this.subs.sink = this.api.getMovieDetail(parseInt(movieId)).subscribe({
      next: (reponse: MovieDetail) => { 
        this.movieDetail = reponse;
      },
      error: (err) => {
        this.errorMessage = err;
        console.log(err);
      }
    });
  }

  getCast(id: string) {
    this.subs.sink = this.api.getCredits(parseInt(id)).subscribe((response: any) => {
      this.casts = response.cast.slice(0, 15);
    })
  }

  // parseRuntime(totalMin: number) {
  //   let duration = moment.duration(totalMin, 'minutes');
  //   let hour = duration.hours() > 1 ? `${duration.hours()}h` : '';
  //   let min = duration.minutes() > 1 ? `${duration.minutes()}m`: '';
  //   let ss = duration.seconds() > 1 ? `${duration.seconds()}s`: '';
  //   return `${hour} ${min} ${ss}`;
  // }

} 
