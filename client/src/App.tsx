import { useEffect, useState } from "react";

import "./App.css";
import { MarketFilters, MarketTable, MartetStats } from "./components";
import { useMarkets } from "./hooks/useMarkets";
import { Filters } from "./types";

function App() {
    const [filters, setFilters] = useState<Filters>({
        position: "",
        statType: "",
        suspensionStatus: "",
        search: ""
    });

    const { markets, loading, error, fetchMarkets, toggleSuspension } = useMarkets();

    useEffect(() => {
        fetchMarkets(filters);
    }, [filters]);

    const handleFiltersChange = (newFilters: Filters) => {
        setFilters(newFilters);
    };

    if (error) {
        return (
            <div className="error-container">
                <h3>Error Loading Markets</h3>
                <p>{error}</p>
                <button onClick={() => fetchMarkets(filters)} className="btn btn-primary">
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="app-container">
            <header className="app-header">
                <h1 className="app-title">Player Markets Stats 🏀</h1>
                <p className="app-subtitle">NBA Player Prop Betting Lines & Market Status</p>
            </header>

            <MarketFilters filters={filters} onFiltersChange={handleFiltersChange} />

            <div className="section-container">
                <h2 className="section-title">Markets ({markets.length})</h2>
                <p className="section-description">
                    • <strong>Optimal Line:</strong> Primary betting line from props data
                    <br />• <strong>Low/High Line:</strong> Range of available alternate lines
                    <br />• <strong>Status:</strong> Auto = computed suspension, Manual = user
                    override
                </p>
            </div>

            <MartetStats isLoading={loading} markets={markets} />

            <MarketTable
                markets={markets}
                onToggleSuspension={toggleSuspension}
                loading={loading}
            />
        </div>
    );
}

export default App;
