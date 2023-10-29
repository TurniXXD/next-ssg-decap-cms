import { POSTS_PATH } from "@/lib/decap";

export enum ContentType {
  Posts = POSTS_PATH,
}

export interface DecapProps<T> {
  frontmatter: T;
  markdown: string;
}