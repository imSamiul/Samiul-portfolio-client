'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { useProjectManager } from '@/services/queryHooks/useProjectManager';
import { ApiRequestError } from '@/services/utils/apiHelper';
import type { ProjectFormValues } from '@/shared';
import { splitTechList } from '@/utils/techList';
import DashboardHeader from '../DashboardHeader';
import { toastUnlessFieldIssues } from './toastUnlessFieldIssues';
import ProjectForm from './ProjectForm';

const EMPTY_PROJECT: ProjectFormValues = {
  title: '',
  slug: '',
  status: 'draft',
  order: 0,
  summary: '',
  frontEndTech: '',
  backEndTech: '',
  liveLink: '',
  frontEndRepo: '',
  backEndRepo: '',
  projectDetails: '',
  showOnHomepage: false,
};

function AddProject() {
  const router = useRouter();
  const { createProject, isCreatingProject, createProjectError } =
    useProjectManager({ shouldFetch: false });

  function handleCreate(values: ProjectFormValues) {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('slug', values.slug);
    formData.append('status', values.status);
    formData.append('order', String(values.order));
    formData.append('summary', values.summary);
    formData.append('liveLink', values.liveLink);
    formData.append('frontEndRepo', values.frontEndRepo);
    formData.append('backEndRepo', values.backEndRepo);
    formData.append('projectDetails', values.projectDetails);
    formData.append('showOnHomepage', String(values.showOnHomepage));
    formData.append(
      'frontEndTech',
      JSON.stringify(splitTechList(values.frontEndTech)),
    );
    formData.append(
      'backEndTech',
      JSON.stringify(splitTechList(values.backEndTech)),
    );
    if (values.image?.[0]) {
      formData.append('image', values.image[0]);
    }

    createProject(formData, {
      onSuccess: () => {
        toast.success('Project created');
        router.push('/dashboard/project-list');
      },
      onError: toastUnlessFieldIssues,
    });
  }

  return (
    <>
      <DashboardHeader
        title="Add project"
        description="It starts as a draft; flip the status to publish it."
        backHref="/dashboard/project-list"
        backLabel="Projects"
      />
      <ProjectForm
        mode="create"
        defaultValues={EMPTY_PROJECT}
        isPending={isCreatingProject}
        onSubmit={handleCreate}
        fieldIssues={
          createProjectError instanceof ApiRequestError
            ? createProjectError.fieldIssues
            : undefined
        }
      />
    </>
  );
}

export default AddProject;
