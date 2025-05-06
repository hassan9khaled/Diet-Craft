/* eslint-disable react/prop-types */
import { useContext, useEffect, useState, createContext } from "react";

const IngredientsContext = createContext();

function IngredientsProvider({ children }) {
  const [searchItem, setSearchItem] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    async function fetchIngredients() {
      try {
        setIsLoading(true);
        const res = await fetch(
          `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=7OzdgD1h7fyklruZGsBB77TgSAEIb9KugGQizT4e&query=${searchItem}&dataType=Foundation,Branded`,
          { signal: controller.signal }
        );

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        setData(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching ingredients: ", error);
          setData(null);
        }
      } finally {
        setIsLoading(false);
      }
    }
    if (searchItem.length < 3) {
      return;
    }

    fetchIngredients();
    return () => controller.abort();
  }, [searchItem]);

  return (
    <IngredientsContext.Provider
      value={{ data, isLoading, searchItem, setSearchItem }}
    >
      {children}
    </IngredientsContext.Provider>
  );
}

function useIngredients() {
  const context = useContext(IngredientsContext);
  if (context === undefined) {
    throw new Error(
      "useIngredients must be used within a IngredientsProvider. Wrap your component with IngredientsProvider."
    );
  }
  return context;
}

export { IngredientsProvider, useIngredients };
