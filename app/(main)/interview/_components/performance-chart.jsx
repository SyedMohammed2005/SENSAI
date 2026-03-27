"use client";

// Import chart components from recharts
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Import UI Card components
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Import React hooks
import { useEffect, useState } from "react";

// Import date formatting function
import { format } from "date-fns";


// Performance chart component
export default function PerformanceChart({ assessments }) {

  // State to store formatted chart data
  const [chartData, setChartData] = useState([]);

  // When assessments change, format data for chart
  useEffect(() => {
    if (assessments) {

      // Convert assessments into chart-friendly format
      const formattedData = assessments.map((assessment) => ({
        // Format date (e.g., Feb 20)
        date: format(new Date(assessment.createdAt), "MMM dd"),

        // Use quiz score as chart value
        score: assessment.quizScore,
      }));

      setChartData(formattedData);
    }
  }, [assessments]);

  return (

    // Card wrapper with hover effect
    <Card className="cursor-pointer hover:bg-muted/50 transition-colors">

      {/* Card header */}
      <CardHeader>
        <CardTitle className="gradient-title text-3xl md:text-4xl">
          Performance Trend
        </CardTitle>
        <CardDescription>
          Your quiz scores over time
        </CardDescription>
      </CardHeader>

      {/* Chart content */}
      <CardContent>
        <div className="h-[300px]">

          {/* Responsive container for mobile support */}
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>

              {/* Background grid */}
              <CartesianGrid strokeDasharray="3 3" />

              {/* X-axis shows date */}
              <XAxis dataKey="date" />

              {/* Y-axis from 0 to 100 (percentage score) */}
              <YAxis domain={[0, 100]} />

              {/* Custom tooltip */}
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload?.length) {
                    return (
                      <div className="bg-background border rounded-lg p-2 shadow-md">
                        <p className="text-sm font-medium">
                          Score: {payload[0].value}%
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {payload[0].payload.date}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />

              {/* Line showing performance trend */}
              <Line
                type="monotone"
                dataKey="score"
                stroke="#9ca3af"
                strokeWidth={2}
              />

            </LineChart>
          </ResponsiveContainer>

        </div>
      </CardContent>
    </Card>
  );
}