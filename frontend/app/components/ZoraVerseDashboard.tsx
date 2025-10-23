"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { 
  Twitter, 
  MessageSquare, 
  ExternalLink, 
  ShoppingCart, 
  TrendingUp,
  Users,
  Clock,
  DollarSign,
  RefreshCw,
  Search,
  Filter
} from "lucide-react";

type Creator = {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  coin: string;
  marketCap: number;
  age: string;
  followers: number;
  socials: { x?: string; fc?: string };
  zora: string;
  buy: string;
  chartData?: { time: string; value: number }[];
};

type OverviewPoint = { day: string; value: number };

export default function ZoraVerseDashboard() {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [overview, setOverview] = useState<OverviewPoint[]>([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("marketCap");
  const [minFollowers, setMinFollowers] = useState(0);
  const [minCap, setMinCap] = useState(0);
  const [maxCap, setMaxCap] = useState(Infinity);
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(true);

  // Live refresh indicator
  useEffect(() => {
    const interval = setInterval(() => {
      setIsLive(prev => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  async function fetchCreators() {
    try {
      setLoading(true);
      console.log("Fetching creators from API...");
      
      const res = await fetch("http://localhost:8000/profiles");
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();
      console.log("API response:", data);
      
      if (data.profiles && Array.isArray(data.profiles)) {
        // Transform backend data to match our Creator type
        const transformedCreators: Creator[] = data.profiles.map((profile: any, index: number) => ({
          id: profile.address || `creator-${index}`,
          name: profile.name || "Unnamed Creator",
          handle: profile.creatorHandle || "unknown",
          avatar: profile.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.name || index}`,
          coin: profile.tokenTicker || "—",
          marketCap: profile.marketCap || 0,
          age: getAge(profile.createdAt),
          followers: profile.followersCount || 0,
          socials: {
            x: profile.twitter,
            fc: profile.farcaster
          },
          zora: profile.zoraLink || "#",
          buy: profile.zoraLink || "#",
          chartData: generateChartData(profile.marketCap || 1000)
        }));
        
        console.log("Transformed creators:", transformedCreators.length);
        setCreators(transformedCreators);
      } else {
        console.warn("No profiles data received or invalid format:", data);
        setCreators([]);
      }
    } catch (error) {
      console.error("Error fetching creators:", error);
      setCreators([]);
    } finally {
      setLoading(false);
    }
  }

  // Calculate age
  const getAge = (createdAt?: string) => {
    if (!createdAt) return "—";
    const now = new Date();
    const created = new Date(createdAt);
    const diffMs = now.getTime() - created.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffDays > 0) return `${diffDays}d`;
    if (diffHours > 0) return `${diffHours}h`;
    return "1h";
  };

  // Generate mock chart data
  const generateChartData = (baseValue: number) => {
    return Array.from({ length: 7 }, (_, i) => ({
      time: `${i}d`,
      value: baseValue * (0.8 + Math.random() * 0.4)
    }));
  };

  // Generate overview data
  const generateOverviewData = () => {
    return Array.from({ length: 7 }, (_, i) => ({
      day: `${i + 1}d`,
      value: 1000000 + Math.random() * 5000000
    }));
  };

  // Format numbers
  const formatNumber = (value: number) => {
    if (value >= 1000000) return (value / 1000000).toFixed(1) + "M";
    if (value >= 1000) return (value / 1000).toFixed(1) + "K";
    return value.toString();
  };

  useEffect(() => {
    fetchCreators();
    setOverview(generateOverviewData());
    const interval = setInterval(() => {
      fetchCreators();
      setOverview(generateOverviewData());
    }, 60000); // автообновление каждые 60 сек
    return () => clearInterval(interval);
  }, []);

  const filteredCreators = useMemo(() => {
    return creators
      .filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.handle.toLowerCase().includes(search.toLowerCase()) ||
        c.coin.toLowerCase().includes(search.toLowerCase())
      )
      .filter((c) => c.followers >= minFollowers)
      .filter((c) => c.marketCap >= minCap && c.marketCap <= maxCap)
      .sort((a, b) =>
        sortBy === "followers"
          ? b.followers - a.followers
          : b.marketCap - a.marketCap
      );
  }, [creators, search, sortBy, minFollowers, minCap, maxCap]);

  const totalMarketCap = filteredCreators.reduce((sum, c) => sum + c.marketCap, 0);
  const newTokens = filteredCreators.filter((c) => c.age.includes("h")).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0B0F] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#7C3AED] mx-auto mb-4"></div>
          <p className="text-gray-400 text-lg">Loading ZoraVerse creators...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0B0F] text-white">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative overflow-hidden p-10 mb-10"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#7C3AED]/10 via-[#00B3FF]/10 to-[#7C3AED]/10 blur-3xl opacity-60" />
        <div className="relative z-10 flex flex-col items-center text-center">
          <img
            src="https://zora.co/_next/image?url=%2Flogos%2Fzora-logo.png&w=128&q=75"
            alt="ZoraVerse"
            className="w-16 h-16 mb-4 opacity-90"
          />
          <h1 className="text-5xl font-bold bg-gradient-to-r from-[#7C3AED] to-[#00B3FF] bg-clip-text text-transparent">
            ZoraVerse
          </h1>
          <p className="text-gray-400 text-lg mt-2 max-w-xl">
            Real-time analytics for Zora creators, tokens, and social metrics — all in one place.
          </p>
          <p className="text-sm text-gray-500 mt-3">🟢 Live data refreshes every 60 seconds</p>
        </div>
      </motion.div>

      <div className="px-8 pb-20">
        {/* Overview */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="bg-[#1E1F25] p-5 rounded-xl border border-gray-800">
            <p className="text-gray-400 text-sm mb-1">Total Market Cap</p>
            <p className="text-2xl font-semibold">${totalMarketCap.toLocaleString()}</p>
          </div>
          <div className="bg-[#1E1F25] p-5 rounded-xl border border-gray-800">
            <p className="text-gray-400 text-sm mb-1">New Tokens (24h)</p>
            <p className="text-2xl font-semibold text-green-400">{newTokens}</p>
          </div>
          <div className="bg-[#1E1F25] p-5 rounded-xl border border-gray-800">
            <p className="text-gray-400 text-sm mb-3">Market Cap 7D</p>
            <div className="h-[80px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={overview}>
                  <Line type="monotone" dataKey="value" stroke="#7C3AED" strokeWidth={2} dot={false} />
                  <XAxis dataKey="day" hide />
                  <YAxis hide />
                  <Tooltip contentStyle={{ background: "#1E1F25", border: "none" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#1E1F25] border border-gray-800 rounded-xl p-4 flex flex-wrap gap-4 mb-6"
        >
          <input
            type="text"
            placeholder="Search creator or token..."
            className="bg-[#0A0B0F] text-gray-200 px-4 py-2 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="bg-[#0A0B0F] text-gray-300 px-3 py-2 rounded-lg border border-gray-700"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="marketCap">Sort by Market Cap</option>
            <option value="followers">Sort by Followers</option>
          </select>

          <select
            className="bg-[#0A0B0F] text-gray-300 px-3 py-2 rounded-lg border border-gray-700"
            value={minFollowers}
            onChange={(e) => setMinFollowers(Number(e.target.value))}
          >
            <option value={0}>Followers: All</option>
            <option value={1000}>1K+</option>
            <option value={5000}>5K+</option>
            <option value={10000}>10K+</option>
          </select>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">Market Cap $</span>
            <input
              type="number"
              placeholder="min"
              className="bg-[#0A0B0F] text-gray-200 w-24 px-3 py-2 rounded-lg border border-gray-700 focus:outline-none"
              onChange={(e) => setMinCap(Number(e.target.value) || 0)}
            />
            <span className="text-gray-400">–</span>
            <input
              type="number"
              placeholder="max"
              className="bg-[#0A0B0F] text-gray-200 w-24 px-3 py-2 rounded-lg border border-gray-700 focus:outline-none"
              onChange={(e) =>
                setMaxCap(e.target.value ? Number(e.target.value) : Infinity)
              }
            />
          </div>
        </motion.div>

        {/* Table header */}
        <div className="grid grid-cols-7 gap-4 py-3 border-b border-gray-700 text-gray-400 text-sm">
          <span>Creator</span>
          <span>Coin</span>
          <span>Market Cap</span>
          <span>Age</span>
          <span>Followers</span>
          <span>Chart</span>
          <span>Actions</span>
        </div>

        {/* Table rows */}
        {filteredCreators.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            className="grid grid-cols-7 gap-4 items-center py-4 border-b border-gray-800 hover:bg-[#111] transition"
          >
            {/* Creator */}
            <div className="flex items-center gap-3">
              <img src={item.avatar} alt="" className="w-8 h-8 rounded-full" />
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-xs text-gray-500">@{item.handle}</p>
              </div>
            </div>

            {/* Coin */}
            <p className="text-[#7C3AED] font-medium">{item.coin}</p>

            {/* Market Cap */}
            <p>${item.marketCap.toLocaleString()}</p>

            {/* Age */}
            <p>{item.age}</p>

            {/* Followers */}
            <p>{item.followers.toLocaleString()}</p>

            {/* Chart */}
            <div className="h-[50px] w-[120px]">
              {item.chartData && (
                <LineChart width={120} height={50} data={item.chartData}>
                  <Line type="monotone" dataKey="value" stroke="#7C3AED" strokeWidth={2} dot={false} />
                </LineChart>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <a href={item.zora} target="_blank" className="text-blue-400 text-sm hover:underline">
                View
              </a>
              <a href={item.buy} target="_blank" className="bg-green-600 px-3 py-1 rounded-lg text-sm font-semibold hover:bg-green-500 transition">
                Buy
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
