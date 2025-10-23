import { Profile } from '@/types'
import { 
  Users, 
  MessageSquare, 
  TrendingUp, 
  ExternalLink,
  Twitter,
  Zap
} from 'lucide-react'
import { clsx } from 'clsx'

interface ProfileCardProps {
  profile: Profile
  onClick: () => void
}

export function ProfileCard({ profile, onClick }: ProfileCardProps) {
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  const formatMarketCap = (marketCap: number): string => {
    if (marketCap >= 1000000) {
      return `$${(marketCap / 1000000).toFixed(1)}M`
    }
    if (marketCap >= 1000) {
      return `$${(marketCap / 1000).toFixed(1)}K`
    }
    return `$${marketCap.toFixed(0)}`
  }

  return (
    <div
      onClick={onClick}
      className="group cursor-pointer bg-card border border-border rounded-lg p-6 hover:shadow-lg hover:border-primary/50 transition-all duration-300 card-hover"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center">
            {profile.avatar ? (
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <span className="text-primary-foreground font-bold text-lg">
                {profile.name.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <div>
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
              {profile.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {profile.tokenTicker}
            </p>
          </div>
        </div>
        <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
      </div>

      {/* Description */}
      {profile.description && (
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {profile.description}
        </p>
      )}

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <TrendingUp className="h-4 w-4 text-green-500" />
          <div>
            <p className="text-xs text-muted-foreground">Market Cap</p>
            <p className="text-sm font-medium">
              {formatMarketCap(profile.marketCap)}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Users className="h-4 w-4 text-blue-500" />
          <div>
            <p className="text-xs text-muted-foreground">Holders</p>
            <p className="text-sm font-medium">
              {formatNumber(profile.holdersCount)}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <MessageSquare className="h-4 w-4 text-purple-500" />
          <div>
            <p className="text-xs text-muted-foreground">Posts</p>
            <p className="text-sm font-medium">
              {formatNumber(profile.postsCount)}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Zap className="h-4 w-4 text-yellow-500" />
          <div>
            <p className="text-xs text-muted-foreground">Followers</p>
            <p className="text-sm font-medium">
              {formatNumber(profile.followersCount)}
            </p>
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center space-x-3">
          {profile.twitter && (
            <a
              href={`https://twitter.com/${profile.twitter}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center space-x-1 text-xs text-muted-foreground hover:text-blue-500 transition-colors"
            >
              <Twitter className="h-3 w-3" />
              <span>@{profile.twitter}</span>
            </a>
          )}
          {profile.farcaster && (
            <a
              href={`https://warpcast.com/${profile.farcaster}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center space-x-1 text-xs text-muted-foreground hover:text-purple-500 transition-colors"
            >
              <Zap className="h-3 w-3" />
              <span>@{profile.farcaster}</span>
            </a>
          )}
        </div>
        
        <div className="text-xs text-muted-foreground">
          {profile.address.slice(0, 6)}...{profile.address.slice(-4)}
        </div>
      </div>
    </div>
  )
}
