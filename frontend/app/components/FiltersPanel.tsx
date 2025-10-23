"use client";
import { useState } from "react";

type FiltersProps = {
  onFilterChange: (filters: any) => void;
};

export default function FiltersPanel({ onFilterChange }: FiltersProps) {
  const [minCap, setMinCap] = useState(10000);
  const [maxCap, setMaxCap] = useState(10000000);
  const [sortBy, setSortBy] = useState("marketCap");

  const applyFilters = () => {
    onFilterChange({ minCap, maxCap, sortBy });
  };

  return (
    <div style={{
      backgroundColor: '#1a1a1a',
      border: '1px solid #333',
      borderRadius: '12px',
      padding: '20px',
      marginBottom: '20px',
      display: 'flex',
      flexWrap: 'wrap',
      gap: '20px',
      alignItems: 'center'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label style={{ fontSize: '12px', color: '#999', marginBottom: '5px' }}>Min Market Cap ($)</label>
        <input
          type="number"
          value={minCap}
          onChange={(e) => setMinCap(Number(e.target.value))}
          style={{
            backgroundColor: '#333',
            border: 'none',
            borderRadius: '4px',
            padding: '8px 12px',
            color: '#fff',
            width: '120px'
          }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label style={{ fontSize: '12px', color: '#999', marginBottom: '5px' }}>Max Market Cap ($)</label>
        <input
          type="number"
          value={maxCap}
          onChange={(e) => setMaxCap(Number(e.target.value))}
          style={{
            backgroundColor: '#333',
            border: 'none',
            borderRadius: '4px',
            padding: '8px 12px',
            color: '#fff',
            width: '120px'
          }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label style={{ fontSize: '12px', color: '#999', marginBottom: '5px' }}>Sort By</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{
            backgroundColor: '#333',
            border: 'none',
            borderRadius: '4px',
            padding: '8px 12px',
            color: '#fff',
            width: '120px'
          }}
        >
          <option value="marketCap">Market Cap</option>
          <option value="followersCount">Followers</option>
          <option value="holdersCount">Holders</option>
          <option value="postsCount">Posts</option>
        </select>
      </div>

      <button 
        onClick={applyFilters} 
        style={{
          backgroundColor: '#666',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          padding: '10px 20px',
          cursor: 'pointer'
        }}
      >
        Apply
      </button>
    </div>
  );
}
