export type ProjectStatus = "draft" | "published";

export type ProjectType = {
  id?: string;
  title: string;
  // The publish gate. Public endpoints only ever return "published"; drafts
  // appear in the dashboard list.
  status: ProjectStatus;
  // Manual sort key, ascending, applied before newest-first.
  order: number;
  summary: string;
  // Public URL segment. Present on list payloads too: the sitemap and JSON-LD
  // build project URLs from list data.
  slug: string;
  frontEndTech: string[] | string;
  backEndTech: string[] | string;
  // A project may be frontend-only, undeployed, or have no public repo. The API
  // omits these rather than sending "".
  liveLink?: string;
  frontEndRepo?: string;
  backEndRepo?: string;
  // Only the single-project endpoint returns this; list payloads omit it.
  projectDetails?: string;
  showOnHomepage?: boolean;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type ProjectFormValues = {
  title: string;
  // Blank means "derive it from the title" on create, "leave it alone" on edit.
  slug: string;
  status: ProjectStatus;
  order: number;
  summary: string;
  frontEndTech: string;
  backEndTech: string;
  liveLink: string;
  frontEndRepo: string;
  backEndRepo: string;
  projectDetails: string;
  showOnHomepage: boolean;
  image?: FileList;
};
