/* eslint-disable react/prop-types */
import { useDate } from "../../context/DateContext";
import IngredientsLogItem from "./IngredientsLogItem";
import useFilteredAndSortedLogs from "./useFilteredAndSortedLogs";

function IngredientsLogList({ progressData }) {
  const { selectedDate } = useDate();
  const sortedFoodLog = useFilteredAndSortedLogs(progressData, selectedDate);
  return (
    <div className="w-full px-2 mx-auto bg-white rounded-lg max-w-8xl">
      <ul className="space-y-4">
        {sortedFoodLog.map((progress, index) => (
          <IngredientsLogItem key={index} progress={progress} />
        ))}
      </ul>
    </div>
  );
}

export default IngredientsLogList;
