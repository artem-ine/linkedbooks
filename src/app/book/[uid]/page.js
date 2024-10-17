import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { PrismicNextLink } from "@prismicio/next";

export default async function Page({ params }) {
  const client = createClient();
  const page = await client.getByUID("book", params.uid);
const response = await client.getByUID("book", params.uid, {
  graphQuery: `
    {
      book {
        ...bookFields
        author {
          ...on author {
            ...authorFields
          }
        }
      }
    }
  `
});
    const { data: bookData } = response;
  const author = bookData.author;

  console.log("response", response)
  console.log("author", author)
  console.log("Author Data:", author.data);


  return (
    <div>
      {/* Render the SliceZone with slices */}
      <SliceZone slices={bookData.slices} components={components} />

      {/* Display the author's name and link to their custom type page */}
      {author && (
        <div style={{ marginTop: "20px" }}>
          <p>Author link:</p> <PrismicNextLink field={author}>Page</PrismicNextLink>
        </div>
      )}
    </div>
  );
}

export async function generateMetadata({ params }) {
  const client = createClient();
  const page = await client.getByUID("book", params.uid);

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}