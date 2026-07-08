import type { TaskKey } from "@/lib/site-config";

export const slot4TaskSupport = {
  article: true,
  classified: false,
  sbm: false,
  profile: true,
  pdf: false,
  listing: false,
  image: false,
} satisfies Record<TaskKey, boolean>;

export const slot4TaskNotes = {
  article: "Article archive and article detail pages",
  classified: "Classified archive and detail pages",
  sbm: "Curated bookmark archive and detail pages",
  profile: "Profile/user pages",
  pdf: "PDF/document archive and detail pages",
  listing: "Business listing archive and detail pages",
  image: "Image/gallery archive and detail pages",
} satisfies Record<TaskKey, string>;
