'use client';

import { Trash2Icon } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import { useProjectManager } from '@/services/queryHooks/useProjectManager';
import type { ProjectSummary } from '@/shared';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  PROJECT_IMAGE_HEIGHT,
  PROJECT_IMAGE_WIDTH,
} from '@/utils/projectImage';

function ProjectDeleteDialog({ project }: { project: ProjectSummary }) {
  const [isOpen, setIsOpen] = useState(false);
  const { deleteProject, isDeletingProject, deleteProjectError } =
    useProjectManager({ shouldFetch: false });

  function handleDelete() {
    deleteProject(project.id, { onSuccess: () => setIsOpen(false) });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label={`Delete ${project.title}`}
          className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
        >
          <Trash2Icon />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete {project.title}?</DialogTitle>
          <DialogDescription>
            This removes the project and its image for good.
          </DialogDescription>
        </DialogHeader>

        <Image
          src={project.image}
          alt={project.title}
          width={PROJECT_IMAGE_WIDTH}
          height={PROJECT_IMAGE_HEIGHT}
          sizes="(min-width: 640px) 32rem, 100vw"
          className="w-full rounded-lg object-cover"
        />

        <p className="text-sm text-muted-foreground">{project.summary}</p>

        {deleteProjectError && (
          <p className="text-sm text-destructive" role="alert">
            {deleteProjectError.message}
          </p>
        )}

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeletingProject}
          >
            {isDeletingProject ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ProjectDeleteDialog;
