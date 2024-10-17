/**
 * @typedef {import("@prismicio/client").Content.LibrarySlice} LibrarySlice
 * @typedef {import("@prismicio/react").SliceComponentProps<LibrarySlice>} LibraryProps
 * @param {LibraryProps}
 */

import { PrismicRichText } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";

const Library = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="library"
    >
      <PrismicRichText field={slice.primary.heading} />
      {slice.primary.books_read.map((item) => (
        <PrismicNextLink field={item.book_read}>
          Link
        </PrismicNextLink>))}
    </section>
  );
};

export default Library;
