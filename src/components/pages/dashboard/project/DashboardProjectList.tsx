'use client';

import {
  ExternalLinkIcon,
  EyeIcon,
  FolderKanbanIcon,
  HouseIcon,
  PencilIcon,
  PlusIcon,
  type LucideIcon,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { useProjectManager } from '@/services/queryHooks/useProjectManager';
import {
  PROJECT_IMAGE_HEIGHT,
  PROJECT_IMAGE_WIDTH,
} from '@/utils/projectImage';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Switch } from '@/components/ui/switch';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import DashboardHeader from '../DashboardHeader';
import ProjectDeleteDialog from './ProjectDeleteDialog';

function StatCard({
  Icon,
  label,
  value,
}: {
  Icon: LucideIcon;
  label: string;
  value: number;
}) {
  return (
    <div className="flex items-center gap-4 rounded-xl border bg-card p-4">
      <span className="inline-flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="size-5" />
      </span>
      <div>
        <p className="text-2xl font-bold tabular-nums">{value}</p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

function ListSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <Skeleton key={i} className="h-18 rounded-xl" />
        ))}
      </div>
      <div className="space-y-3 rounded-xl border bg-card p-4">
        {[0, 1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-14" />
        ))}
      </div>
    </div>
  );
}

function DashboardProjectList() {
  const {
    projects,
    isLoadingProjects,
    projectsFetchError,
    toggleHomepage,
    isTogglingHomepage,
    toggleStatus,
    isTogglingStatus,
  } = useProjectManager();

  const published = projects.filter((p) => p.status === 'published').length;
  const onHomepage = projects.filter((p) => p.showOnHomepage).length;

  return (
    <>
      <DashboardHeader
        title="Projects"
        description="Drafts stay off the site. Publishing and the homepage flag take effect immediately."
        actions={
          <Button asChild>
            <Link href="/dashboard/add-project">
              <PlusIcon />
              Add project
            </Link>
          </Button>
        }
      />

      {isLoadingProjects ? (
        <ListSkeleton />
      ) : projectsFetchError ? (
        <Alert variant="destructive">
          <AlertTitle>{projectsFetchError.message}</AlertTitle>
        </Alert>
      ) : projects.length === 0 ? (
        <div className="rounded-xl border border-dashed bg-card p-12 text-center">
          <span className="mx-auto inline-flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <FolderKanbanIcon className="size-6" />
          </span>
          <h2 className="mt-4 text-lg font-semibold">No projects yet</h2>
          <p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">
            Add your first project — it stays a draft until you publish it.
          </p>
          <Button asChild className="mt-6">
            <Link href="/dashboard/add-project">
              <PlusIcon />
              Add project
            </Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <StatCard
              Icon={FolderKanbanIcon}
              label="Total"
              value={projects.length}
            />
            <StatCard Icon={EyeIcon} label="Published" value={published} />
            <StatCard Icon={HouseIcon} label="On homepage" value={onHomepage} />
          </div>

          <div className="overflow-hidden rounded-xl border bg-card">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-12 text-center">#</TableHead>
                    <TableHead className="min-w-64">Project</TableHead>
                    <TableHead className="text-center">Published</TableHead>
                    <TableHead className="text-center">Homepage</TableHead>
                    <TableHead className="text-center">Order</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects.map((project, index) => (
                    <TableRow key={project.id}>
                      <TableCell className="text-center font-mono text-xs text-muted-foreground">
                        {index + 1}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Image
                            src={project.image}
                            alt=""
                            width={PROJECT_IMAGE_WIDTH}
                            height={PROJECT_IMAGE_HEIGHT}
                            sizes="4rem"
                            className="aspect-video w-16 shrink-0 rounded-md border object-cover object-top"
                          />
                          <div className="min-w-0">
                            <p className="truncate font-medium">
                              {project.title}
                            </p>
                            <div className="mt-0.5 flex items-center gap-2">
                              <Badge
                                variant={
                                  project.status === 'published'
                                    ? 'default'
                                    : 'outline'
                                }
                                className="capitalize"
                              >
                                {project.status}
                              </Badge>
                              <span className="truncate font-mono text-xs text-muted-foreground">
                                /{project.slug}
                              </span>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Switch
                          aria-label={`Publish ${project.title}`}
                          checked={project.status === 'published'}
                          disabled={isTogglingStatus}
                          onCheckedChange={() => toggleStatus(project.id)}
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        <Switch
                          aria-label={`Show ${project.title} on the homepage`}
                          checked={project.showOnHomepage}
                          disabled={isTogglingHomepage}
                          onCheckedChange={() => toggleHomepage(project.id)}
                        />
                      </TableCell>
                      <TableCell className="text-center font-mono text-sm tabular-nums">
                        {project.order}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end gap-1">
                          {project.liveLink && (
                            <Button
                              asChild
                              variant="ghost"
                              size="icon-sm"
                              aria-label={`Open live site for ${project.title}`}
                            >
                              <a
                                href={project.liveLink}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <ExternalLinkIcon />
                              </a>
                            </Button>
                          )}
                          <Button
                            asChild
                            variant="ghost"
                            size="icon-sm"
                            aria-label={`Edit ${project.title}`}
                          >
                            <Link
                              href={`/dashboard/edit-project/${project.id}`}
                            >
                              <PencilIcon />
                            </Link>
                          </Button>
                          <ProjectDeleteDialog project={project} />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DashboardProjectList;
