import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import FeedbackPage from "./pages/FeedbackPage";
import HomePage from "./pages/HomePage";
import SchedulePage from "./pages/SchedulePage";

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "oklch(0.2 0.025 255)",
            border: "1px solid oklch(0.28 0.025 255)",
            color: "oklch(0.97 0.005 255)",
          },
        }}
      />
      <Outlet />
    </>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const scheduleRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/schedule",
  component: SchedulePage,
});

const feedbackRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/feedback",
  component: FeedbackPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  scheduleRoute,
  feedbackRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
