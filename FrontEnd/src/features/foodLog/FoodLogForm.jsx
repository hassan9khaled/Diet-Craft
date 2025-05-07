/* eslint-disable react/prop-types */
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { FiPlusCircle } from "react-icons/fi";
import useAddFood from "./useAddFood";

function FoodLogForm({ setOverlay, email }) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: {
      food: "",
      mealType: "Breakfast",
      calories: 0,
      carbs: 0,
      protein: 0,
      fat: 0
    }
  });
  const handleNumberChange = useCallback(
    (field) => (e) => {
      const value = Math.max(0, Number(e.target.value));
      setValue(field, value);
    },
    [setValue]
  );

  const { addFoodFn, isPending } = useAddFood();
  const onSubmit = (data) => {
    addFoodFn({ ...data, mealId: Date.now().toString(), email });
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto space-y-6 max-w-8xl"
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Food Name */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Food Name
          </label>
          <input
            type="text"
            className={`w-full p-3 border rounded-lg outline-none ${errors.food ? "border-red-500" : "border-gray-300"}`}
            placeholder="Enter food name"
            {...register("food", {
              required: "Food name is required",
              pattern: {
                value: /^[a-zA-Z\s]+$/,
                message: "Only letters and spaces are allowed"
              }
            })}
          />
          {errors.food && (
            <p className="mt-2 text-sm text-red-500">{errors.food.message}</p>
          )}
        </div>

        {/* Meal Type */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Meal Type
          </label>
          <select
            className="w-full p-3 border border-gray-300 rounded-lg outline-none"
            {...register("mealType")}
          >
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Snack">Snack</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {["calories", "carbs", "protein", "fat"].map((field) => (
          <div key={field}>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              {field.charAt(0).toUpperCase() + field.slice(1)} (g)
            </label>
            <input
              type="number"
              className="w-full p-3 border border-gray-300 rounded-lg outline-none"
              placeholder={`Enter ${field}`}
              {...register(field, { valueAsNumber: true })}
              onChange={handleNumberChange(field)}
            />
          </div>
        ))}
      </div>

      <div className="flex flex-col-reverse flex-wrap justify-between gap-4 lg:flex-row">
        <div className="flex flex-wrap justify-between gap-4 max-sm:w-full">
          <button
            type="submit"
            className="flex items-center justify-center w-full gap-2 p-3 text-white transition-transform transform bg-green-600 rounded-lg sm:w-48 hover:bg-green-700"
          >
            {isPending ? (
              "Adding..."
            ) : (
              <>
                <FiPlusCircle size={18} /> Add Food
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => setOverlay(true)}
            className="flex items-center justify-center w-full gap-2 p-3 text-white transition-transform transform bg-blue-600 rounded-lg sm:w-48 hover:bg-blue-700"
          >
            <FiPlusCircle size={18} /> Add Ingredients
          </button>
        </div>
      </div>
    </form>
  );
}

export default FoodLogForm;
