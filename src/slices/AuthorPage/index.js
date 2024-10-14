/**
 * @typedef {import("@prismicio/client").Content.AuthorPageSlice} AuthorPageSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<AuthorPageSlice>} AuthorPageProps
 * @param {AuthorPageProps}
 */
const AuthorPage = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for author_page (variation: {slice.variation})
      Slices
    </section>
  );
};

export default AuthorPage;
