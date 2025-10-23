"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { TrendingUp, DollarSign } from "lucide-react";

interface TopMarketCapChartProps {
  profiles: any[];
}

export default function TopMarketCapChart({ profiles }: TopMarketCapChartProps) {
  if (!profiles || profiles.length === 0) return null;

  // Сортируем и берём топ-10
  const top10 = [...profiles]
    .filter(p => p.marketCap && p.marketCap > 0)
    .sort((a, b) => (b.marketCap || 0) - (a.marketCap || 0))
    .slice(0, 10)
    .map((p) => ({
      name: p.tokenTicker || p.name?.slice(0, 8) || "Unknown",
      marketCap: p.marketCap,
      fullName: p.name,
      holders: p.holdersCount || 0,
      volume24h: p.volume24h || 0
    }));

  if (top10.length === 0) return null;

  const colors = [
    "#6366f1", "#7c3aed", "#8b5cf6", "#2563eb", "#10b981",
    "#f59e0b", "#f97316", "#ef4444", "#06b6d4", "#a855f7"
  ];

  const formatMarketCap = (value: number) => {
    if (value >= 1000000) {
      return '$' + (value / 1000000).toFixed(1) + 'M';
    } else if (value >= 1000) {
      return '$' + (value / 1000).toFixed(1) + 'K';
    }
    return '$' + value.toFixed(0);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-lg p-4 shadow-xl">
          <p className="text-white font-semibold mb-2">{data.fullName}</p>
          <p className="text-indigo-400 text-sm mb-1">Ticker: {data.name}</p>
          <p className="text-green-400 font-bold text-lg">
            Market Cap: {formatMarketCap(data.marketCap)}
          </p>
          <p className="text-gray-300 text-sm">Holders: {data.holders.toLocaleString()}</p>
          {data.volume24h > 0 && (
            <p className="text-blue-400 text-sm">
              24h Volume: {formatMarketCap(data.volume24h)}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-600/20 rounded-lg">
            <TrendingUp className="w-6 h-6 text-indigo-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Top 10 by Market Cap</h2>
            <p className="text-gray-400 text-sm">Leading Zora tokens by market capitalization</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <DollarSign className="w-4 h-4" />
          <span>Real-time data</span>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={400}>
        <BarChart 
          data={top10} 
          layout="horizontal" 
          margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
        >
          <XAxis 
            type="number" 
            tick={{ fill: "#9ca3af", fontSize: 12 }}
            axisLine={{ stroke: "#374151" }}
            tickLine={{ stroke: "#374151" }}
            tickFormatter={(value) => formatMarketCap(value)}
          />
          <YAxis 
            type="category" 
            dataKey="name" 
            tick={{ fill: "#d1d5db", fontSize: 12 }}
            axisLine={{ stroke: "#374151" }}
            tickLine={{ stroke: "#374151" }}
            width={90}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="marketCap" 
            radius={[0, 8, 8, 0]}
            maxBarSize={40}
          >
            {top10.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={colors[index % colors.length]}
                className="hover:opacity-80 transition-opacity"
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      
      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-2">
        {top10.slice(0, 5).map((item, index) => (
          <div key={index} className="flex items-center gap-2 text-xs">
            <div 
              className="w-3 h-3 rounded"
              style={{ backgroundColor: colors[index] }}
            />
            <span className="text-gray-400">{item.name}</span>
          </div>
        ))}
        {top10.length > 5 && (
          <span className="text-gray-500 text-xs">+{top10.length - 5} more</span>
        )}
      </div>
    </div>
  );
}

