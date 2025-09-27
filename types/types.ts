export interface Apartment {
  planImage: string;
  title: string;
  size: number;
  floor: string;
  price: number;
}

export interface Range {
  min: number;
  max: number;
}

export interface ActiveFilter {
  rooms: string;
  price: Range;
  size: Range;
}
