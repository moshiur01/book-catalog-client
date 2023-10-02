export interface IUser {
  name: string;
  email: string;
}

export interface IBookResponse {
  status?: string;
  title: string;
  author: string;
  genre: string;
  publication: string;
  creator: string;
  image: string;
  _id: string;
}
