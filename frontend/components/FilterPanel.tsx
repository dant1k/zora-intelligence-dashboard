import { FilterOptions } from '@/types'
import { Search, Filter, ArrowUpDown } from 'lucide-react'
import { useState } from 'react'

interface FilterPanelProps {
  filters: FilterOptions
  onFilterChange: (filters: Partial<FilterOptions>) => void
}

export function FilterPanel({ filters, onFilterChange }: FilterPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleInputChange = (field: keyof FilterOptions, value: string | number) => {
    onFilterChange({ [field]: value })
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold flex items-center space-x-2">
          <Filter className="h-5 w-5" />
          <span>Filters & Search</span>
        </h2>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 hover:bg-accent rounded-lg transition-colors"
        >
          <ArrowUpDown className="h-4 w-4" />
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search profiles by name or ticker..."
          value={filters.search}
          onChange={(e) => handleInputChange('search', e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
        />
      </div>

      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Market Cap Range */}
          <div>
            <label className="block text-sm font-medium mb-2">Min Market Cap</label>
            <input
              type="number"
              value={filters.minMarketCap}
              onChange={(e) => handleInputChange('minMarketCap', parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="10000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Max Market Cap</label>
            <input
              type="number"
              value={filters.maxMarketCap}
              onChange={(e) => handleInputChange('maxMarketCap', parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="10000000"
            />
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-sm font-medium mb-2">Sort By</label>
            <select
              value={filters.sortBy}
              onChange={(e) => handleInputChange('sortBy', e.target.value as FilterOptions['sortBy'])}
              className="w-full px-3 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="marketCap">Market Cap</option>
              <option value="postsCount">Posts Count</option>
              <option value="followersCount">Followers Count</option>
              <option value="holdersCount">Holders Count</option>
            </select>
          </div>

          {/* Sort Order */}
          <div>
            <label className="block text-sm font-medium mb-2">Sort Order</label>
            <select
              value={filters.sortOrder}
              onChange={(e) => handleInputChange('sortOrder', e.target.value as FilterOptions['sortOrder'])}
              className="w-full px-3 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
          </div>
        </div>
      )}

      {/* Quick Filters */}
      <div className="flex flex-wrap gap-2 mt-4">
        <button
          onClick={() => onFilterChange({ minMarketCap: 10000, maxMarketCap: 100000, sortBy: 'marketCap', sortOrder: 'desc' })}
          className="px-3 py-1 text-xs bg-secondary text-secondary-foreground rounded-full hover:bg-secondary/80 transition-colors"
        >
          Small Cap (10K-100K)
        </button>
        <button
          onClick={() => onFilterChange({ minMarketCap: 100000, maxMarketCap: 1000000, sortBy: 'marketCap', sortOrder: 'desc' })}
          className="px-3 py-1 text-xs bg-secondary text-secondary-foreground rounded-full hover:bg-secondary/80 transition-colors"
        >
          Mid Cap (100K-1M)
        </button>
        <button
          onClick={() => onFilterChange({ minMarketCap: 1000000, maxMarketCap: 10000000, sortBy: 'marketCap', sortOrder: 'desc' })}
          className="px-3 py-1 text-xs bg-secondary text-secondary-foreground rounded-full hover:bg-secondary/80 transition-colors"
        >
          Large Cap (1M-10M)
        </button>
        <button
          onClick={() => onFilterChange({ sortBy: 'followersCount', sortOrder: 'desc' })}
          className="px-3 py-1 text-xs bg-secondary text-secondary-foreground rounded-full hover:bg-secondary/80 transition-colors"
        >
          Most Followers
        </button>
        <button
          onClick={() => onFilterChange({ sortBy: 'postsCount', sortOrder: 'desc' })}
          className="px-3 py-1 text-xs bg-secondary text-secondary-foreground rounded-full hover:bg-secondary/80 transition-colors"
        >
          Most Active
        </button>
      </div>
    </div>
  )
}
