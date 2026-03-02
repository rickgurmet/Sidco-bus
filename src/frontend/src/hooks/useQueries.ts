import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { BusRoute, Feedback } from "../backend.d";
import { useActor } from "./useActor";

export function useGetAllRoutes() {
  const { actor, isFetching } = useActor();
  return useQuery<BusRoute[]>({
    queryKey: ["routes"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllRoutes();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSearchRoutes(from: string, to: string, enabled: boolean) {
  const { actor, isFetching } = useActor();
  return useQuery<BusRoute[]>({
    queryKey: ["routes", "search", from, to],
    queryFn: async () => {
      if (!actor) return [];
      return actor.searchRoutes(from, to);
    },
    enabled: !!actor && !isFetching && enabled && !!from && !!to,
  });
}

export function useGetAllFeedbacks() {
  const { actor, isFetching } = useActor();
  return useQuery<Feedback[]>({
    queryKey: ["feedbacks"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllFeedbacks();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitFeedback() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      name,
      phone,
      rating,
      comment,
    }: {
      name: string;
      phone: string;
      rating: number;
      comment: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      await actor.submitFeedback(name, phone, BigInt(rating), comment);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feedbacks"] });
    },
  });
}
