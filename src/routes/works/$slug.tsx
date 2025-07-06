import { markdownContentQueryOptions } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { ASSETS } from "@/shared/Constants";
import PageHeader from "@/shared/PageHeader";

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
  console.log(markdownData?.content, "markdownData?.content");

  return (
    <div className="max-w-5xl m-auto px-8 font-apple">
      {/* Navigation Section */}
      <PageHeader title="Automation Inspiration" />

      {isLoading && <div>Loading...</div>}

      {markdownData && (
        <div className="max-w-2xl m-auto text-center pb-8">
          <div className="space-y-3 sm:space-y-4 lg:space-y-6">
            {/* <div className="text-xs sm:text-sm lg:text-base text-gray-600 dark:text-gray-400">3 min read</div> */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight px-2 sm:px-0">
              4 ways to automate Softr with Zapier
            </h1>
            <div className="text-xs sm:text-sm lg:text-base text-gray-600 dark:text-gray-400">
              July 7, 2025 &nbsp;•&nbsp; 3 mins read
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
            <div dangerouslySetInnerHTML={{ __html: markdownData?.content }} />
          </div>
        </div>
      )}
    </div>
  );
}
