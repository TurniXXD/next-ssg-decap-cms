import ReactMarkdown from "react-markdown";
import styles from "./Products.module.css";
import Head from "next/head";
import { Posts } from "@/types/netlify-types";
import { resolveContent, resolveContentPaths } from "@/lib/decap";
import { ContentType, DecapProps } from "@/types/decap";
import { GetStaticPropsContext } from "next";

export default function Blog({ frontmatter, markdown }: DecapProps<Posts>) {
  return (
    <>
      <Head>
        <title>{`Pivní háj | ${frontmatter.title}`}</title>
      </Head>
      <div className={styles["container"]}>
        <h1 className={styles["title"]}>{frontmatter.title}</h1>
        <span>{frontmatter.date}</span>
        <hr />
        <div className={styles["wrapper"]}>
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>
      </div>
    </>
  );
}

export const getStaticProps = async (context: GetStaticPropsContext) => ({
  props: await resolveContent<Posts>(ContentType.Products, context?.params?.slug),
});

export const getStaticPaths = async () => ({
  paths: await resolveContentPaths(ContentType.Products),
  fallback: false,
});
