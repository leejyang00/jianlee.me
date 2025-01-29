import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/works-v2/$slug')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/works-v2/(pacemates)/pacemates-run-club"!</div>
}
