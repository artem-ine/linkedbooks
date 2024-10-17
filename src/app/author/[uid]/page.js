import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

export default async function Page({ params }) {
  const client = createClient();
  const page = await client.getByUID("author", params.uid);
  const BooksWritten = await client.getByType("book", { fetchLinks: 'book.name' })
  console.log(BooksWritten)

  return (
    <div>
    <SliceZone slices={page.data.slices} components={components} />
          <div>
        <h2>Books Written</h2>
        <ul>
          {BooksWritten.results.map((book, index) => (
            <li key={index}>{book.data.id}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export async function generateMetadata({ params }) {
  const client = createClient();
  const page = await client.getByUID("author", params.uid);

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}