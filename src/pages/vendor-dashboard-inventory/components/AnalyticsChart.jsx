import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const AnalyticsChart = ({ data, type = 'line', title, color = '#1E40AF' }) => {
  const formatTooltipValue = (value, name) => {
    if (name === 'revenue') {
      return [`$${value?.toLocaleString()}`, 'Revenue'];
    }
    if (name === 'orders') {
      return [value, 'Orders'];
    }
    return [value, name];
  };

  const formatYAxisTick = (value) => {
    if (value >= 1000) {
      return `$${(value / 1000)?.toFixed(0)}k`;
    }
    return `$${value}`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
      <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          {type === 'line' ? (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="name" 
                stroke="#6B7280"
                fontSize={12}
              />
              <YAxis 
                stroke="#6B7280"
                fontSize={12}
                tickFormatter={formatYAxisTick}
              />
              <Tooltip 
                formatter={formatTooltipValue}
                labelStyle={{ color: '#111827' }}
                contentStyle={{ 
                  backgroundColor: '#FFFFFF', 
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke={color} 
                strokeWidth={2}
                dot={{ fill: color, strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: color, strokeWidth: 2 }}
              />
            </LineChart>
          ) : (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="name" 
                stroke="#6B7280"
                fontSize={12}
              />
              <YAxis 
                stroke="#6B7280"
                fontSize={12}
                tickFormatter={formatYAxisTick}
              />
              <Tooltip 
                formatter={formatTooltipValue}
                labelStyle={{ color: '#111827' }}
                contentStyle={{ 
                  backgroundColor: '#FFFFFF', 
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px'
                }}
              />
              <Bar 
                dataKey="value" 
                fill={color}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticsChart;