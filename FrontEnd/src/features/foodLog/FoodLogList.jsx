/* eslint-disable react/prop-types */
import { useDate } from "../../context/DateContext";
import FoodLogItem from "./FoodLogItem";
import useFilteredAndSortedLogs from "./useFilteredAndSortedLogs";

function FoodLogList({ foodLog }) {
  const { selectedDate } = useDate();
  const sortedFoodLog = useFilteredAndSortedLogs(foodLog, selectedDate);
  // Render the list of food logs
  return (
    <section className="w-full px-2 mx-auto bg-white rounded-lg max-w-8xl">
      <ul className="space-y-4" role="list">
        {sortedFoodLog.map((log) => (
          <li key={log.id}>
            <FoodLogItem log={log} />
          </li>
        ))}
      </ul>
    </section>
  );
}
export default FoodLogList;
