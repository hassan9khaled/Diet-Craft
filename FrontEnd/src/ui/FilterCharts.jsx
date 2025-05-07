/* eslint-disable react/prop-types */
import { ResponsiveContainer } from "recharts";

function FilterCharts({ children, title }) {
  return (
    <div className="p-6 border rounded-lg shadow-sm">
      <h2 className="mb-4 text-xl font-semibold text-gray-700 dark:text-white">
        {title}
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        {children}
      </ResponsiveContainer>
    </div>
  );
}

export default FilterCharts;
