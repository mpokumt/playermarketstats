import "@testing-library/jest-dom";
import { cleanup, render, screen, waitFor } from "@testing-library/react";

import { Market } from "../types";
import { MartetStats } from "./MarketStats";

const mockMarkets: Market[] = [
    {
        id: 1,
        player_id: 10,
        stat_type_id: 5,
        line: 15.5,
        market_suspended: 1,
        position: "forward",
        stat_type_name: "points",
        manual_suspension: null,
        player_name: "John Doe",
        team_nickname: "Eagles",
        team_abbr: "EGL",
        low_line: 10,
        high_line: 20,
        is_suspended: true
    },
    {
        id: 2,
        player_id: 11,
        stat_type_id: 6,
        line: 7.5,
        market_suspended: 0,
        position: "guard",
        stat_type_name: "assists",
        manual_suspension: null,
        player_name: "Jane Smith",
        team_nickname: "Tigers",
        team_abbr: "TGR",
        low_line: 5,
        high_line: 10,
        is_suspended: false
    }
];

describe("MarketStats", () => {
    afterEach(() => {
        cleanup();
        jest.clearAllMocks();
    });

    test("renders loading state initially", async () => {
        // ARRANGE
        await waitFor(() => render(<MartetStats isLoading={true} markets={mockMarkets} />));

        // ASSERT
        expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });

    test("renders market statistics correctly when loading is false", async () => {
        // ARRANGE
        await waitFor(() => render(<MartetStats isLoading={false} markets={mockMarkets} />));

        // ASSERT
        expect(screen.getByText("📊 Market Statistics")).toBeInTheDocument();
        expect(screen.getByText("Total Markets")).toBeInTheDocument();
        expect(screen.getByText("2")).toHaveClass("value blue");
        expect(screen.getByText("Suspensions")).toBeInTheDocument();
        expect(screen.getByText("1")).toHaveClass("value red");
    });
});
