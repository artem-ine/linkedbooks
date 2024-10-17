import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle("books");
  const books = await client.getAllByType("books", { fetchLinks: 'book.nombre' });
  console.log(books[0].data);

  return (
  <div>
      <SliceZone slices={page.data.slices} components={components} />
            <div>
        {/* {books.map((book) => (
          <div key={book.id} style={{ marginBottom: "20px" }}>
            <h2>{book.name}</h2>
            <p>{book.data.author.name}</p>
            <p>{book.summary}</p>
          </div>
        ))} */}
      </div>
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