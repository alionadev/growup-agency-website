import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: "g6loit8r",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});
