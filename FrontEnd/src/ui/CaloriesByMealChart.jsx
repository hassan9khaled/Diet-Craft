/* eslint-disable react/prop-types */
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

function CaloriesByMealChart({ data, variant = "simple" }) {
  const mealGroups = data?.reduce((acc, item) => {
    const meal = item.meal?.split(" ")[0];
    if (!acc[meal]) {
      acc[meal] = { name: meal, value: 0, count: 0 };
    }
    acc[meal].value += item.calories;
    acc[meal].count += 1;
    return acc;
  }, {});

  const chartData = Object.values(mealGroups || []).map((group) =>
    variant === "detailed"
      ? {
          name: group.name,
          value: Math.round(group.value / group.count),
          total: group.value,
          count: group.count
        }
      : { name: group.name, value: group.value }
  );

  const COLORS = {
    Breakfast: "#4f46e5",
    Lunch: "#0ea5e9",
    Dinner: "#f59e0b",
    Snack: "#10b981",
    Other: "#6b7280"
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          innerRadius={variant === "detailed" ? 60 : 50}
          outerRadius={variant === "detailed" ? 80 : 70}
          paddingAngle={4}
          dataKey="value"
          nameKey="name"
          label={({ name, percent }) =>
            `${name} ${(percent * 100).toFixed(2)}%`
          }
          labelLine={false}
        >
          {chartData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[entry.name] || COLORS.Other}
            />
          ))}
        </Pie>
        <Tooltip formatter={(value, name) => [`${value.toFixed(2)}`, name]} />
      </PieChart>
    </ResponsiveContainer>
  );
}
export default CaloriesByMealChart;
