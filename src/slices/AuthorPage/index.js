/**
 * @typedef {import("@prismicio/client").Content.AuthorPageSlice} AuthorPageSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<AuthorPageSlice>} AuthorPageProps
 * @param {AuthorPageProps}
 */

import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import "../../app/globals.css";

const AuthorPage = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <PrismicRichText field={slice.primary.name} />
      <PrismicRichText field={slice.primary.bio} />
      {/* <PrismicNextLink field={slice.primary.books_written}>
        Links
      </PrismicNextLink> */}
    </section>
  );
};

export default AuthorPage;
