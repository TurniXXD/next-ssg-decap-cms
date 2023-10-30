import { ContentType, DecapProps } from "@/types/decap";
import { StaticProps } from "@/types/shared";
import { promises as fs } from "fs";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import path from "path";

export const POSTS_DIR = "posts";
export const CONTACT_INFO_DIR = "contact-info";
export const PRODUCTS_DIR = "products";

export const resolveContentPaths = async (
  contentType: ContentType
): Promise<Array<StaticProps>> => {
  const postsDirectory = path.join(process.cwd(), "content/" + contentType);
  const filenames = await fs.readdir(postsDirectory);
  const paths = filenames.map((file) => {
    const filename = file.slice(0, file.indexOf("."));
    return { params: { slug: filename } };
  });

  return paths;
};

export const resolveContent = async <T>(
  contentType: ContentType,
  filename: string | string[] | undefined
): Promise<DecapProps<T>> => {
  const postsDirectory = path.join(process.cwd(), "content/" + contentType);
  try {
    const filePath = path.join(postsDirectory, `${filename || contentType}.md`);
    const fileContent = await fs.readFile(filePath, "utf8");
    const fileContentParsed = matter(fileContent);

    return {
      frontmatter: fileContentParsed.data as T,
      markdown: fileContentParsed.content,
    };
  } catch {
    return notFound();
  }
};
