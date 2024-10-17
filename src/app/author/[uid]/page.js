import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

import { PrismicNextLink } from "@prismicio/next";

export default async function Page({ params }) {
  const client = createClient();
  const page = await client.getByUID("author", params.uid);
  const response = await client.getByUID("author", params.uid, {
    graphQuery: `
    {
      author {
        slices {
          ...on author_page {
            variation {
              ...on default {
                primary {
                  books_written {
                    wrote {
                      ...on book {
                        ...bookFields
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `});

  const booksWritten = response.data.slices[0]?.primary?.books_written;
  console.log("wrote:", booksWritten)

  return (
    <div className="author-page">
      <SliceZone slices={page.data.slices} components={components} />
      <div>
        <h2>Books Written</h2>
        <ul>
          {booksWritten.map((book, index) => (
            <li key={index}>
              <PrismicNextLink field={book.wrote}>
                {book.wrote.data.slices[0]?.primary?.name[0].text}
              </PrismicNextLink>
            </li>
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