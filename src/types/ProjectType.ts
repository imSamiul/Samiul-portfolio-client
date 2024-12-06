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
  image?: ImageType | File;
  createdAt?: Date;
  updatedAt?: Date;
};

export type DeleteProjectModalPropsType = {
  modalId: string;
  title: string;
  summary: string;
  image: string | null;
  liveLink: string;
};

export type ImageType = {
  data: string;
  contentType: string;
};
