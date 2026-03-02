import { Link } from "@tanstack/react-router";
import {
  Bus,
  ChevronRight,
  Clock,
  MapPin,
  MessageSquarePlus,
} from "lucide-react";
import { motion } from "motion/react";
import PageLayout from "../components/layout/PageLayout";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function HomePage() {
  return (
    <PageLayout>
      {/* Hero section */}
      <section className="relative overflow-hidden">
        {/* Background pattern */}
        <div
          className="absolute inset-0 transit-stripe opacity-60"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% -10%, oklch(0.78 0.17 65 / 0.12) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center text-center"
          >
            {/* Logo mark */}
            <motion.div variants={itemVariants} className="mb-6">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl shadow-2xl overflow-hidden">
                <img
                  src="/assets/generated/bus-logo-transparent.dim_120x120.png"
                  alt="RouteWise Bus"
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0 rounded-2xl ring-2 ring-primary/40"
                  aria-hidden="true"
                />
              </div>
            </motion.div>

            {/* Headline */}
            <motion.div variants={itemVariants} className="mb-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-widest mb-4">
                <MapPin className="w-3 h-3" />
                City Transit Network
              </div>
              <h1 className="font-display text-4xl sm:text-6xl font-extrabold text-foreground leading-tight tracking-tight">
                Your City.
                <br />
                <span style={{ color: "oklch(var(--primary))" }}>
                  On Schedule.
                </span>
              </h1>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-muted-foreground text-lg sm:text-xl max-w-lg leading-relaxed mb-12"
            >
              Find bus timings, check fares, and share your ride experience —
              all in one place.
            </motion.p>

            {/* Navigation cards */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-2xl"
            >
              {/* Bus Schedule card */}
              <Link
                to="/schedule"
                data-ocid="home.schedule_button"
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 sm:p-8 text-left transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_40px_oklch(0.78_0.17_65/0.15)] hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 50%, oklch(0.78 0.17 65 / 0.06) 0%, transparent 70%)",
                  }}
                  aria-hidden="true"
                />

                <div className="relative flex flex-col gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/15 border border-primary/20 flex items-center justify-center group-hover:bg-primary/25 transition-colors">
                    <Bus className="w-6 h-6 text-primary" strokeWidth={2} />
                  </div>

                  <div>
                    <h2 className="font-display text-xl font-bold text-foreground mb-1.5">
                      Bus Schedule
                    </h2>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Search routes, check departure & arrival times, and see
                      fares for any journey.
                    </p>
                  </div>

                  <div className="flex items-center gap-1 text-primary text-sm font-semibold mt-auto">
                    <Clock className="w-4 h-4" />
                    <span>View timings</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform ml-auto" />
                  </div>
                </div>
              </Link>

              {/* Feedback card */}
              <Link
                to="/feedback"
                data-ocid="home.feedback_button"
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 sm:p-8 text-left transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_40px_oklch(0.78_0.17_65/0.15)] hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle at 70% 50%, oklch(0.78 0.17 65 / 0.06) 0%, transparent 70%)",
                  }}
                  aria-hidden="true"
                />

                <div className="relative flex flex-col gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/15 border border-primary/20 flex items-center justify-center group-hover:bg-primary/25 transition-colors">
                    <MessageSquarePlus
                      className="w-6 h-6 text-primary"
                      strokeWidth={2}
                    />
                  </div>

                  <div>
                    <h2 className="font-display text-xl font-bold text-foreground mb-1.5">
                      Ride Feedback
                    </h2>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Rate your ride experience and share your thoughts to help
                      us improve.
                    </p>
                  </div>

                  <div className="flex items-center gap-1 text-primary text-sm font-semibold mt-auto">
                    <MessageSquarePlus className="w-4 h-4" />
                    <span>Leave a review</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform ml-auto" />
                  </div>
                </div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats row */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-3 gap-4 sm:gap-8"
        >
          {[
            { label: "Routes Available", value: "24+", icon: "🗺️" },
            { label: "Daily Departures", value: "150+", icon: "🕐" },
            { label: "Cities Covered", value: "12", icon: "🏙️" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center text-center p-4 sm:p-6 rounded-xl bg-card border border-border"
            >
              <span className="text-2xl sm:text-3xl mb-2">{stat.icon}</span>
              <span className="font-display font-bold text-2xl sm:text-3xl text-primary">
                {stat.value}
              </span>
              <span className="text-muted-foreground text-xs sm:text-sm mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </section>
    </PageLayout>
  );
}
