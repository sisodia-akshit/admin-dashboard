import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAdminStats, getDashboardStats } from "../services/dashboardApi";
import { useAuth } from "./AuthContext";

const DashboardStatsContext = createContext(null);

export function DashboardStatsProvider({ children }) {
    const { user } = useAuth();

    const {
        data,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["dashboard-stats", user?.role],
        queryFn: ({ signal }) =>
            user.role === "admin"
                ? getAdminStats({ signal })
                : getDashboardStats({ signal }),
        enabled: Boolean(user?.role),
        staleTime: 60 * 1000, // optional but recommended
    });

    return (
        <DashboardStatsContext.Provider
            value={{
                stats: data ?? {},
                isLoading,
                error,
            }}
        >
            {children}
        </DashboardStatsContext.Provider>
    );
}

export const useDashboardStats = () => {
    const ctx = useContext(DashboardStatsContext);
    if (!ctx) {
        throw new Error(
            "useDashboardStats must be used inside DashboardStatsProvider"
        );
    }
    return ctx;
};
