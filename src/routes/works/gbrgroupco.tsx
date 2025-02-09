import Article from '@/components/Layout/Article'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/works/gbrgroupco')({
  component: RouteComponent,
})

function RouteComponent() {
  useEffect(() => {
    document.title = 'GBR Group Co - Jian Lee'
  }, [])

  return (
    <div>
      <Article title="GBR Group Co" date="2024">
        <div className="text-sm">
          <p>This is the start of the story of GBR Group Co</p>
        </div>
      </Article>
    </div>
  )
}
