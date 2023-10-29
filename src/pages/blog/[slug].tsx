import ReactMarkdown from "react-markdown";
import styles from "./Blog.module.css";
import { Posts } from "@/types/netlify-types";
import { resolveContent, resolveContentPaths } from "@/lib/decap";
import { StaticProps } from "@/types/shared";
import { ContentType, DecapProps } from "@/types/decap";

export default function Blog({ frontmatter, markdown }: DecapProps<Posts>) {
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

export const getStaticProps = async ({ params: { slug } }: StaticProps) => ({
  props: await resolveContent<Posts>(ContentType.Posts, slug),
});

export const getStaticPaths = async () => ({
  paths: await resolveContentPaths(ContentType.Posts),
  fallback: false,
});
