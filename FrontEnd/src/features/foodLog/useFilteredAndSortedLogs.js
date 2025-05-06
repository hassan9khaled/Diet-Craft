import { useMemo } from "react";
import formatDateToYYYYMMDD from "../../ui/DateFormat"; // Adjust path as needed

const isValidDate = (dateString) => {
  const regex = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD format
  return regex.test(dateString);
};

const useFilteredAndSortedLogs = (logs, selectedDate) => {
  // Filter data by the selected day
  const filteredLogs = useMemo(() => {
    if (!selectedDate || !isValidDate(selectedDate)) {
      return logs;
    }
    return logs.filter(
      (log) => formatDateToYYYYMMDD(log.created_at) === selectedDate
    );
  }, [logs, selectedDate]);

  // Sort filtered logs by time
  const sortedLogs = useMemo(() => {
    return [...filteredLogs].sort((a, b) => {
      const timeA = new Date(a.time).getTime();
      const timeB = new Date(b.time).getTime();
      return timeA - timeB;
    });
  }, [filteredLogs]);

  return sortedLogs;
};

export default useFilteredAndSortedLogs;
