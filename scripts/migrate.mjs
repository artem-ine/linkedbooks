import * as prismic from "@prismicio/client";
import fs from "fs";
import path from "path";



const writeClient = prismic.createWriteClient("linkedbooks", {
  writeToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoibWFjaGluZTJtYWNoaW5lIiwiZGJpZCI6ImxpbmtlZGJvb2tzLWQzZjE2MDExLWNhMmYtNDhlNC05NzI3LTRhYmU3MmFiYzlkOF81IiwiZGF0ZSI6MTc0MzA4NTk0OCwiZG9tYWluIjoibGlua2VkYm9va3MiLCJhcHBOYW1lIjoid2VicCB0ZXN0IiwiaWF0IjoxNzQzMDg1OTQ4fQ.5QM9nIJ0nELfV1ZsL-eaR9kI4tRgpN9_AW2ShrLZwbc",
});


const migration = prismic.createMigration();

migration.createDocument(
  {
    type: 'book',
    uid: 'test-hyperspan',
    lang: 'en-gb',
    data: {
      title: [
        {
          type: "heading1",
          text: "Hyperlink",
          spans: [],
        }
      ],
      body_content: [
        {
          type: "paragraph",
          text: "Check out our blog post for more information on the topic.",
          spans: [
            {
              start: 13,
              end: 22,
              type: "hyperlink",
              data: {
                id: "YSYcDBAAACMAic6a",
                type: "blog_post",
                uid: "social-media-management",
                link_type: "Document",
              },
            },
          ],
          direction: "ltr",
        },
      ],
    },
  },
  "Test New Mig" // title used in Prismic UI
);

await writeClient.migrate(migration, {
  reporter: (event) => console.log(event),
});
