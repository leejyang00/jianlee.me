import Article from '@/components/Layout/Article'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/works/pacemates')({
  component: RouteComponent,
})

function RouteComponent() {
  useEffect(() => {
    document.title = 'Pacemates Run Club - Jian Lee'
  }, [])

  return (
    <div>
      <Article title="Pacemates Run Club" date="2023">
        <div className="text-sm">
          <p>This is the start of the story of Pacemates Run Club</p>
        </div>
      </Article>
    </div>
  )
}
