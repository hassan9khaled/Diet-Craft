import { useState } from "react";
import { useDate } from "../../context/DateContext";
import IngredientsModal from "./IngredientsModal";
import FoodLogList from "./FoodLogList";
import FoodLogForm from "./FoodLogForm";
import useGetProgress from "./useGetProgress";
import useUser from "../auth/useUser";
import Spinner from "../../ui/Spinner";
import IngredientsLogList from "./IngredientsLogList";
import useGetFood from "./useGetFood";
import DatePicker from "../../ui/DatePicker";
import formatDateToYYYYMMDD from "../../ui/DateFormat";

function FoodLogs() {
  const [overlay, setOverlay] = useState(false);
  const { user } = useUser();
  const { progressData, isPending: isProgressPending } = useGetProgress(
    user?.email
  );
  const { foodData, isPending: isFoodPending } = useGetFood(user?.email);
  const { selectedDate } = useDate();

  // Simplify storedDate function for clarity
  const storedDate = (data) => {
    if (typeof selectedDate !== "string") return data;
    return data?.filter(
      (log) => formatDateToYYYYMMDD(log.created_at) === selectedDate
    );
  };

  if (isProgressPending || isFoodPending) return <Spinner />;

  return (
    <div className="flex flex-col gap-6 bg-[#f9fafb]">
      {/* Split Layout for Form and Calendar */}
      <div className="flex flex-col-reverse gap-4 lg:flex-row">
        {/* Food Entry Form */}
        <div className="w-full p-6 bg-white rounded-xl shadow-sm border border-gray-100 lg:w-[70%]">
          <h2 className="mb-4 text-lg font-bold text-gray-800 md:text-xl">
            Add Food Entry
          </h2>
          <FoodLogForm setOverlay={setOverlay} email={user?.email} />
        </div>
        {/* Calendar */}
        <div className="w-full bg-white rounded-xl shadow-sm border border-gray-100 lg:w-[30%]">
          <DatePicker />
        </div>
      </div>

      {/* Overlay for Ingredients */}
      {overlay && <IngredientsModal setOverlay={setOverlay} />}

      <div className="w-full p-4 bg-white rounded-lg shadow-sm">
        {storedDate(foodData).length === 0 &&
        storedDate(progressData).length === 0 ? (
          <div>
            <h2 className="text-lg font-bold text-gray-800 md:text-xl">
              Log your meals and track your progress
            </h2>
            <p className="text-gray-600">
              No food entries or ingredient data found. Start adding your meals!
            </p>
          </div>
        ) : (
          <>
            {/* Render the list of food logs */}
            <FoodLogList foodLog={foodData} />
            {/* Render the list of ingredient logs */}
            <IngredientsLogList progressData={progressData} />
          </>
        )}
      </div>
    </div>
  );
}

export default FoodLogs;
