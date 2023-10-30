import Head from "next/head";
import styles from "@/styles/Contact.module.css";
import { resolveContent } from "@/lib/decap";
import { Contact_Info } from "@/types/netlify-types";
import { ContentType, DecapProps } from "@/types/decap";
import { GetStaticPropsContext } from "next";

export default function Contact({ frontmatter }: DecapProps<Contact_Info>) {
  return (
    <>
      <Head>
        <title>Pivní háj | Kontakt</title>
      </Head>
      <span>Email: {frontmatter.email}</span>
      <span>Tel: {frontmatter.phone}</span>
    </>
  );
}

export const getStaticProps = async (context: GetStaticPropsContext) => ({
  props: await resolveContent<Contact_Info>(
    ContentType.ContactInfo,
    context?.params?.slug
  ),
});
