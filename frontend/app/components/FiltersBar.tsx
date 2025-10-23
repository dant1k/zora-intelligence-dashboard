"use client";
import { useState } from "react";
import { Search, Filter, TrendingUp, Users } from "lucide-react";

interface FiltersBarProps {
  onFilterChange: (filters: any) => void;
}

export default function FiltersBar({ onFilterChange }: FiltersBarProps) {
  const [minCap, setMinCap] = useState(10000);
  const [maxCap, setMaxCap] = useState(10000000);
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("marketCap");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const applyFilters = () => {
    onFilterChange({ 
      minCap, 
      maxCap, 
      query, 
      sortBy, 
      sortOrder 
    });
  };

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
    applyFilters();
  };

  return (
    <div style={{
      backgroundColor: 'rgba(17, 24, 39, 0.5)',
      backdropFilter: 'blur(8px)',
      border: '1px solid #374151',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Search */}
        <div style={{ position: 'relative', flex: 1, maxWidth: '400px', width: '100%' }}>
          <Search style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#9ca3af',
            width: '16px',
            height: '16px'
          }} />
          <input
            style={{
              width: '100%',
              paddingLeft: '40px',
              paddingRight: '16px',
              paddingTop: '12px',
              paddingBottom: '12px',
              borderRadius: '12px',
              backgroundColor: 'rgba(31, 41, 55, 0.5)',
              border: '1px solid #374151',
              color: '#fff',
              fontSize: '14px'
            }}
            placeholder="Search by name or ticker..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', justifyContent: 'center' }}>
          {/* Market Cap Range */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Filter style={{ color: '#9ca3af', width: '16px', height: '16px' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="number"
                style={{
                  width: '96px',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(31, 41, 55, 0.5)',
                  border: '1px solid #374151',
                  color: '#fff',
                  fontSize: '14px'
                }}
                placeholder="Min"
                value={minCap}
                onChange={(e) => setMinCap(Number(e.target.value))}
              />
              <span style={{ color: '#9ca3af' }}>-</span>
              <input
                type="number"
                style={{
                  width: '96px',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(31, 41, 55, 0.5)',
                  border: '1px solid #374151',
                  color: '#fff',
                  fontSize: '14px'
                }}
                placeholder="Max"
                value={maxCap}
                onChange={(e) => setMaxCap(Number(e.target.value))}
              />
            </div>
          </div>

          {/* Sort Options */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => handleSort("marketCap")}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '8px 12px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.2s',
                backgroundColor: sortBy === "marketCap" ? '#4f46e5' : 'rgba(31, 41, 55, 0.5)',
                color: sortBy === "marketCap" ? '#fff' : '#d1d5db',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <TrendingUp style={{ width: '16px', height: '16px' }} />
              Market Cap
              {sortBy === "marketCap" && (
                <span style={{ fontSize: '12px' }}>{sortOrder === "desc" ? "↓" : "↑"}</span>
              )}
            </button>
            
            <button
              onClick={() => handleSort("followersCount")}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '8px 12px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.2s',
                backgroundColor: sortBy === "followersCount" ? '#4f46e5' : 'rgba(31, 41, 55, 0.5)',
                color: sortBy === "followersCount" ? '#fff' : '#d1d5db',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <Users style={{ width: '16px', height: '16px' }} />
              Followers
              {sortBy === "followersCount" && (
                <span style={{ fontSize: '12px' }}>{sortOrder === "desc" ? "↓" : "↑"}</span>
              )}
            </button>
          </div>

          {/* Apply Button */}
          <button
            onClick={applyFilters}
            style={{
              background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
              color: '#fff',
              padding: '12px 24px',
              borderRadius: '12px',
              fontWeight: '600',
              transition: 'all 0.3s',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.background = 'linear-gradient(135deg, #4338ca, #6d28d9)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.background = 'linear-gradient(135deg, #4f46e5, #7c3aed)';
            }}
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
