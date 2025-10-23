"use client";
import { motion } from "framer-motion";
import { ExternalLink, TrendingUp, Users, DollarSign, MessageSquare } from "lucide-react";

interface ProfileCardProps {
  profile: any;
}

export default function ProfileCard({ profile }: ProfileCardProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1000000) {
      return '$' + (marketCap / 1000000).toFixed(1) + 'M';
    } else if (marketCap >= 1000) {
      return '$' + (marketCap / 1000).toFixed(1) + 'K';
    }
    return '$' + marketCap.toFixed(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      style={{
        background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.5), rgba(31, 41, 55, 0.3))',
        backdropFilter: 'blur(8px)',
        border: '1px solid #374151',
        borderRadius: '16px',
        padding: '24px',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.5)';
        e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(99, 102, 241, 0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#374151';
        e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
      }}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors truncate">
            {profile.name || "Unnamed Profile"}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="bg-indigo-600/20 text-indigo-400 px-2 py-1 rounded-lg text-sm font-medium">
              {profile.tokenTicker || "—"}
            </span>
            {profile.creatorHandle && (
              <span className="text-gray-400 text-sm">@{profile.creatorHandle}</span>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          {profile.twitter && (
            <a 
              href={profile.twitter} 
              target="_blank" 
              rel="noreferrer"
              className="p-2 rounded-lg bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 transition-all"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          )}
          {profile.farcaster && (
            <a 
              href={profile.farcaster} 
              target="_blank" 
              rel="noreferrer"
              className="p-2 rounded-lg bg-purple-600/20 text-purple-400 hover:bg-purple-600/30 transition-all"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </a>
          )}
          <a 
            href={profile.zoraLink} 
            target="_blank" 
            rel="noreferrer"
            className="p-2 rounded-lg bg-gray-600/20 text-gray-400 hover:bg-gray-600/30 transition-all"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-400 text-sm mb-4 line-clamp-2 min-h-[2.5rem]">
        {profile.description || "No description available"}
      </p>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center gap-2 p-3 rounded-lg bg-gray-800/30">
          <DollarSign className="w-4 h-4 text-green-400" />
          <div>
            <p className="text-xs text-gray-400">Market Cap</p>
            <p className="text-sm font-semibold text-white">
              {profile.marketCap ? formatMarketCap(profile.marketCap) : "—"}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 p-3 rounded-lg bg-gray-800/30">
          <Users className="w-4 h-4 text-blue-400" />
          <div>
            <p className="text-xs text-gray-400">Holders</p>
            <p className="text-sm font-semibold text-white">
              {formatNumber(profile.holdersCount || 0)}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 p-3 rounded-lg bg-gray-800/30">
          <Users className="w-4 h-4 text-purple-400" />
          <div>
            <p className="text-xs text-gray-400">Followers</p>
            <p className="text-sm font-semibold text-white">
              {formatNumber(profile.followersCount || 0)}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 p-3 rounded-lg bg-gray-800/30">
          <MessageSquare className="w-4 h-4 text-orange-400" />
          <div>
            <p className="text-xs text-gray-400">Posts</p>
            <p className="text-sm font-semibold text-white">
              {formatNumber(profile.postsCount || 0)}
            </p>
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="flex justify-between items-center text-xs text-gray-500">
        <span>Network: {profile.network || "Unknown"}</span>
        {profile.volume24h && (
          <span className="flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            24h Vol: ${formatNumber(profile.volume24h)}
          </span>
        )}
      </div>
    </motion.div>
  );
}
