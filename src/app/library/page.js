import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle("books");


  return (
  <div>
      <SliceZone slices={page.data.slices} components={components} />
  </div>
  )
}

export async function generateMetadata() {
  const client = createClient();
  const page = await client.getSingle("books");

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}