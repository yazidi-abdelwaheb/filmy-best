import Category from './category.model';

export class BaseFilmSerie {
  id!: string;
  title!: string;
  categories!: Category[];
  description!: string;
  image!: string[];
  rating!: number;
}
