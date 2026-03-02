import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface BusRoute {
    id: bigint;
    to: string;
    duration: string;
    arrivalTime: string;
    departureTime: string;
    fare: number;
    from: string;
}
export interface Feedback {
    id: bigint;
    name: string;
    comment: string;
    timestamp: bigint;
    rating: bigint;
    phone: string;
}
export interface backendInterface {
    getAllFeedbacks(): Promise<Array<Feedback>>;
    getAllRoutes(): Promise<Array<BusRoute>>;
    searchRoutes(from: string, to: string): Promise<Array<BusRoute>>;
    submitFeedback(name: string, phone: string, rating: bigint, comment: string): Promise<void>;
}
