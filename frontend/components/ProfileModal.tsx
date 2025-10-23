import { Profile } from '@/types'
import { 
  X, 
  ExternalLink, 
  Twitter, 
  Zap, 
  Users, 
  MessageSquare, 
  TrendingUp,
  Copy,
  Check
} from 'lucide-react'
import { useState } from 'react'

interface ProfileModalProps {
  profile: Profile
  onClose: () => void
}

export function ProfileModal({ profile, onClose }: ProfileModalProps) {
  const [copied, setCopied] = useState(false)

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

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-card border border-border rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center">
              {profile.avatar ? (
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
              ) : (
                <span className="text-primary-foreground font-bold text-2xl">
                  {profile.name.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold">{profile.name}</h2>
              <p className="text-muted-foreground">{profile.tokenTicker}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Description */}
          {profile.description && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground">{profile.description}</p>
            </div>
          )}

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-secondary/50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium">Market Cap</span>
              </div>
              <p className="text-xl font-bold">{formatMarketCap(profile.marketCap)}</p>
            </div>

            <div className="bg-secondary/50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Users className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium">Holders</span>
              </div>
              <p className="text-xl font-bold">{formatNumber(profile.holdersCount)}</p>
            </div>

            <div className="bg-secondary/50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <MessageSquare className="h-4 w-4 text-purple-500" />
                <span className="text-sm font-medium">Posts</span>
              </div>
              <p className="text-xl font-bold">{formatNumber(profile.postsCount)}</p>
            </div>

            <div className="bg-secondary/50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Zap className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-medium">Followers</span>
              </div>
              <p className="text-xl font-bold">{formatNumber(profile.followersCount)}</p>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Social Links</h3>
            <div className="flex flex-wrap gap-4">
              <a
                href={profile.zoraLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Zap className="h-4 w-4" />
                <span>Zora Profile</span>
                <ExternalLink className="h-3 w-3" />
              </a>

              {profile.twitter && (
                <a
                  href={`https://twitter.com/${profile.twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <Twitter className="h-4 w-4" />
                  <span>@{profile.twitter}</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}

              {profile.farcaster && (
                <a
                  href={`https://warpcast.com/${profile.farcaster}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                >
                  <Zap className="h-4 w-4" />
                  <span>@{profile.farcaster}</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          </div>

          {/* Address */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Address</h3>
            <div className="flex items-center space-x-2 p-3 bg-secondary/50 rounded-lg">
              <code className="text-sm font-mono flex-1">{profile.address}</code>
              <button
                onClick={() => copyToClipboard(profile.address)}
                className="p-2 hover:bg-accent rounded-lg transition-colors"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Created Date */}
          {profile.createdAt && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Created</h3>
              <p className="text-muted-foreground">
                {new Date(profile.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end p-6 border-t border-border">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
