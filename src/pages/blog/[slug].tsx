import { promises as fs } from "fs";
import ReactMarkdown from "react-markdown";
import matter from "gray-matter";
import styles from "./Blog.module.css";
import path from "path";
import { Blog } from "@/types/netlify-types";

export default function Blog({
  frontmatter,
  markdown,
}: {
  frontmatter: Blog;
  markdown: string;
}) {
  return (
    <div className={styles["container"]}>
      <h1 className={styles["title"]}>{frontmatter.title}</h1>
      <span>{frontmatter.date}</span>
      <hr />
      <div className={styles["wrapper"]}>
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
    </div>
  );
}

export const getStaticProps = async ({
  params: { slug },
}: {
  params: { slug: string };
}) => {
  const postsDirectory = path.join(process.cwd(), "src/content/blog");
  const filePath = path.join(postsDirectory, `${slug}.md`);
  const fileContent = await fs.readFile(filePath, "utf8");
  const fileContentParsed = matter(fileContent);

  let frontmatter = fileContentParsed.data;
  const markdown = fileContentParsed.content;

  return {
    props: { frontmatter, markdown },
  };
};

export async function getStaticPaths() {
  const postsDirectory = path.join(process.cwd(), "src/content/blog");
  const filenames = await fs.readdir(postsDirectory);
  const paths = filenames.map((file) => {
    const filename = file.slice(0, file.indexOf("."));
    return { params: { slug: filename } };
  });

  return {
    paths,
    fallback: false, // This shows a 404 page if the page is not found
  };
}
