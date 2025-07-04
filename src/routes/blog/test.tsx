import { createFileRoute } from '@tanstack/react-router'
import { MarkdownBlog } from '@/components/MarkdownBlog'

export const Route = createFileRoute('/blog/test')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div><MarkdownBlog /></div>
}
