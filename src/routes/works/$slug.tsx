import { markdownContentQueryOptions } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { ASSETS } from "@/shared/Constants";
import PageHeader from "@/shared/PageHeader";
import MarkdownRenderer from "@/components/Blog/MarkdownRenderer";
import { formatDate } from "@/lib/formatDate";

export const Route = createFileRoute("/works/$slug")({
  component: RouteComponent,
});

function RouteComponent() {
  const { slug } = Route.useParams();

  // Fetch the markdown content for this slug
  const {
    data: markdownData,
    isLoading,
    error,
  } = useQuery(markdownContentQueryOptions(`${slug}.md`));

  if (error) return <div>Error: {error.message}</div>;

  console.log(markdownData, "markdownData");

  // const { frontmatter, content } = markdownData;

  // console.log(markdownData, "markdownData");
  // console.log(markdownData?.content, "markdownData?.content");

  return (
    <div className="max-w-5xl m-auto px-8 font-apple">
      {/* Navigation Section */}
      <PageHeader title="Automation Inspiration" />

      {isLoading && <div>Loading...</div>}

      {markdownData && (
        <div className="max-w-2xl m-auto pb-8">
          <div className="space-y-3 sm:space-y-4 lg:space-y-6 text-center">
            {/* <div className="text-xs sm:text-sm lg:text-base text-gray-600 dark:text-gray-400">3 min read</div> */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight px-2 sm:px-0">
              {markdownData.frontmatter.title}
            </h1>
            <div className="text-xs sm:text-sm lg:text-base text-gray-600 dark:text-gray-400">
              {formatDate(markdownData.frontmatter.date)} &nbsp;•&nbsp; {markdownData.frontmatter.read_time} mins read
            </div>
          </div>
          <div className="my-6 sm:my-8 lg:my-10">
            <img
              src={`${ASSETS.IMAGES}/gbrgroup.png`}
              alt="GBR Group Co"
              className="rounded-sm w-full h-auto max-w-full object-cover"
            />
          </div>
          {/* content */}
          <div className="text-xs sm:text-sm lg:text-base leading-relaxed px-2 sm:px-0">
            {/* <div dangerouslySetInnerHTML={{ __html: markdownData?.content }} /> */}
            <MarkdownRenderer content={markdownData.content} />
          </div>
        </div>
      )}
    </div>
  );
}
