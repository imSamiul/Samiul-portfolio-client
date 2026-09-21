'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ImageIcon } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState, type ReactNode } from 'react';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import {
  projectCreateFormSchema,
  projectFormSchema,
  type FieldIssue,
  type ProjectFormValues,
} from '@/shared';

type ProjectFormProps = {
  mode: 'create' | 'edit';
  defaultValues: ProjectFormValues;
  isPending: boolean;
  onSubmit: SubmitHandler<ProjectFormValues>;
  /** `{ field, message }` pairs from a 422, shown against the field they name. */
  fieldIssues?: FieldIssue[];
};

type TextFieldName =
  | 'title'
  | 'slug'
  | 'summary'
  | 'frontEndTech'
  | 'backEndTech'
  | 'liveLink'
  | 'frontEndRepo'
  | 'backEndRepo';

type TextField = {
  name: TextFieldName;
  label: string;
  placeholder: string;
  hint?: string;
};

// Fields are grouped the way an author thinks about a project, not the way
// the API happens to order them.
const BASICS: TextField[] = [
  { name: 'title', label: 'Title', placeholder: 'Bari Vara — rental listings' },
  {
    name: 'slug',
    label: 'URL slug',
    placeholder: 'bari-vara',
    hint: 'Leave blank to build it from the title. Lowercase, dashes only.',
  },
  {
    name: 'summary',
    label: 'Summary',
    placeholder: 'One sentence that appears on the card',
  },
];

const TECH: TextField[] = [
  {
    name: 'frontEndTech',
    label: 'Frontend',
    placeholder: 'React, Next.js, Tailwind CSS',
    hint: 'Comma-separated.',
  },
  {
    name: 'backEndTech',
    label: 'Backend (optional)',
    placeholder: 'Node.js, Express, MongoDB',
    hint: 'Comma-separated. Leave blank for a frontend-only project.',
  },
];

const LINKS: TextField[] = [
  { name: 'liveLink', label: 'Live site', placeholder: 'https://' },
  {
    name: 'frontEndRepo',
    label: 'Frontend repo',
    placeholder: 'https://github.com/…',
  },
  {
    name: 'backEndRepo',
    label: 'Backend repo',
    placeholder: 'https://github.com/…',
  },
];

function FormSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-xl border bg-card p-5 sm:p-6">
      <h2 className="text-base font-semibold">{title}</h2>
      {description && (
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      )}
      <div className="mt-5 grid gap-5">{children}</div>
    </section>
  );
}

