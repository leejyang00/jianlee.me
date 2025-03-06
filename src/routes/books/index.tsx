import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/books/')({
  component: RouteComponent,
})

function RouteComponent() {
  useEffect(() => {
    document.title = 'Books | Jian'
  }, [])

  return (
    <div className="max-w-xl m-auto px-6">
      <h2 className="text-xl font-bold my-4">Works</h2>


    </div>
  )
}
