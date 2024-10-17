/**
 * @typedef {import("@prismicio/client").Content.BookPageSlice} BookPageSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<BookPageSlice>} BookPageProps
 * @param {BookPageProps}
 */

import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import "../../app/globals.css";

const BookPage = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="book-page"
    >
      <PrismicNextImage field={slice.primary.cover} />
      <PrismicRichText field={slice.primary.name} />
      <PrismicRichText field={slice.primary.summary} />
      {/* <PrismicNextLink field={slice.primary.written_by}>
        author
      </PrismicNextLink> */}
    </section>
  );
};

export default BookPage;
