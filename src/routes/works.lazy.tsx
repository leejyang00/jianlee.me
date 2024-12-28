import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/works')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/works"!</div>
}
