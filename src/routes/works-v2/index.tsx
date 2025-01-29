import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/works-v2/")({
  component: RouteComponent,
});

function RouteComponent() {
  useEffect(() => {
    document.title = "Works - Jian Lee";
  }, []);

  return (
    <div className="max-w-xl m-auto px-4">
      <h2 className="text-xl font-bold my-4">Works</h2>

      {/* Grid of Works */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
        <div className="flex flex-col gap-2 items-center justify-center">
          <img
            src="/images/gbrgroup.png"
            alt="Work 1"
            className="rounded-lg w-full h-40 object-cover"
          />
          <div className="mt-2 gap-1 flex flex-col items-center justify-center">
            <h3 className="text-lg font-medium font-display">GBR Group Co</h3>
            <p className="text-sm font-normal font-display">
              Description of Work 1
            </p>
          </div>
        </div>
        <Link to="/works-v2/pacemates-run-club">
          <div className="flex flex-col gap-2 items-center justify-center">
            <img
              src="/images/pacemates.jpg"
              alt="Work 1"
              className="rounded-lg w-full h-40 object-cover"
            />
            <div className="mt-2 gap-1 flex flex-col items-center justify-center">
              <h3 className="text-lg font-medium font-display">
                Pacemates Run Club
              </h3>
              <p className="text-sm font-normal font-display">
                Description of Work 1
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
