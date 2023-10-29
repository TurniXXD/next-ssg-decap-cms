import { ContentType, DecapProps } from "@/types/decap";
import { StaticProps } from "@/types/shared";
import { promises as fs } from "fs";
import matter from "gray-matter";
import path from "path";

export const POSTS_PATH = "content/posts";

export const resolveContentPaths = async (
  contentType: ContentType
): Promise<Array<StaticProps>> => {
  const postsDirectory = path.join(process.cwd(), contentType);
  const filenames = await fs.readdir(postsDirectory);
  const paths = filenames.map((file) => {
    const filename = file.slice(0, file.indexOf("."));
    return { params: { slug: filename } };
  });

  return paths;
};

export const resolveContent = async <T>(
  contentType: ContentType,
  filename: string
): Promise<DecapProps<T>> => {
  const postsDirectory = path.join(process.cwd(), contentType);
  const filePath = path.join(postsDirectory, `${filename}.md`);
  const fileContent = await fs.readFile(filePath, "utf8");
  const fileContentParsed = matter(fileContent);

  return {
    frontmatter: fileContentParsed.data as T,
    markdown: fileContentParsed.content,
  };
};
