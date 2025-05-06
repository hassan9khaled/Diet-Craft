import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addMeal } from "../../services/apiProgress";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";

function useAddMeal() {
  const queryClient = useQueryClient();
  const location = useLocation();
  const { mutate: addMealFn, isPending } = useMutation({
    mutationKey: ["progressData"],
    mutationFn: addMeal,
    onSuccess: () => {
      if (location.pathname === "/food-log") {
        toast.success("Meal added successfully");
      } else {
        toast.success("Added to food log successfully");
      }
      queryClient.invalidateQueries(["progressData"]);
    },
    onError: (error) => {
      toast.error("Failed to add Meal: " + error.message);
    }
  });
  return { addMealFn, isPending };
}

export default useAddMeal;
