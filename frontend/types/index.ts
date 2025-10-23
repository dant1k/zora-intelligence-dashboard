export interface Profile {
  address: string
  name: string
  description: string
  tokenTicker: string
  marketCap: number
  holdersCount: number
  postsCount: number
  followersCount: number
  followingCount: number
  twitter?: string
  farcaster?: string
  zoraLink: string
  avatar?: string
  createdAt?: string
}

export interface FilterOptions {
  page: number
  limit: number
  minMarketCap: number
  maxMarketCap: number
  sortBy: 'marketCap' | 'postsCount' | 'followersCount' | 'holdersCount'
  sortOrder: 'asc' | 'desc'
  search: string
}

export interface ProfileDetails extends Profile {
  banner?: string
  price: number
  totalSupply: number
  topHolders: Array<{
    address: string
    balance: number
    percentage: number
  }>
  recentPosts: Array<{
    id: string
    content: string
    created_at: string
    type: string
  }>
  socialMetrics: {
    zora: {
      followers: number
      following: number
      followersList: any[]
      followingList: any[]
    }
    twitter?: string
    farcaster?: string
  }
  updatedAt?: string
}
