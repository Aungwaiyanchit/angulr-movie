export interface IResponse {
    page:          number;
    results:       Movie[];
    total_results: number;
    total_pages:   number;
}

export interface TvResponse {
    page:          number;
    results:       Tv[];
    total_results: number;
    total_pages:   number;
}
 
export interface Movie {
    poster_path:       string;
    adult:             boolean;
    overview:          string;
    release_date:      Date;
    genre_ids:         number[];
    id:                number;
    original_title:    string;
    original_language: OriginalLanguage;
    title:             string;
    backdrop_path:     string;
    popularity:        number;
    vote_count:        number;
    video:             boolean;
    vote_average:      number;
}

export interface Tv {
    poster_path:       string;
    popularity:        number;
    id:                number;
    backdrop_path:     string;
    vote_average:      number;
    overview:          string;
    first_air_date:    Date;
    origin_country:    OriginCountry[];
    genre_ids:         number[];
    original_language: OriginalLanguage;
    vote_count:        number;
    name:              string;
    original_name:     string;
}

export enum OriginalLanguage {
    En = "en",
    Ja = "ja",
}

export enum OriginCountry {
    GB = "GB",
    Jp = "JP",
    Us = "US",
}

export interface MovieDetail {
    adult:                 boolean;
    backdrop_path:         string;
    belongs_to_collection: null;
    budget:                number;
    genres:                Genre[];
    homepage:              string;
    id:                    number;
    imdb_id:               string;
    original_language:     string;
    original_title:        string;
    overview:              string;
    popularity:            number;
    poster_path:           null;
    production_companies:  ProductionCompany[];
    production_countries:  ProductionCountry[];
    release_date:          Date;
    revenue:               number;
    runtime:               number;
    spoken_languages:      SpokenLanguage[];
    status:                string;
    tagline:               string;
    title:                 string;
    video:                 boolean;
    vote_average:          number;
    vote_count:            number;
}

export interface Genre {
    id:   number;
    name: string;
}

export interface ProductionCompany {
    id:             number;
    logo_path:      null | string;
    name:           string;
    origin_country: string;
}

export interface ProductionCountry {
    iso_3166_1: string;
    name:       string;
}

export interface SpokenLanguage {
    iso_639_1: string;
    name:      string;
}