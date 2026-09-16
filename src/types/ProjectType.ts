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
  image?: ImageType | File | string;
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

export type ImageType = {
  data: string;
  contentType: string;
};
