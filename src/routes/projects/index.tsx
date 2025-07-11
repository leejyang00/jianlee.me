import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
import ScrollToTop from '@/shared/ScrollToTop'
import PageHeader from '@/shared/PageHeader'
import WorkCard from '@/components/Blog/WorkCard'
import { getMarkdownDatabaseQuery } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'

export const Route = createFileRoute('/projects/')({
  component: ScrollToTop(RouteComponent),
})

function RouteComponent() {
  useEffect(() => {
    document.title = 'Works | Jian'
  }, [])

  const {
    data: markdownData,
    isLoading,
    error,
  } = useQuery(getMarkdownDatabaseQuery)

  return (
    <div className="max-w-5xl m-auto px-8 font-apple">
      <PageHeader title="My Projects" subpath="/projects" slug="" />

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center w-full gap-4 lg:gap-6">
        <h1 className="py-4 text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold font-apple text-center sm:text-left w-full lg:w-auto">
          My Projects
        </h1>
        {/* <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center lg:justify-end items-center w-full lg:w-auto">
          <div className="text-xs sm:text-sm py-2 sm:py-3 px-3 sm:px-4 border border-gray-300 dark:border-gray-700 w-full sm:w-auto min-w-[120px] text-center">
            Sort by
          </div>
        </div> */}
      </div>

      {isLoading && <div>Loading...</div>}

      {error && (
        <div className="mt-10 text-center text-red-500">
          Error: {error.message}
        </div>
      )}

      {markdownData && (
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-x-10 gap-y-16">
          {markdownData.map((post) => (
            <WorkCard
              key={post.id}
              imageSrc={post.image}
              imageAlt={post.title}
              title={post.title}
              description={post.description}
              date={post.date}
              readTime={post.read_time}
              slug={post.slug}
            />
          ))}
        </div>
      )}
    </div>
  )
}
