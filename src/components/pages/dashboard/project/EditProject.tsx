'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { useProjectManager } from '@/services/queryHooks/useProjectManager';
import { ApiRequestError } from '@/services/utils/apiHelper';
import type { ProjectDetail, ProjectFormValues } from '@/shared';
import { joinTechList, splitTechList } from '@/utils/techList';
import DashboardHeader from '../DashboardHeader';
import { toastUnlessFieldIssues } from './toastUnlessFieldIssues';
import ProjectForm from './ProjectForm';

function EditProject({ project }: { project: ProjectDetail }) {
  const router = useRouter();
  const { updateProject, isUpdatingProject, updateProjectError } =
    useProjectManager({ shouldFetch: false });

  const defaultValues: ProjectFormValues = {
    title: project.title,
    slug: project.slug,
    status: project.status,
    order: project.order,
    summary: project.summary,
    frontEndTech: joinTechList(project.frontEndTech),
    backEndTech: joinTechList(project.backEndTech),
    liveLink: project.liveLink ?? '',
    frontEndRepo: project.frontEndRepo ?? '',
    backEndRepo: project.backEndRepo ?? '',
    projectDetails: project.projectDetails,
    showOnHomepage: project.showOnHomepage,
  };

  function handleUpdate(values: ProjectFormValues) {
    updateProject(
      {
        projectId: project.id,
        payload: {
          title: values.title,
          slug: values.slug,
          status: values.status,
          order: values.order,
          summary: values.summary,
          liveLink: values.liveLink,
          frontEndRepo: values.frontEndRepo,
          backEndRepo: values.backEndRepo,
          projectDetails: values.projectDetails,
          showOnHomepage: values.showOnHomepage,
          frontEndTech: splitTechList(values.frontEndTech),
          backEndTech: splitTechList(values.backEndTech),
        },
      },
      {
        onSuccess: () => {
          toast.success('Project updated');
          router.push('/dashboard/project-list');
        },
        onError: toastUnlessFieldIssues,
      },
    );
  }

  return (
    <>
      <DashboardHeader
        title={project.title}
        description="Changes go live as soon as you save."
        backHref="/dashboard/project-list"
        backLabel="Projects"
      />
      <ProjectForm
        mode="edit"
        defaultValues={defaultValues}
        isPending={isUpdatingProject}
        onSubmit={handleUpdate}
        fieldIssues={
          updateProjectError instanceof ApiRequestError
            ? updateProjectError.fieldIssues
            : undefined
        }
      />
    </>
  );
}

export default EditProject;
