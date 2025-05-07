import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar
} from "recharts";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { MdOutlineLocalFireDepartment } from "react-icons/md";
import { IoBarbellOutline } from "react-icons/io5";
import { LiaCookieSolid } from "react-icons/lia";

import useGetFakeData from "../features/Progress/useGetFakeData";
import AverageCard from "../ui/AverageCard";
import FilterCharts from "../ui/FilterCharts";
import CaloriesByMealChart from "../ui/CaloriesByMealChart";
import DropdownMenu from "../ui/DropdownMenu";

function Progress() {
  function getMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber - 1);
    return date.toLocaleString("en-US", { month: "long" });
  }

  function AverageValues(value) {
    const totalValues = fakeData?.map((log) => log[value]);
    const averageValues =
      totalValues?.reduce((acc, current) => acc + current, 0) /
      totalValues?.length;
    return averageValues.toFixed(2);
  }

  const filterList = ["overview", "calories", "macronutrients", "meals"];
  const [searchParams, setSearchParams] = useSearchParams();
  const { fakeData, isPending } = useGetFakeData();
  const [darkMode, setDarkMode] = useState(false);
  const filterData = searchParams.get("filterBy") || "overview";

  useEffect(() => {
    setSearchParams({ filterBy: filterData });
  }, [filterData, setSearchParams]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const dateAndCalories = fakeData?.reduce((acc, log) => {
    const monthName = getMonthName(log.month);
    const existingMonth = acc.find((item) => item.month === monthName);

    if (existingMonth) {
      existingMonth.calories += log.calories; // Sum calories
      // OR: Average (if preferred)
      // existingMonth.calories = (existingMonth.calories + log.calories) / 2;
    } else {
      acc.push({ month: monthName, calories: log.calories });
    }
    return acc;
  }, []);

  const MealAndCalories = fakeData?.map((log) => ({
    meal: log.meal?.split(" ")[0],
    calories: log.calories
  }));

  const mealsData = [
    { day: "Mon", value: 2 },
    { day: "Tue", value: 2.5 },
    { day: "Wed", value: 3 },
    { day: "Thu", value: 2 },
    { day: "Fri", value: 2.8 },
    { day: "Sat", value: 3.5 },
    { day: "Sun", value: 2.2 }
  ];

  const chartsConfig = [
    {
      id: "1",
      category: "calories",
      title: "Calories Intake",
      component: (
        <LineChart data={dateAndCalories}>
          <XAxis dataKey="month" stroke={`${darkMode ? "white" : "black"}`} />
          <YAxis stroke={`${darkMode ? "white" : "black"}`} />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="calories"
            stroke="#3B82F6"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      )
    },
    {
      id: "2",
      category: "calories",
      title: "Calories by Meal",
      component: <CaloriesByMealChart data={MealAndCalories} variant="simple" />
    },
    {
      id: "3",
      category: "meals",
      title: "Meal Intake",
      component: (
        <BarChart data={mealsData}>
          <XAxis dataKey="day" stroke={`${darkMode ? "white" : "black"}`} />
          <YAxis stroke={`${darkMode ? "white" : "black"}`} />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#10B981" />
        </BarChart>
      )
    }
  ];

  return (
    <div className="p-4 transition-all duration-300 rounded-lg md:p-7 dark:bg-gray-900 dark:text-white">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 md:text-3xl dark:text-white">
          DietCraft Progress
        </h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 text-sm transition-all bg-gray-200 rounded-lg dark:bg-gray-700 dark:text-white"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      {/* Average Cards */}
      <div className="grid grid-cols-1 gap-4 py-5 md:grid-cols-2 lg:grid-cols-4">
        <AverageCard
          AverageName="Average Calories"
          AverageNumber={`${AverageValues("calories")} kcal`}
          isPending={isPending}
          icon={<MdOutlineLocalFireDepartment size={20} />}
        />
        <AverageCard
          AverageName="Average Protein"
          AverageNumber={`${AverageValues("protein")} g`}
          isPending={isPending}
          icon={<IoBarbellOutline size={20} />}
        />
        <AverageCard
          AverageName="Average Carbs"
          AverageNumber={`${AverageValues("carbohydrates")} g`}
          isPending={isPending}
          icon={<LiaCookieSolid size={20} />}
        />
        <AverageCard
          AverageName="Average Fat"
          AverageNumber={`${AverageValues("fat")} g`}
          isPending={isPending}
          icon={<MdOutlineLocalFireDepartment size={20} />}
        />
      </div>

      {/* Filter List */}
      <div className="pb-5">
        <ul className="hidden md:flex flex-wrap bg-[#f5f5f5] dark:bg-gray-800 gap-5 rounded-lg w-fit max-md:justify-between max-md:w-full p-1 text-gray-500 dark:text-gray-300">
          {filterList.map((item, index) => {
            const isActive = item === filterData;
            return (
              <li
                key={index}
                onClick={() => setSearchParams({ filterBy: item })}
                className={`px-4 py-2 cursor-pointer rounded-lg text-sm ${
                  isActive
                    ? "text-black bg-white dark:bg-gray-600 dark:text-white"
                    : "text-[#4b5563] dark:text-gray-400"
                }`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </li>
            );
          })}
        </ul>
        <DropdownMenu
          filterData={filterData}
          filterList={filterList}
          setSearchParams={setSearchParams}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {chartsConfig.map(
          ({ id, title, category, component }) =>
            (filterData === category || filterData === "overview") && (
              <FilterCharts key={id} title={title}>
                {component}
              </FilterCharts>
            )
        )}
      </div>
    </div>
  );
}

export default Progress;
