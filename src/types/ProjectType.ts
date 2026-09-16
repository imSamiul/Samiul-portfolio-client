export type ProjectType = {
  id?: string;
  title: string;
  summary: string;
  frontEndTech: string[] | string;
  backEndTech: string[] | string;
  liveLink: string;
  frontEndRepo: string;
  backEndRepo: string;
  projectDetails: string;
  showOnHomepage?: boolean;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type ProjectFormValues = {
  title: string;
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
