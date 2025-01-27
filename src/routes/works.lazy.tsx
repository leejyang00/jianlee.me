import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import ScrollToTop from "../shared/ScrollToTop";
export const Route = createLazyFileRoute("/works")({
  component: ScrollToTop(RouteComponent),
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
            src="/images/prof.jpg"
            alt="Work 1"
            className="rounded-md w-full h-40 object-cover"
          />
          <div className="mt-2 gap-1 flex flex-col items-center justify-center">
            <h3 className="text-lg font-medium font-display">GBR Group Co</h3>
            <p className="text-sm font-normal font-display">Description of Work 1</p>
          </div>
        </div>
        <div className="flex flex-col gap-2 items-center justify-center">
          <img
            src="/images/prof.jpg"
            alt="Work 1"
            className="rounded-md w-full h-40 object-cover"
          />
          <div className="mt-2 gap-1 flex flex-col items-center justify-center">
            <h3 className="text-lg font-medium font-display">Pacemates Run Club</h3>
            <p className="text-sm font-normal font-display">Description of Work 1</p>
          </div>
        </div>
      </div>
    </div>
  );
}
