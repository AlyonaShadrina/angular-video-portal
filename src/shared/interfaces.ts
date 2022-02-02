export interface ICourse {
  id: number;
  title: string;
  creation_date: string;
  duration: number;
  description: string;
  topRated: boolean;
}

export interface IUser {
  id: number;
  first_name: string;
  last_name: string;
}
