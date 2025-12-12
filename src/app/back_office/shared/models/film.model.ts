import Category from "./category.model";

export class Film {
  id!: string;
  title!: string;
  category!: Category | string;
  description!: string;
  Producer !: string;
  hero !:string;
  imageHero!:string;
  image!: string;
  rating!: number;
}
