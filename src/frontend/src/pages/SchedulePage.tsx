import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertCircle,
  ArrowRight,
  Bus,
  Clock,
  DollarSign,
  Loader2,
  MapPin,
  Search,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { BusRoute } from "../backend.d";
import PageLayout from "../components/layout/PageLayout";
import { useGetAllRoutes, useSearchRoutes } from "../hooks/useQueries";

function RouteCard({
  route,
  index,
  ocidPrefix,
}: {
  route: BusRoute;
  index: number;
  ocidPrefix: string;
}) {
  return (
    <motion.div
      key={route.id.toString()}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      data-ocid={`${ocidPrefix}.item.${index + 1}`}
      className="group relative overflow-hidden rounded-xl border border-border bg-card p-4 sm:p-5 hover:border-primary/40 transition-all duration-200 hover:shadow-[0_0_24px_oklch(0.78_0.17_65/0.1)]"
    >
      {/* Fare badge - top right */}
      <div className="absolute top-4 right-4">
        <Badge className="bg-primary/15 text-primary border-primary/25 font-semibold font-display text-sm px-2.5 py-0.5">
          <DollarSign className="w-3 h-3 mr-0.5" />
          {Number(route.fare).toFixed(2)}
        </Badge>
      </div>

      {/* Route header */}
      <div className="flex items-center gap-2 mb-4 pr-16">
        <div className="flex items-center gap-2 min-w-0">
          <MapPin className="w-4 h-4 text-primary shrink-0" />
          <span className="font-display font-bold text-foreground truncate">
            {route.from}
          </span>
        </div>
        <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0" />
        <div className="flex items-center gap-2 min-w-0">
          <MapPin className="w-4 h-4 text-muted-foreground shrink-0" />
          <span className="font-display font-bold text-foreground truncate">
            {route.to}
          </span>
        </div>
      </div>

      {/* Details grid */}
      <div className="grid grid-cols-3 gap-2">
        <div className="rounded-lg bg-secondary/50 px-3 py-2">
          <p className="text-muted-foreground text-xs mb-0.5">Departs</p>
          <p className="font-semibold text-foreground text-sm font-display">
            {route.departureTime}
          </p>
        </div>
        <div className="rounded-lg bg-secondary/50 px-3 py-2">
          <p className="text-muted-foreground text-xs mb-0.5">Arrives</p>
          <p className="font-semibold text-foreground text-sm font-display">
            {route.arrivalTime}
          </p>
        </div>
        <div className="rounded-lg bg-secondary/50 px-3 py-2">
          <p className="text-muted-foreground text-xs mb-0.5">Duration</p>
          <p className="font-semibold text-foreground text-sm font-display flex items-center gap-1">
            <Clock className="w-3 h-3 text-primary shrink-0" />
            {route.duration}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function RouteSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-card p-4 sm:p-5">
      <div className="flex items-center gap-2 mb-4 pr-16">
        <Skeleton className="h-4 w-24 bg-secondary" />
        <Skeleton className="h-4 w-4 rounded-full bg-secondary" />
        <Skeleton className="h-4 w-24 bg-secondary" />
      </div>
      <div className="grid grid-cols-3 gap-2">
        <Skeleton className="h-14 rounded-lg bg-secondary" />
        <Skeleton className="h-14 rounded-lg bg-secondary" />
        <Skeleton className="h-14 rounded-lg bg-secondary" />
      </div>
    </div>
  );
}

