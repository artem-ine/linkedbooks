import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

import { PrismicNextLink } from "@prismicio/next";

<script async defer src="https://static.cdn.prismic.io/prismic.js?new=true&repo=linkedbooks"></script>

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle("books");
  const response = await client.getSingle("books", {
    graphQuery: `
    {
      books {
        slices {
          ...on library {
            variation {
              ...on default {
                primary {
                  books_read {
                    book_read {
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

  const booksRead = response.data.slices[0]?.primary?.books_read;
  // console.log("read:", booksRead)

    const test = await client.getSingle("books", {
    graphQuery: `
    {
      books {
        slices {
          ...on library {
            variation {
              ...on default {
                primary {
                  books_read
                }
              }
            }
          }
        }
      }
    }
  `});
  console.log("test:", test.data)


  return (
    <div>
  <div>
    {page.data.test_repeat.map((item, index) => (
      <div key={index}>
        {item.static_string}
      </div>
    ))}
  </div>
      <SliceZone slices={page.data.slices} components={components} />
      <div className="library">
        <h2>Books Read</h2>
        <ul>
          {booksRead.map((book, index) => (
            <li key={index}>
              <PrismicNextLink field={book.book_read}>
                {book.book_read.data.slices[0]?.primary?.name[0].text}, by {book.book_read.data.slices[0]?.primary?.name[0].text}
              </PrismicNextLink>
            </li>
          ))}
        </ul>
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