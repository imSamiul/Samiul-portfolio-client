import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/projects/allProjects')({
  component: RouteComponent,
})

function RouteComponent() {
  return 'Hello /projects!'
}
