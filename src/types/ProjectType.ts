export type ProjectType = {
  _id?: string;
  title: string;
  summary: string;
  frontEndTech: string[] | string;
  backEndTech: string[] | string;
  liveLink: string;
  frontEndRepo: string;
  backEndRepo: string;
  projectDetails: string;
  showOnHomepage?: boolean;
  image: File | null;
  createdAt?: Date;
  updatedAt?: Date;
};
