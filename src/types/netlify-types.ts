/* eslint-disable */
/* tslint:disable */

export interface Blog {
  title: string;
  date: string;
}

export interface Home_Cats {
  name: string;
  description: string;
}

export interface Home {
  title: string;
  date: string;
  cats: Home_Cats[];
}
