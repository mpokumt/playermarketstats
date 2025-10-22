import "@testing-library/jest-dom";
import { cleanup, render, screen, waitFor } from "@testing-library/react";

import { Market } from "../types";
import { MarketTable } from "./MarketTable";

const mockMarkets: Market[] = [
    {
        id: 1,
        player_id: 19,
        stat_type_id: 5,
        line: 15.5,
        market_suspended: 1,
        position: "forward",
        stat_type_name: "points",
        manual_suspension: 1,
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
        high_line: 17,
        is_suspended: false
    },
    {
        id: 3,
        player_id: 12,
        stat_type_id: 7,
        line: 12.0,
        market_suspended: 1,
        position: "center",
        stat_type_name: "rebounds",
        manual_suspension: null,
        player_name: "Bob Johnson",
        team_nickname: "Lions",
        team_abbr: "LNS",
        low_line: 8,
        high_line: 18,
        is_suspended: true
    }
];

const mockHandleToggleSuspension = jest.fn();

describe("MarketTable", () => {
    afterEach(() => {
        cleanup();
        jest.clearAllMocks();
    });

    test("renders loading state initially", async () => {
        // ARRANGE
        await waitFor(() =>
            render(
                <MarketTable
                    loading={true}
                    onToggleSuspension={mockHandleToggleSuspension}
                    markets={mockMarkets}
                />
            )
        );

        // ASSERT
        expect(screen.getByText("Loading markets...")).toBeVisible();
    });

    test("renders market table with data", async () => {
        // ARRANGE
        await waitFor(() =>
            render(
                <MarketTable
                    loading={false}
                    onToggleSuspension={mockHandleToggleSuspension}
                    markets={mockMarkets}
                />
            )
        );

        const allRows = screen.getAllByRole("row");

        // ASSERT
        expect(allRows).toHaveLength(4); // 3 data rows + 1 header row
    });

    test("renders empty state when no markets", async () => {
        // ARRANGE
        await waitFor(() =>
            render(
                <MarketTable
                    loading={false}
                    onToggleSuspension={mockHandleToggleSuspension}
                    markets={[]}
                />
            )
        );

        // ASSERT
        expect(screen.getByText("No markets found.")).toBeVisible();
    });

    test("renders correct suspension and button text", async () => {
        // ARRANGE
        await waitFor(() =>
            render(
                <MarketTable
                    loading={false}
                    onToggleSuspension={mockHandleToggleSuspension}
                    markets={mockMarkets}
                />
            )
        );

        // ASSERT
        const overrideButton = screen.getByText("Remove Override");
        const releaseButton = screen.getByText("Suspend");

        expect(overrideButton).toBeVisible();
        expect(releaseButton).toBeVisible();
    });

    test("calls onToggleSuspension when button clicked", async () => {
        // ARRANGE
        await waitFor(() =>
            render(
                <MarketTable
                    loading={false}
                    onToggleSuspension={mockHandleToggleSuspension}
                    markets={mockMarkets}
                />
            )
        );

        // ACT
        const suspendButton = screen.getByText("Suspend");
        suspendButton.click();

        // ASSERT
        expect(mockHandleToggleSuspension).toHaveBeenCalledTimes(1);
    });
});
