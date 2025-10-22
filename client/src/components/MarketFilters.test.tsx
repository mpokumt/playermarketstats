jest.mock("../services/api", () => ({
    api: {
        getFilterOptions: jest.fn(() =>
            Promise.resolve({
                positions: ["C", "F", "G"],
                statTypes: ["points", "rebounds"],
                suspensionStatuses: ["active", "suspended"]
            })
        )
    }
}));

import "@testing-library/jest-dom";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Filters } from "../types";
import { MarketFilters } from "./MarketFilters";

const mockFilters: Filters = {
    position: "",
    statType: "",
    suspensionStatus: "",
    search: ""
};

const mockHandleFilterChange = jest.fn();

describe("MarketFilters", () => {
    afterEach(() => {
        cleanup();
        jest.clearAllMocks();
    });

    test("renders MarketFilters component", () => {
        // ARRANGE
        render(<MarketFilters onFiltersChange={mockHandleFilterChange} filters={mockFilters} />);

        // ASSERT
        expect(screen.getByText("Filters")).toBeVisible();
    });

    test("renders correct filter options", async () => {
        // ARRANGE
        await waitFor(() =>
            render(<MarketFilters onFiltersChange={mockHandleFilterChange} filters={mockFilters} />)
        );

        // ASSERT
        expect(screen.getByText("Position:")).toBeVisible();
        expect(screen.getByText("Stat Type:")).toBeVisible();
        expect(screen.getByText("Market Status:")).toBeVisible();
        expect(screen.getByText("Player/Team Search:")).toBeVisible();
    });

    test("calls filterChange for player search input", async () => {
        // ARRANGE
        await waitFor(() =>
            render(<MarketFilters onFiltersChange={mockHandleFilterChange} filters={mockFilters} />)
        );

        const playerSearch = screen.getByRole("textbox");

        fireEvent.change(playerSearch, { target: { value: "A" } });

        // ASSERT
        expect(mockHandleFilterChange).toHaveBeenCalledTimes(1);
    });

    test("calls filterChange for position select", async () => {
        // ARRANGE
        await waitFor(() =>
            render(<MarketFilters onFiltersChange={mockHandleFilterChange} filters={mockFilters} />)
        );

        await waitFor(() =>
            userEvent.selectOptions(screen.getByTestId("select-all-positions"), "C")
        );

        // ASSERT
        expect(mockHandleFilterChange).toHaveBeenCalledTimes(1);
    });

    test("calls filterChange for stat type select", async () => {
        // ARRANGE
        await waitFor(() =>
            render(<MarketFilters onFiltersChange={mockHandleFilterChange} filters={mockFilters} />)
        );

        await waitFor(() =>
            userEvent.selectOptions(screen.getByTestId("select-stat-type"), "points")
        );

        // ASSERT
        expect(mockHandleFilterChange).toHaveBeenCalledTimes(1);
    });

    test("calls filterChange for market status select", async () => {
        // ARRANGE
        await waitFor(() =>
            render(<MarketFilters onFiltersChange={mockHandleFilterChange} filters={mockFilters} />)
        );

        await waitFor(() =>
            userEvent.selectOptions(screen.getByTestId("select-suspension-status"), "suspended")
        );

        // ASSERT
        expect(mockHandleFilterChange).toHaveBeenCalledTimes(1);
    });
});
