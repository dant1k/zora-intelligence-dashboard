"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { 
  Twitter, 
  MessageSquare, 
  ExternalLink, 
  ShoppingCart, 
  TrendingUp,
  Users,
  Clock,
  DollarSign,
  Search,
  Filter,
  RefreshCw
} from "lucide-react";

interface Creator {
  address: string;
  name: string;
  creatorHandle?: string;
  tokenTicker?: string;
  marketCap?: number;
  followersCount?: number;
  holdersCount?: number;
  postsCount?: number;
  twitter?: string;
  farcaster?: string;
  zoraLink?: string;
  image?: string;
  createdAt?: string;
  volume24h?: number;
}

interface ZoraVerseTableProps {
  profiles: Creator[];
  onFilterChange: (filters: any) => void;
}

export default function ZoraVerseTable({ profiles, onFilterChange }: ZoraVerseTableProps) {
  const [filteredProfiles, setFilteredProfiles] = useState<Creator[]>(profiles);
  const [sortBy, setSortBy] = useState<string>("marketCap");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [searchQuery, setSearchQuery] = useState("");
  const [followersFilter, setFollowersFilter] = useState("");
  const [minMarketCap, setMinMarketCap] = useState(0);
  const [maxMarketCap, setMaxMarketCap] = useState(10000000);
  const [isLive, setIsLive] = useState(true);

  // Live refresh indicator
  useEffect(() => {
    const interval = setInterval(() => {
      setIsLive(prev => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Format market cap
  const formatMarketCap = (value?: number) => {
    if (!value) return "—";
    if (value >= 1000000) return (value / 1000000).toFixed(1) + "M";
    if (value >= 1000) return (value / 1000).toFixed(1) + "K";
    return value.toFixed(0);
  };

  // Format followers
  const formatFollowers = (value?: number) => {
    if (!value) return "—";
    if (value >= 1000000) return (value / 1000000).toFixed(1) + "M";
    if (value >= 1000) return (value / 1000).toFixed(1) + "K";
    return value.toString();
  };

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
  const generateChartData = (profile: Creator) => {
    const baseValue = profile.marketCap || 1000;
    return Array.from({ length: 7 }, (_, i) => ({
      value: baseValue * (0.8 + Math.random() * 0.4),
      day: i
    }));
  };

  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...profiles];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(profile =>
        profile.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        profile.tokenTicker?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        profile.creatorHandle?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Followers filter
    if (followersFilter) {
      const minFollowers = parseInt(followersFilter.replace("k+", "000"));
      filtered = filtered.filter(profile => 
        (profile.followersCount || 0) >= minFollowers
      );
    }

    // Market cap filter
    filtered = filtered.filter(profile =>
      !profile.marketCap || 
      (profile.marketCap >= minMarketCap && profile.marketCap <= maxMarketCap)
    );

    // Sort
    filtered.sort((a, b) => {
      const aValue = a[sortBy as keyof Creator] as number || 0;
      const bValue = b[sortBy as keyof Creator] as number || 0;
      
      if (sortOrder === "asc") {
        return aValue - bValue;
      } else {
        return bValue - aValue;
      }
    });

    setFilteredProfiles(filtered);
  }, [profiles, searchQuery, followersFilter, minMarketCap, maxMarketCap, sortBy, sortOrder]);

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
  };

  return (
    <div style={{ backgroundColor: "#0A0B0F", minHeight: "100vh", color: "white", padding: "24px" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
        <div>
          <h1 style={{ fontSize: "32px", fontWeight: "600", margin: 0, marginBottom: "8px" }}>
            ZoraVerse — Creator Tracker
          </h1>
          <p style={{ color: "#A3A3A3", margin: 0 }}>
            Real-time analytics for Zora creators and their tokens
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "8px", 
            color: isLive ? "#16A34A" : "#A3A3A3",
            fontSize: "14px"
          }}>
            <div style={{ 
              width: "8px", 
              height: "8px", 
              borderRadius: "50%", 
              backgroundColor: isLive ? "#16A34A" : "#A3A3A3",
              animation: isLive ? "pulse 2s infinite" : "none"
            }} />
            Live updating…
          </div>
        </div>
      </div>

      {/* Filters */}
      <div style={{
        backgroundColor: "#1E1F25",
        borderRadius: "12px",
        padding: "20px",
        marginBottom: "24px",
        border: "1px solid #2A2B31"
      }}>
        <div style={{ display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
          {/* Search */}
          <div style={{ position: "relative", flex: "1", minWidth: "200px" }}>
            <Search style={{
              position: "absolute",
              left: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#A3A3A3",
              width: "16px",
              height: "16px"
            }} />
            <input
              style={{
                width: "100%",
                paddingLeft: "40px",
                paddingRight: "16px",
                paddingTop: "12px",
                paddingBottom: "12px",
                borderRadius: "8px",
                backgroundColor: "#0A0B0F",
                border: "1px solid #2A2B31",
                color: "#fff",
                fontSize: "14px"
              }}
              placeholder="Search by name, ticker, or handle..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Followers Filter */}
          <select
            style={{
              padding: "12px 16px",
              borderRadius: "8px",
              backgroundColor: "#0A0B0F",
              border: "1px solid #2A2B31",
              color: "#fff",
              fontSize: "14px"
            }}
            value={followersFilter}
            onChange={(e) => setFollowersFilter(e.target.value)}
          >
            <option value="">All Followers</option>
            <option value="1k+">1K+</option>
            <option value="10k+">10K+</option>
            <option value="100k+">100K+</option>
          </select>

          {/* Market Cap Range */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <input
              type="number"
              style={{
                width: "100px",
                padding: "12px",
                borderRadius: "8px",
                backgroundColor: "#0A0B0F",
                border: "1px solid #2A2B31",
                color: "#fff",
                fontSize: "14px"
              }}
              placeholder="Min"
              value={minMarketCap}
              onChange={(e) => setMinMarketCap(Number(e.target.value))}
            />
            <span style={{ color: "#A3A3A3" }}>-</span>
            <input
              type="number"
              style={{
                width: "100px",
                padding: "12px",
                borderRadius: "8px",
                backgroundColor: "#0A0B0F",
                border: "1px solid #2A2B31",
                color: "#fff",
                fontSize: "14px"
              }}
              placeholder="Max"
              value={maxMarketCap}
              onChange={(e) => setMaxMarketCap(Number(e.target.value))}
            />
          </div>

          {/* Sort Options */}
          <div style={{ display: "flex", gap: "8px" }}>
            {["marketCap", "followersCount", "holdersCount"].map((field) => (
              <button
                key={field}
                onClick={() => handleSort(field)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  padding: "12px 16px",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: "500",
                  transition: "all 0.2s",
                  backgroundColor: sortBy === field ? "#7C3AED" : "#0A0B0F",
                  color: sortBy === field ? "#fff" : "#A3A3A3",
                  border: "1px solid #2A2B31",
                  cursor: "pointer"
                }}
              >
                {field === "marketCap" && <DollarSign style={{ width: "16px", height: "16px" }} />}
                {field === "followersCount" && <Users style={{ width: "16px", height: "16px" }} />}
                {field === "holdersCount" && <TrendingUp style={{ width: "16px", height: "16px" }} />}
                {field.replace("Count", "").replace(/([A-Z])/g, " $1").trim()}
                {sortBy === field && (
                  <span style={{ fontSize: "12px" }}>
                    {sortOrder === "desc" ? "↓" : "↑"}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table Header */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "2fr 1fr 1fr 0.8fr 1fr 1fr 1.5fr",
        gap: "16px",
        padding: "16px 0",
        borderBottom: "1px solid #2A2B31",
        color: "#A3A3A3",
        fontSize: "14px",
        fontWeight: "500"
      }}>
        <span>Creator</span>
        <span>Coin</span>
        <span>Market Cap</span>
        <span>Age</span>
        <span>Followers</span>
        <span>Socials</span>
        <span>Actions</span>
      </div>

      {/* Table Rows */}
      <div style={{ marginBottom: "24px" }}>
        {filteredProfiles.map((profile, index) => (
          <motion.div
            key={profile.address}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr 0.8fr 1fr 1fr 1.5fr",
              gap: "16px",
              alignItems: "center",
              padding: "20px 0",
              borderBottom: "1px solid #1E1F25",
              transition: "all 0.2s"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#111";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            {/* Creator */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: "#7C3AED",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "16px",
                fontWeight: "bold"
              }}>
                {profile.name?.charAt(0) || "?"}
              </div>
              <div>
                <p style={{ fontWeight: "600", margin: 0, marginBottom: "4px" }}>
                  {profile.name || "Unnamed Creator"}
                </p>
                <p style={{ color: "#A3A3A3", fontSize: "12px", margin: 0 }}>
                  @{profile.creatorHandle || "unknown"}
                </p>
              </div>
            </div>

            {/* Coin */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                backgroundColor: "#7C3AED",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
                fontWeight: "bold"
              }}>
                {profile.tokenTicker?.charAt(0) || "?"}
              </div>
              <span style={{ color: "#7C3AED", fontWeight: "600" }}>
                {profile.tokenTicker || "—"}
              </span>
            </div>

            {/* Market Cap */}
            <div>
              <p style={{ margin: 0, fontWeight: "600" }}>
                ${formatMarketCap(profile.marketCap)}
              </p>
              {profile.volume24h && (
                <p style={{ margin: 0, fontSize: "12px", color: "#A3A3A3" }}>
                  24h: ${formatMarketCap(profile.volume24h)}
                </p>
              )}
            </div>

            {/* Age */}
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <Clock style={{ width: "14px", height: "14px", color: "#A3A3A3" }} />
              <span>{getAge(profile.createdAt)}</span>
            </div>

            {/* Followers */}
            <div>
              <p style={{ margin: 0, fontWeight: "600" }}>
                {formatFollowers(profile.followersCount)}
              </p>
              <p style={{ margin: 0, fontSize: "12px", color: "#A3A3A3" }}>
                {profile.holdersCount} holders
              </p>
            </div>

            {/* Socials */}
            <div style={{ display: "flex", gap: "12px" }}>
              {profile.twitter && (
                <a 
                  href={profile.twitter} 
                  target="_blank" 
                  rel="noreferrer"
                  style={{ 
                    color: "#1DA1F2", 
                    textDecoration: "none",
                    transition: "color 0.2s"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = "#0d8bd9"}
                  onMouseLeave={(e) => e.currentTarget.style.color = "#1DA1F2"}
                >
                  <Twitter style={{ width: "20px", height: "20px" }} />
                </a>
              )}
              {profile.farcaster && (
                <a 
                  href={profile.farcaster} 
                  target="_blank" 
                  rel="noreferrer"
                  style={{ 
                    color: "#8A63D2", 
                    textDecoration: "none",
                    transition: "color 0.2s"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = "#7c3aed"}
                  onMouseLeave={(e) => e.currentTarget.style.color = "#8A63D2"}
                >
                  <MessageSquare style={{ width: "20px", height: "20px" }} />
                </a>
              )}
            </div>

            {/* Actions */}
            <div style={{ display: "flex", gap: "8px" }}>
              <a 
                href={profile.zoraLink} 
                target="_blank" 
                rel="noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  padding: "8px 12px",
                  borderRadius: "6px",
                  backgroundColor: "#1E1F25",
                  color: "#7C3AED",
                  textDecoration: "none",
                  fontSize: "14px",
                  fontWeight: "500",
                  transition: "all 0.2s",
                  border: "1px solid #2A2B31"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#7C3AED";
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#1E1F25";
                  e.currentTarget.style.color = "#7C3AED";
                }}
              >
                <ExternalLink style={{ width: "14px", height: "14px" }} />
                View
              </a>
              <a 
                href={profile.zoraLink} 
                target="_blank" 
                rel="noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  padding: "8px 12px",
                  borderRadius: "6px",
                  backgroundColor: "#16A34A",
                  color: "#fff",
                  textDecoration: "none",
                  fontSize: "14px",
                  fontWeight: "600",
                  transition: "all 0.2s"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#15803d";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#16A34A";
                }}
              >
                <ShoppingCart style={{ width: "14px", height: "14px" }} />
                Buy
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Results Count */}
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        color: "#A3A3A3",
        fontSize: "14px"
      }}>
        <p style={{ margin: 0 }}>
          Showing {filteredProfiles.length} of {profiles.length} creators
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <RefreshCw style={{ width: "16px", height: "16px" }} />
          <span>Auto-refresh every 60s</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