function ProjectForm({
  mode,
  defaultValues,
  isPending,
  onSubmit,
  fieldIssues = [],
}: ProjectFormProps) {
  const isCreate = mode === 'create';
  const labels = isCreate
    ? { idle: 'Create project', pending: 'Creating…' }
    : { idle: 'Save changes', pending: 'Saving…' };
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ProjectFormValues>({
    defaultValues,
    // Validation rules live in the shared schema, which mirrors the API's
    // limits — so a form that passes here does not come back as a 422.
    resolver: zodResolver(
      isCreate ? projectCreateFormSchema : projectFormSchema,
    ),
  });

  // Derived, not stored: the server's complaint shows until the next response.
  const serverIssues = new Map(
    fieldIssues.map((issue) => [issue.field, issue.message]),
  );
  const messageFor = (name: keyof ProjectFormValues) =>
    errors[name]?.message ?? serverIssues.get(name);

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const selectedImage = watch('image');

  useEffect(() => {
    const file = selectedImage?.[0];
    if (!file) {
      setImagePreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setImagePreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedImage]);

  const renderText = (field: TextField) => {
    const message = messageFor(field.name);

    return (
      <Field key={field.name}>
        <FieldLabel htmlFor={field.name}>{field.label}</FieldLabel>
        <Input
          id={field.name}
          placeholder={field.placeholder}
          aria-invalid={Boolean(message)}
          {...register(field.name)}
        />
        {message ? (
          <FieldError>{message}</FieldError>
        ) : (
          field.hint && <FieldDescription>{field.hint}</FieldDescription>
        )}
      </Field>
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="grid gap-6 lg:grid-cols-[1fr_20rem] lg:items-start">
        {/* Main column */}
        <div className="grid gap-6">
          <FormSection title="Basics">{BASICS.map(renderText)}</FormSection>

          <FormSection
            title="Details"
            description="Markdown on the project page: ## headings, - lists, **bold**. Blank lines become paragraphs."
          >
            <Field>
              <FieldLabel htmlFor="projectDetails">Project details</FieldLabel>
              <Textarea
                id="projectDetails"
                rows={12}
                placeholder={`## Overview\nWhat the project does.\n\n## What I built\n- Feature one\n- Feature two\n\nThe hard part was **…**`}
                aria-invalid={Boolean(messageFor('projectDetails'))}
                {...register('projectDetails')}
              />
              {messageFor('projectDetails') && (
                <FieldError>{messageFor('projectDetails')}</FieldError>
              )}
            </Field>
          </FormSection>

          <FormSection title="Technologies">{TECH.map(renderText)}</FormSection>

          <FormSection title="Links">{LINKS.map(renderText)}</FormSection>
        </div>

        {/* Side column: publishing controls stay in view while scrolling. */}
        <div className="grid gap-6 lg:sticky lg:top-24">
          <FormSection title="Publishing">
            <Field>
              <FieldLabel htmlFor="status">Status</FieldLabel>
              {/* Radix's Select is not an <input>, so it needs a Controller. */}
              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="status" className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">
                        Draft — not on the site
                      </SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="order">Order</FieldLabel>
              <Input
                id="order"
                type="number"
                aria-invalid={Boolean(messageFor('order'))}
                {...register('order', { valueAsNumber: true })}
              />
              {messageFor('order') ? (
                <FieldError>{messageFor('order')}</FieldError>
              ) : (
                <FieldDescription>Lower numbers show first.</FieldDescription>
              )}
            </Field>

            <Field orientation="horizontal">
              <div className="grid gap-0.5">
                <FieldLabel htmlFor="showOnHomepage">
                  Show on homepage
                </FieldLabel>
                <FieldDescription>
                  Only published projects appear.
                </FieldDescription>
              </div>
              <Controller
                control={control}
                name="showOnHomepage"
                render={({ field }) => (
                  <Switch
                    id="showOnHomepage"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </Field>
          </FormSection>

          {isCreate && (
            <FormSection
              title="Cover image"
              description="PNG or JPEG, up to 2 MB. Shown at 16:10 on cards."
            >
              {imagePreview ? (
                // A blob URL has no intrinsic size for next/image to work
                // with, and it never leaves the browser, so there is nothing
                // to optimise.
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={imagePreview}
                  alt="Selected project image"
                  className="aspect-16/10 w-full rounded-lg border object-cover object-top"
                />
              ) : (
                <div className="flex aspect-16/10 items-center justify-center rounded-lg border border-dashed bg-muted/40 text-muted-foreground">
                  <ImageIcon className="size-6" />
                </div>
              )}
              <Field>
                <FieldLabel htmlFor="image" className="sr-only">
                  Image
                </FieldLabel>
                <Input
                  id="image"
                  type="file"
                  accept="image/png,image/jpeg"
                  aria-invalid={Boolean(messageFor('image'))}
                  {...register('image')}
                />
                {messageFor('image') && (
                  <FieldError>{messageFor('image')}</FieldError>
                )}
              </Field>
            </FormSection>
          )}

          <div className="flex flex-col gap-2 sm:flex-row lg:flex-col">
            <Button type="submit" disabled={isPending} className="flex-1">
              {isPending ? labels.pending : labels.idle}
            </Button>
            <Button asChild variant="outline" className="flex-1">
              <Link href="/dashboard/project-list">Cancel</Link>
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default ProjectForm;
