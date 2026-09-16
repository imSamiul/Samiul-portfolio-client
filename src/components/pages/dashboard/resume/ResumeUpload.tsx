'use client';

import {
  CircleAlertIcon,
  CircleCheckIcon,
  FileTextIcon,
  UploadIcon,
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { RESUME_DOWNLOAD_URL } from '@/services/apis/resumeApis';
import { useResumeManager } from '@/services/queryHooks/useResumeManager';
import { Button } from '@/components/ui/button';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import DashboardHeader from '../DashboardHeader';

type ResumeUploadValues = {
  resume: FileList;
};

const updatedAtFormat = new Intl.DateTimeFormat('en-GB', {
  dateStyle: 'medium',
  timeStyle: 'short',
});

function ResumeUpload() {
  const {
    resume,
    isLoadingResume,
    resumeFetchError,
    uploadResume,
    isUploadingResume,
  } = useResumeManager();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ResumeUploadValues>();

  const selectedFile = watch('resume')?.[0];

  function handleUpload(values: ResumeUploadValues) {
    const file = values.resume[0];
    if (!file) {
      return;
    }

    uploadResume(file, {
      onSuccess: () => {
        reset();
        toast.success('Resume updated');
      },
      onError: (error) => toast.error(error.message),
    });
  }

  return (
    <>
      <DashboardHeader
        title="Resume"
        description="One PDF. The homepage and resume page link to whatever is stored here."
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_20rem] lg:items-start">
        <section className="rounded-xl border bg-card p-5 sm:p-6">
          <h2 className="text-base font-semibold">Replace the PDF</h2>
          <form
            className="mt-5 grid gap-5"
            onSubmit={handleSubmit(handleUpload)}
            noValidate
          >
            <Field>
              <FieldLabel htmlFor="resume">PDF file</FieldLabel>
              <label
                htmlFor="resume"
                className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed bg-muted/40 px-6 py-10 text-center transition-colors hover:border-primary/40 hover:bg-muted/60"
              >
                <span className="inline-flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <UploadIcon className="size-5" />
                </span>
                <span className="text-sm font-medium">
                  {selectedFile
                    ? selectedFile.name
                    : 'Choose a PDF or drop it here'}
                </span>
                <span className="text-xs text-muted-foreground">
                  {selectedFile
                    ? `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB`
                    : 'Up to 4 MB'}
                </span>
              </label>
              <Input
                id="resume"
                type="file"
                accept="application/pdf"
                className="sr-only"
                aria-invalid={Boolean(errors.resume)}
                {...register('resume', { required: 'Choose a PDF to upload' })}
              />
              <FieldError errors={[errors.resume]} />
              <FieldDescription>
                Replacing is immediate; the old file is discarded.
              </FieldDescription>
            </Field>

            <Button
              type="submit"
              disabled={isUploadingResume || !selectedFile}
              className="sm:justify-self-start"
            >
              <UploadIcon />
              {isUploadingResume ? 'Uploading…' : 'Upload resume'}
            </Button>
          </form>
        </section>

        {/*
          The homepage hides its download button while nothing is stored, so
          the status has to be visible here — otherwise a missing link looks
          broken.
        */}
        <aside className="rounded-xl border bg-card p-5 sm:p-6">
          <h2 className="text-base font-semibold">Current file</h2>
          <div className="mt-4">
            {isLoadingResume ? (
              <div className="space-y-2">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ) : resumeFetchError ? (
              <p className="flex items-start gap-2 text-sm text-destructive">
                <CircleAlertIcon className="mt-0.5 size-4 shrink-0" />
                {resumeFetchError.message}
              </p>
            ) : resume ? (
              <div className="space-y-3">
                <p className="flex items-start gap-2 text-sm">
                  <CircleCheckIcon className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span>
                    Stored. Last replaced{' '}
                    <time dateTime={resume.updatedAt} className="font-medium">
                      {updatedAtFormat.format(new Date(resume.updatedAt))}
                    </time>
                    .
                  </span>
                </p>
                <Button asChild variant="outline" size="sm">
                  <a
                    href={RESUME_DOWNLOAD_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FileTextIcon />
                    Open current PDF
                  </a>
                </Button>
              </div>
            ) : (
              <p className="flex items-start gap-2 text-sm text-muted-foreground">
                <CircleAlertIcon className="mt-0.5 size-4 shrink-0 text-secondary-foreground" />
                No resume uploaded yet, so the site shows no download button.
              </p>
            )}
          </div>
        </aside>
      </div>
    </>
  );
}

export default ResumeUpload;
