import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <NavBar />
      <div className="w-100% bg-[#f1e6db] dark:bg-[#202122] dark:text-[#eeefef]">
        <div className="max-w-5xl mx-auto pt-16">
          <Outlet />
          <Footer />
        </div>
      </div>
    </React.Fragment>
  );
}