function RouteTable({
  routes,
  isLoading,
}: { routes: BusRoute[]; isLoading: boolean }) {
  if (isLoading) {
    return (
      <div data-ocid="schedule.all.loading_state" className="space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <RouteSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (routes.length === 0) {
    return (
      <div
        data-ocid="schedule.all.empty_state"
        className="flex flex-col items-center justify-center py-16 text-center"
      >
        <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
          <Bus className="w-8 h-8 text-muted-foreground" />
        </div>
        <p className="font-display font-bold text-lg text-foreground mb-1">
          No routes available
        </p>
        <p className="text-muted-foreground text-sm">
          Check back later for updated schedules.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {routes.map((route, i) => (
        <RouteCard
          key={route.id.toString()}
          route={route}
          index={i}
          ocidPrefix="schedule.all"
        />
      ))}
    </div>
  );
}

export default function SchedulePage() {
  const [fromStop, setFromStop] = useState("");
  const [toStop, setToStop] = useState("");
  const [searchEnabled, setSearchEnabled] = useState(false);

  const { data: allRoutes = [], isLoading: allLoading } = useGetAllRoutes();

  // Derive unique stop options
  const fromOptions = [...new Set(allRoutes.map((r) => r.from))].sort();
  const toOptions = [...new Set(allRoutes.map((r) => r.to))].sort();

  const {
    data: searchResults = [],
    isLoading: searchLoading,
    isFetching: searchFetching,
  } = useSearchRoutes(fromStop, toStop, searchEnabled);

  const isSearching = searchLoading || searchFetching;

  function handleSearch() {
    if (!fromStop || !toStop) return;
    setSearchEnabled(true);
  }

  function handleFromChange(val: string) {
    setFromStop(val);
    setSearchEnabled(false);
  }

  function handleToChange(val: string) {
    setToStop(val);
    setSearchEnabled(false);
  }

  const showSearchResults = searchEnabled && !isSearching;

  return (
    <PageLayout showBack title="">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/20 flex items-center justify-center">
              <Bus className="w-5 h-5 text-primary" strokeWidth={2} />
            </div>
            <h1 className="font-display text-3xl font-extrabold text-foreground">
              Bus Schedule
            </h1>
          </div>
          <p className="text-muted-foreground ml-13">
            Search by route or browse all available schedules.
          </p>
        </motion.div>

        <Tabs defaultValue="search" className="w-full">
          <TabsList className="w-full grid grid-cols-2 bg-secondary border border-border rounded-xl p-1 mb-6 h-auto">
            <TabsTrigger
              value="search"
              data-ocid="schedule.search_tab"
              className="rounded-lg py-2.5 font-semibold text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm transition-all"
            >
              <Search className="w-4 h-4 mr-2" />
              Search Route
            </TabsTrigger>
            <TabsTrigger
              value="all"
              data-ocid="schedule.all_tab"
              className="rounded-lg py-2.5 font-semibold text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm transition-all"
            >
              <Bus className="w-4 h-4 mr-2" />
              All Schedules
            </TabsTrigger>
          </TabsList>

          {/* Search Tab */}
          <TabsContent value="search" className="mt-0">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Search form */}
              <div className="rounded-xl border border-border bg-card p-5 mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div className="flex flex-col gap-2">
                    <span className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-primary" />
                      From
                    </span>
                    <Select
                      value={fromStop}
                      onValueChange={handleFromChange}
                      disabled={allLoading}
                    >
                      <SelectTrigger
                        data-ocid="schedule.from_select"
                        className="bg-secondary border-border h-11"
                        aria-label="Select departure stop"
                      >
                        <SelectValue placeholder="Select departure stop" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover border-border">
                        {fromOptions.map((stop) => (
                          <SelectItem
                            key={stop}
                            value={stop}
                            className="focus:bg-secondary"
                          >
                            {stop}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <span className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                      To
                    </span>
                    <Select
                      value={toStop}
                      onValueChange={handleToChange}
                      disabled={allLoading}
                    >
                      <SelectTrigger
                        data-ocid="schedule.to_select"
                        className="bg-secondary border-border h-11"
                        aria-label="Select destination stop"
                      >
                        <SelectValue placeholder="Select destination stop" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover border-border">
                        {toOptions.map((stop) => (
                          <SelectItem
                            key={stop}
                            value={stop}
                            className="focus:bg-secondary"
                          >
                            {stop}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button
                  data-ocid="schedule.search_button"
                  onClick={handleSearch}
                  disabled={!fromStop || !toStop || isSearching}
                  className="w-full h-11 bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
                >
                  {isSearching ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4 mr-2" />
                      Search Routes
                    </>
                  )}
                </Button>
              </div>

              {/* Search results */}
              <AnimatePresence mode="wait">
                {isSearching && (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    data-ocid="schedule.result.loading_state"
                    className="space-y-3"
                  >
                    {[1, 2].map((i) => (
                      <RouteSkeleton key={i} />
                    ))}
                  </motion.div>
                )}

                {showSearchResults && searchResults.length === 0 && (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    data-ocid="schedule.result.empty_state"
                    className="flex flex-col items-center justify-center py-14 text-center"
                  >
                    <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center mb-4">
                      <AlertCircle className="w-7 h-7 text-muted-foreground" />
                    </div>
                    <p className="font-display font-bold text-lg text-foreground mb-1">
                      No routes found
                    </p>
                    <p className="text-muted-foreground text-sm">
                      No buses travel from{" "}
                      <span className="text-foreground font-medium">
                        {fromStop}
                      </span>{" "}
                      to{" "}
                      <span className="text-foreground font-medium">
                        {toStop}
                      </span>
                      .
                    </p>
                    <p className="text-muted-foreground text-sm mt-1">
                      Try a different route combination.
                    </p>
                  </motion.div>
                )}

                {showSearchResults && searchResults.length > 0 && (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <p className="text-sm text-muted-foreground">
                        <span className="text-foreground font-semibold">
                          {searchResults.length}
                        </span>{" "}
                        route{searchResults.length !== 1 ? "s" : ""} found
                      </p>
                    </div>
                    <div className="space-y-3">
                      {searchResults.map((route, i) => (
                        <RouteCard
                          key={route.id.toString()}
                          route={route}
                          index={i}
                          ocidPrefix="schedule.result"
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </TabsContent>

          {/* All Schedules Tab */}
          <TabsContent value="all" className="mt-0">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {!allLoading && allRoutes.length > 0 && (
                <p className="text-sm text-muted-foreground mb-4">
                  Showing all{" "}
                  <span className="text-foreground font-semibold">
                    {allRoutes.length}
                  </span>{" "}
                  available routes
                </p>
              )}
              <RouteTable routes={allRoutes} isLoading={allLoading} />
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
}
