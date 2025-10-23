"use client";
import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { TrendingUp, Users } from "lucide-react";

interface DynamicsChartProps {
  data: any[];
}

export default function DynamicsChart({ data }: DynamicsChartProps) {
  if (!data || data.length === 0) return null;

  // Подготавливаем данные для графика
  const chartData = data
    .filter(p => p.marketCap && p.holdersCount)
    .slice(0, 10) // Берем топ-10 для читаемости
    .map((profile, index) => ({
      name: profile.tokenTicker || profile.name?.slice(0, 8) || `Token ${index + 1}`,
      marketCap: profile.marketCap,
      holdersCount: profile.holdersCount,
      fullName: profile.name
    }));

  if (chartData.length === 0) return null;

  const formatValue = (value: number) => {
    if (value >= 1000000) {
      return (value / 1000000).toFixed(1) + 'M';
    } else if (value >= 1000) {
      return (value / 1000).toFixed(1) + 'K';
    }
    return value.toString();
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div style={{
          backgroundColor: 'rgba(17, 24, 39, 0.95)',
          backdropFilter: 'blur(8px)',
          border: '1px solid #374151',
          borderRadius: '8px',
          padding: '12px',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
        }}>
          <p style={{ color: '#fff', fontWeight: '600', marginBottom: '8px' }}>{data.fullName}</p>
          <p style={{ color: '#6366f1', fontSize: '14px', marginBottom: '4px' }}>
            Market Cap: ${formatValue(data.marketCap)}
          </p>
          <p style={{ color: '#10b981', fontSize: '14px' }}>
            Holders: {formatValue(data.holdersCount)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.5), rgba(31, 41, 55, 0.3))',
      backdropFilter: 'blur(8px)',
      border: '1px solid #374151',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      marginTop: '24px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
        <div style={{ padding: '8px', backgroundColor: 'rgba(99, 102, 241, 0.2)', borderRadius: '8px' }}>
          <TrendingUp style={{ width: '24px', height: '24px', color: '#6366f1' }} />
        </div>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', margin: 0 }}>
            Market Cap / Holders Dynamics
          </h2>
          <p style={{ color: '#9ca3af', fontSize: '14px', margin: 0 }}>
            Correlation between market capitalization and holder count
          </p>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <XAxis 
            dataKey="name" 
            tick={{ fill: '#9ca3af', fontSize: 12 }}
            axisLine={{ stroke: '#374151' }}
            tickLine={{ stroke: '#374151' }}
          />
          <YAxis 
            tick={{ fill: '#9ca3af', fontSize: 12 }}
            axisLine={{ stroke: '#374151' }}
            tickLine={{ stroke: '#374151' }}
            tickFormatter={formatValue}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ color: '#d1d5db', fontSize: '14px' }}
          />
          <Line 
            type="monotone" 
            dataKey="marketCap" 
            stroke="#6366f1" 
            strokeWidth={3}
            dot={{ fill: '#6366f1', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#6366f1', strokeWidth: 2 }}
            name="Market Cap ($)"
          />
          <Line 
            type="monotone" 
            dataKey="holdersCount" 
            stroke="#10b981" 
            strokeWidth={3}
            dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2 }}
            name="Holders Count"
          />
        </LineChart>
      </ResponsiveContainer>
      
      {/* Legend */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '24px', 
        marginTop: '16px',
        fontSize: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '12px', height: '3px', backgroundColor: '#6366f1', borderRadius: '2px' }} />
          <span style={{ color: '#9ca3af' }}>Market Cap</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '12px', height: '3px', backgroundColor: '#10b981', borderRadius: '2px' }} />
          <span style={{ color: '#9ca3af' }}>Holders</span>
        </div>
      </div>
    </div>
  );
}

