import { POSTS_DIR, CONTACT_INFO_DIR } from "@/lib/decap";

export enum ContentType {
  Posts = POSTS_DIR,
  ContactInfo = CONTACT_INFO_DIR,
}

export interface DecapProps<T> {
  frontmatter: T;
  markdown: string;
}