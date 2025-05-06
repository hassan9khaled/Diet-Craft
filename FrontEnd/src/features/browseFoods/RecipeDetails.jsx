import { useParams } from "react-router-dom";
import { useRecipes } from "../../context/RecipesContext";
import { useMemo, useState } from "react";
import { FaCheck, FaNutritionix, FaRegClock } from "react-icons/fa6";
import Spinner from "../../ui/Spinner";
import useAddMeal from "../foodLog/useAddMeal";
import useUser from "../auth/useUser";
import SpinnerMini from "../../ui/SpinnerMini";

function RecipeDetails() {
  const { id } = useParams();
  const { getRecipeById, isLoading } = useRecipes();
  const { user } = useUser();
  const { addMealFn, isPending: isAddingToFoodLog } = useAddMeal();

  const dessert = useMemo(() => getRecipeById(id), [id, getRecipeById]);
  const [mealType, setMealType] = useState("Breakfast");

  if (isLoading) return <Spinner />;
  if (!dessert) return <p>Recipe not found</p>;

  const {
    RecipeId,
    Name,
    Images,
    TotalTime,
    PrepTime,
    CookTime,
    Calories,
    FatContent,
    CarbohydrateContent,
    ProteinContent,
    CholesterolContent,
    SugarContent,
    SodiumContent,
    FiberContent,
    RecipeInstructions = [],
    RecipeIngredientParts = []
  } = dessert;

  function handleAddToFoodLog() {
    const totalNutrition = {
      IngredientsId: RecipeId,
      mealName: Name,
      mealType,
      email: user.email,
      calories: Calories,
      fat: FatContent,
      carb: CarbohydrateContent,
      protein: ProteinContent,
      cholesterol: CholesterolContent,
      sugar: SugarContent,
      sodium: SodiumContent,
      fiber: FiberContent,
      fromRecipes: true
    };
    addMealFn(totalNutrition);
  }

  return (
    <div className="grid grid-cols-1 gap-6 p-4 sm:gap-8 sm:p-6 md:p-8 md:grid-cols-2 lg:gap-10">
      {/* Left Column: Image & Title */}
      <div className="flex flex-col justify-between h-full gap-6">
        {/* Image */}
        <div className="relative w-full h-48 overflow-hidden rounded-lg sm:h-72 md:h-80">
          <img
            src={Images?.[0] || "/15.15.37_4f397ebf.jpg"}
            alt={Name || "Dessert"}
            loading="lazy"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Title and Description */}
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-center text-gray-800 md:text-start md:text-3xl">
            {Name}
          </h1>
          <p className="text-sm text-center text-gray-600 md:text-base md:text-start">
            A simple and delicious dish, perfect for any occasion. Customize it
            with your favorite ingredients for a satisfying meal.
          </p>
        </div>

        {/* Preparation Time */}
        <div className="flex-1 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
          <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-700">
            <FaRegClock /> Preparation Time:
          </h2>
          <ul className="mt-4 space-y-3 text-gray-600">
            <li>
              <strong>Total:</strong> {TotalTime} minutes
            </li>
            <li>
              <strong>Preparation:</strong> {PrepTime ?? 0} minutes
            </li>
            <li>
              <strong>Cooking:</strong> {CookTime ?? 0} minutes
            </li>
          </ul>
        </div>

        {/* Nutrition Facts */}
        <div className="flex-1 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
          <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-700">
            <FaNutritionix size={24} /> Nutrition:
          </h2>
          <div className="grid grid-cols-2 gap-4 mt-4 text-gray-600 md:gap-6">
            <div className="space-y-2">
              <p>
                <strong>Calories:</strong> {Calories ?? "N/A"} kcal
              </p>
              <p>
                <strong>Carbs:</strong> {CarbohydrateContent ?? "N/A"} g
              </p>
              <p>
                <strong>Protein:</strong> {ProteinContent ?? "N/A"} g
              </p>
              <p>
                <strong>Fat:</strong> {FatContent ?? "N/A"} g
              </p>
            </div>
            <div className="space-y-2">
              <p>
                <strong>Sugar:</strong> {SugarContent ?? "N/A"} g
              </p>
              <p>
                <strong>Cholesterol:</strong> {CholesterolContent ?? "N/A"} mg
              </p>
              <p>
                <strong>Sodium:</strong> {SodiumContent ?? "N/A"} mg
              </p>
              <p>
                <strong>Fiber:</strong> {FiberContent ?? "N/A"} g
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Ingredients & Instructions */}
      <div className="flex flex-col h-full gap-6">
        {/* Ingredients */}
        <div className="flex-1 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
          <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-700">
            Ingredients:
          </h2>
          <ul className="mt-2 space-y-2 text-gray-700 overflow-y-auto max-h-[50vh]">
            {RecipeIngredientParts?.map((item, index) => (
              <li key={index} className="flex items-center gap-2">
                <FaCheck className="text-green-500" />
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </li>
            ))}
          </ul>
        </div>

        {/* Instructions */}
        <div className="flex-1 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
          <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-700">
            Instructions:
          </h2>
          <ol className="mt-2 space-y-2 text-gray-700 overflow-y-auto max-h-[40vh]">
            {RecipeInstructions?.map((item, index) => (
              <li key={index} className="flex gap-2">
                <span className="font-semibold">{index + 1}.</span>
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </li>
            ))}
          </ol>
        </div>

        {/* Meal Type Dropdown */}
        <div className="flex flex-col gap-2">
          <label className="font-medium text-gray-700">Select Meal Type:</label>
          <select
            value={mealType}
            onChange={(e) => setMealType(e.target.value)}
            className="p-2 border rounded-lg"
          >
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Snack">Snack</option>
          </select>
        </div>

        {/* Add to Food Log Button */}
        <div className="flex justify-end w-full">
          <button
            onClick={handleAddToFoodLog}
            className="flex items-center justify-center w-40 gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 max-sm:w-full"
          >
            {isAddingToFoodLog ? <SpinnerMini /> : "Add to food log"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetails;
