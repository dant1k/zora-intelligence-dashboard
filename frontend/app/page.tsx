"use client";
import { useEffect, useState } from "react";
import ZoraVerseTable from "./components/ZoraVerseTable";
import Loader from "./components/Loader";

export default function Home() {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfiles = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("http://localhost:8000/profiles");
      const data = await response.json();
      
      if (data.profiles) {
        setProfiles(data.profiles);
      } else {
        setError("No profiles data received");
      }
    } catch (err) {
      setError("Failed to fetch profiles");
      console.error("Error fetching profiles:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
    const interval = setInterval(fetchProfiles, 60000); // обновление каждые 60 сек
    return () => clearInterval(interval);
  }, []);

  const handleFilterChange = (filters: any) => {
    // This will be handled by the ZoraVerseTable component
    console.log("Filters changed:", filters);
  };

  if (loading) return <Loader />;

  if (error) {
    return (
      <div style={{ 
        minHeight: "100vh", 
        backgroundColor: "#0A0B0F", 
        color: "white", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center" 
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ color: "#ef4444", fontSize: "20px", marginBottom: "16px" }}>
            ⚠️ Error Loading Data
          </div>
          <p style={{ color: "#A3A3A3", marginBottom: "16px" }}>{error}</p>
          <button 
            onClick={fetchProfiles}
            style={{
              backgroundColor: "#7C3AED",
              color: "white",
              padding: "12px 24px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "600"
            }}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#0A0B0F", minHeight: "100vh", color: "white", padding: "24px" }}>
      {/* Navigation */}
      <div style={{ marginBottom: "32px", textAlign: "center" }}>
        <h1 style={{ fontSize: "32px", fontWeight: "600", margin: 0, marginBottom: "8px" }}>
          <span style={{ color: "#7C3AED" }}>Zora</span> Intelligence Dashboard
        </h1>
        <p style={{ color: "#A3A3A3", margin: 0, marginBottom: "24px" }}>
          Choose your preferred interface
        </p>
        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          <a
            href="/"
            style={{
              padding: "12px 24px",
              backgroundColor: "#7C3AED",
              color: "white",
              textDecoration: "none",
              borderRadius: "8px",
              fontWeight: "600",
              transition: "all 0.2s"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#6d28d9";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#7C3AED";
            }}
          >
            📊 Table View (Current)
          </a>
          <a
            href="/zoraverse"
            style={{
              padding: "12px 24px",
              backgroundColor: "#1E1F25",
              color: "#A3A3A3",
              textDecoration: "none",
              borderRadius: "8px",
              fontWeight: "600",
              border: "1px solid #2A2B31",
              transition: "all 0.2s"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#2A2B31";
              e.currentTarget.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#1E1F25";
              e.currentTarget.style.color = "#A3A3A3";
            }}
          >
            🎯 ZoraVerse Dashboard
          </a>
        </div>
      </div>

      <ZoraVerseTable 
        profiles={profiles} 
        onFilterChange={handleFilterChange}
      />
    </div>
  );
}
