import { createFileRoute, redirect } from "@tanstack/react-router";

// "/uses" was a placeholder page — redirect to the Gears page instead
export const Route = createFileRoute("/uses")({
  beforeLoad: () => {
    throw redirect({ to: "/gears" });
  },
});
