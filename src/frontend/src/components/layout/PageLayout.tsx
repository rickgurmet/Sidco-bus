import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowLeft, Bus } from "lucide-react";
import { motion } from "motion/react";
import type { ReactNode } from "react";

interface PageLayoutProps {
  children: ReactNode;
  showBack?: boolean;
  title?: string;
}

export default function PageLayout({ children, showBack }: PageLayoutProps) {
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;
  const isHome = pathname === "/";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-4">
          {showBack && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                to="/"
                data-ocid="nav.link"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>Back</span>
              </Link>
            </motion.div>
          )}

          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-lg">
              <Bus
                className="w-4 h-4 text-primary-foreground"
                strokeWidth={2.5}
              />
            </div>
            <span className="font-display font-bold text-lg text-foreground hidden sm:block">
              RouteWise
            </span>
          </Link>

          {!isHome && (
            <nav className="ml-auto flex items-center gap-1">
              <Link
                to="/schedule"
                data-ocid="nav.schedule.link"
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  pathname === "/schedule"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                Schedule
              </Link>
              <Link
                to="/feedback"
                data-ocid="nav.feedback.link"
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  pathname === "/feedback"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                Feedback
              </Link>
            </nav>
          )}
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t border-border py-6 mt-auto">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()}{" "}
          <span className="text-foreground font-medium">RouteWise</span>. Built
          with <span className="text-primary">♥</span> using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            caffeine.ai
          </a>
        </div>
      </footer>
    </div>
  );
}
