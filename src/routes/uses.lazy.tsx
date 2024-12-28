import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/uses')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/uses"!</div>
}
