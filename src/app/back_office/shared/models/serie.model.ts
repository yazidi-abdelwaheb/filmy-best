import { BaseFilmSerie } from "./baseFilmSerie.model";
export class Serie extends BaseFilmSerie {
  episodeNbr !: number;
  episodes !: Episode[];
}


export class Episode {
  id?:string;
  image!:string;
  index!:number;
  rating!:number;
  duration!:number

}
