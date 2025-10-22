import "@testing-library/jest-dom";
import { cleanup, render, screen, waitFor } from "@testing-library/react";

import App from "./App";

// const mockMarkets: Market[] = [
//     {
//         id: 1,
//         player_id: 10,
//         stat_type_id: 5,
//         line: 15.5,
//         market_suspended: 1,
//         position: "forward",
//         stat_type_name: "points",
//         manual_suspension: null,
//         player_name: "John Doe",
//         team_nickname: "Eagles",
//         team_abbr: "EGL",
//         low_line: 10,
//         high_line: 20,
//         is_suspended: true
//     },
//     {
//         id: 2,
//         player_id: 11,
//         stat_type_id: 6,
//         line: 7.5,
//         market_suspended: 0,
//         position: "guard",
//         stat_type_name: "assists",
//         manual_suspension: null,
//         player_name: "Jane Smith",
//         team_nickname: "Tigers",
//         team_abbr: "TGR",
//         low_line: 5,
//         high_line: 10,
//         is_suspended: false
//     }
// ];

describe("App", () => {
    afterEach(() => {
        cleanup();
        jest.clearAllMocks();
    });

    test("renders App component", async () => {
        // ARRANGE
        await waitFor(() => render(<App />));

        // ASSERT
        expect(screen.getByText(/market statistics/i)).toBeInTheDocument();
    });

    test("loads and displays filter options", async () => {
        // ARRANGE
        await waitFor(() => render(<App />));

        // ASSERT
        await waitFor(() => expect(screen.getByTestId("select-all-positions")).toBeInTheDocument());
        await waitFor(() => expect(screen.getByTestId("select-stat-type")).toBeInTheDocument());
        await waitFor(() =>
            expect(screen.getByTestId("select-suspension-status")).toBeInTheDocument()
        );
    });

    test("displays loading state initially", async () => {
        // ARRANGE
        await waitFor(() => render(<App />));

        // ASSERT
        expect(screen.getByText(/loading markets/i)).toBeInTheDocument();
    });

    
});
