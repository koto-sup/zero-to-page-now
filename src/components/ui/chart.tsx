
import React from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    fill?: boolean;
    backgroundColor?: string;
    borderColor?: string;
    tension?: number;
  }[];
}

export interface ChartOptions {
  responsive?: boolean;
  plugins?: {
    legend?: {
      display?: boolean;
    };
    tooltip?: {
      mode?: string;
      intersect?: boolean;
    };
  };
  scales?: {
    y?: {
      beginAtZero?: boolean;
      grid?: {
        color?: string;
      };
    };
    x?: {
      grid?: {
        display?: boolean;
      };
    };
  };
}

interface ChartProps {
  type: "line" | "bar";
  data: ChartData;
  options?: ChartOptions;
  className?: string;
}

export function Chart({ type, data, options, className = "" }: ChartProps) {
  // Convert the data format from ChartData to recharts format
  const rechartsData = data.labels.map((label, index) => {
    const dataPoint: Record<string, any> = { name: label };
    
    data.datasets.forEach((dataset) => {
      dataPoint[dataset.label] = dataset.data[index];
    });
    
    return dataPoint;
  });

  return (
    <div className={`w-full ${className}`}>
      <ResponsiveContainer width="100%" height="100%">
        {type === "line" ? (
          <LineChart data={rechartsData}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            {data.datasets.map((dataset, index) => (
              <Line
                key={index}
                type="monotone"
                dataKey={dataset.label}
                stroke={dataset.borderColor || `hsl(${index * 60}, 70%, 50%)`}
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        ) : (
          <BarChart data={rechartsData}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.1} vertical={false} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            {data.datasets.map((dataset, index) => (
              <Bar
                key={index}
                dataKey={dataset.label}
                fill={dataset.backgroundColor || `hsl(${index * 60}, 70%, 50%)`}
                radius={[4, 4, 0, 0]}
              />
            ))}
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
