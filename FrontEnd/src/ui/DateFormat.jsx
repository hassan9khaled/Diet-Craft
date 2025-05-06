import { format, parseISO, parse, isValid } from "date-fns";

/**
 * Converts a date (either a Date object or a date string) to the format YYYY-MM-DD.
 * @param {Date|string} date - The date to convert (can be a Date object or a date string).
 * @returns {string} - The formatted date in YYYY-MM-DD format.
 */
function formatDateToYYYYMMDD(date) {
  let dateObj;

  if (date instanceof Date) {
    // If the input is already a Date object, use it directly
    dateObj = date;
  } else if (typeof date === "string") {
    // If the input is a string, parse it
    try {
      // Try parsing as ISO 8601 first
      dateObj = parseISO(date);
      if (!isValid(dateObj)) {
        // If ISO parsing fails, try parsing with the custom format
        dateObj = parse(
          date,
          "EEE MMM dd yyyy HH:mm:ss 'GMT'xx (zzzz)",
          new Date()
        );
      }
    } catch (error) {
      console.error("Error parsing date:", error.message);
      return "Invalid date"; // Return a fallback value
    }
  } else {
    console.error("Invalid date input:", date);
    return "Invalid date"; // Return a fallback value
  }

  // Format the date as YYYY-MM-DD
  return format(dateObj, "yyyy-MM-dd");
}

export default formatDateToYYYYMMDD;
