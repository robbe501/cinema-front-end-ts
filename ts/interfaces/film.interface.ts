export interface Film {
    filmId: number,
    image: string,
    length: string,
    plot: string,
    rating: number,
    releaseDate: Date,
    title: string,

    [key: string]: any;
}

