"use client";
import { useEffect, useState } from "react";
import FiltersPanel from "./components/FiltersPanel";

export default function Home() {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<any>({ minCap: 10000, maxCap: 10000000, sortBy: "marketCap" });

  const fetchProfiles = () => {
    setLoading(true);
    fetch("http://localhost:8000/profiles")
      .then((res) => res.json())
      .then((data) => {
        let list = data.profiles || [];

        // фильтрация по Market Cap
        list = list.filter(
          (p: any) =>
            (!p.marketCap || (p.marketCap >= filters.minCap && p.marketCap <= filters.maxCap))
        );

        // сортировка
        list.sort((a: any, b: any) => (b[filters.sortBy] || 0) - (a[filters.sortBy] || 0));

        setProfiles(list);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchProfiles();
  }, [filters]);

  if (loading) return <div style={{ color: '#999', padding: '40px', textAlign: 'center' }}>Loading profiles...</div>;

  return (
    <main style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Zora Intelligence Dashboard</h1>
      <FiltersPanel onFilterChange={setFilters} />

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '20px' 
      }}>
        {profiles.map((p) => (
          <div key={p.address} style={{
            backgroundColor: '#1a1a1a',
            border: '1px solid #333',
            borderRadius: '12px',
            padding: '20px',
            transition: 'border-color 0.3s'
          }}>
            <h2 style={{ 
              fontSize: '18px', 
              fontWeight: '600', 
              marginBottom: '10px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>{p.name || "Unnamed Profile"}</h2>
            <p style={{ 
              fontSize: '14px', 
              color: '#999', 
              marginBottom: '15px',
              minHeight: '40px'
            }}>{p.description || "No description"}</p>
            <div style={{ fontSize: '14px', marginBottom: '15px' }}>
              <div>🪙 {p.tokenTicker || "—"}</div>
              <div>💰 Market Cap: {p.marketCap ? `$${p.marketCap.toLocaleString()}` : "—"}</div>
              <div>📈 Posts: {p.postsCount || 0}</div>
              <div>🧾 Holders: {p.holdersCount || 0}</div>
              <div>👥 Followers: {p.followersCount || 0}</div>
            </div>
            <div style={{ display: 'flex', gap: '15px', fontSize: '14px' }}>
              {p.twitter && (
                <a href={p.twitter} target="_blank" rel="noreferrer" style={{ color: '#999', textDecoration: 'none' }}>
                  Twitter
                </a>
              )}
              {p.farcaster && (
                <a href={p.farcaster} target="_blank" rel="noreferrer" style={{ color: '#999', textDecoration: 'none' }}>
                  Farcaster
                </a>
              )}
              <a href={p.zoraLink} target="_blank" rel="noreferrer" style={{ color: '#999', textDecoration: 'none' }}>
                Zora
              </a>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
