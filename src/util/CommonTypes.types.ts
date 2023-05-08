export interface Track {
  id: string;
  name: string;
  artist: string;
  album: string;
  uri: string
  cover: string;
  preview: string;
}

export interface User {
  id:string;
  name: string;
  display_name:string;
  followers?: {
    href:string; 
    total:number;
  };
  url?:string;
  uri?:string;
}