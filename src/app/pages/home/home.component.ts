import { Component, OnDestroy, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { ApiService } from 'src/app/shared/services/api.service';
import { IResponse } from 'src/app/models/movie';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy{

  popularMovies: Movie[] = [];
  nowPlayingMovies: Movie[] = [];
  imageBaseUrl: string = 'https://image.tmdb.org/t/p/original/';
  slides: Movie[] = [];
  private subs = new SubSink();

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.getPopluar();
    this.getNowPlaying();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();  
  }

  getPopluar() {
    this.subs.sink = this.api.getMovies('popular').subscribe((response: IResponse) => {
      this.popularMovies = response.results;
      this.slides = response.results.slice(0, 6);
    })
  }

  getNowPlaying() {
    this.subs.sink = this.api.getMovies('now_playing').subscribe((response: IResponse) => {
      this.nowPlayingMovies = response.results;
    })
  }



}
