import { Market } from "../types";

interface MarketStatsProps {
    isLoading: boolean;
    markets: Market[];
}

export const MartetStats = ({ isLoading, markets }: MarketStatsProps) => {
    const suspendedMarkets = markets.filter((market: Market) => market.is_suspended).length;

    return (
        <div className="market-stats">
            <h2>📊 Market Statistics</h2>

            {isLoading ? (
                <div className="loading">Loading statistics 📈 ...</div>
            ) : (
                <div className="stats">
                    <div className="stat">
                        <span className="value blue">{markets.length}</span>
                        <span className="label">Total Markets</span>
                    </div>

                    <div className="stat">
                        <span className="value red">{suspendedMarkets}</span>
                        <span className="label">Suspensions</span>
                    </div>
                </div>
            )}
        </div>
    );
};
