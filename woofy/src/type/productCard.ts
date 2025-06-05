export interface ProductCardProps {
  /** URL or path to the product’s image */
  imageSrc: string;
  /** The product’s title or name */
  title: string;
  /** The product’s price, already formatted as a string */
  price: string;
}