/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

const DateContext = createContext();

function DateContextProvider({ children }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <DateContext.Provider value={{ setSelectedDate, selectedDate }}>
      {children}
    </DateContext.Provider>
  );
}
function useDate() {
  const context = useContext(DateContext);
  if (!context) throw new Error("useDate must be used within a DateProvider");
  return context;
}

export { DateContextProvider, useDate };
