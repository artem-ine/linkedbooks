import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { PrismicNextLink } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";

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
    
  const authorName = await client.getByUID("author", author.uid)
  // console.log("name", authorName.data.slices[0]?.primary?.name[0].text)

  return (
    <div className="book-page">
      <SliceZone slices={bookData.slices} components={components} />
      {author && (
        <div style={{ marginTop: "20px" }}>
          <p>Written by: {authorName.data.slices[0]?.primary?.name[0].text}</p>
          <PrismicNextLink field={author}>Author Page</PrismicNextLink>
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