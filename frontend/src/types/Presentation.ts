export interface TextBox {
  width: number;
  height: number;
  text: string;
  fontSize: number;
  color: string;
  x: number;
  y: number;
}

export interface Image {
  width: number;
  height: number;
  url: string;
  alt: string;
  x: number;
  y: number;
}

export interface Video {
  width: number;
  height: number;
  url: string;
  autoPlay: boolean;
  x: number;
  y: number;
}

export interface Slide {
  id: number;
  content: string;
  textBoxes?: TextBox[];
  images?: Image[];
  videos?: Video[];
}

export interface Presentation {
  id: number;
  name: string;
  description: string;
  slides: Slide[];
  thumbnail?: string;
}
