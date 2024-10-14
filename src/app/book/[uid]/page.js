import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

export default async function Page({ params }) {
  const client = createClient();
  const page = await client.getByUID("book", params.uid);

  return <SliceZone slices={page.data.slices} components={components} />;
}

export async function generateMetadata({ params }) {
  const client = createClient();
  const page = await client.getByUID("book", params.uid);

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}