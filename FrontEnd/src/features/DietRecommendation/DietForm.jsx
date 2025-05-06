import { useForm } from "react-hook-form";
import { useTarget } from "../../context/TargetContext";
import useUser from "../auth/useUser";
import useDiet from "./useDiet";
import Target from "../DietRecommendation/Target";
import Spinner from "../../ui/Spinner";
import SpinnerMini from "../../ui/SpinnerMini";
import useCreateTarget from "./useCreateTarget";
import useGetTarget from "./useGetTarget";

// 👉 Import your custom fields
import InputField from "../../ui/InputField";
import SelectField from "../../ui/SelectField";

function DietForm() {
  const { user } = useUser();
  const email = user?.email || "";
  const { getNutritions, isLoading } = useTarget();
  const { dietFn } = useDiet();
  const { targetFn } = useCreateTarget();
  const { isPending: isGetting } = useGetTarget(email);

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm();

  const fullName =
    `${user?.user_metadata?.firstName || ""} ${user?.user_metadata?.lastName || ""}`.trim();

  const onSubmit = async (data) => {
    try {
      const rate = data?.plan?.split(" ");
      const nutrationsGuest = {
        ...data,
        height: Number(data.height),
        weight: Number(data.weight),
        bodyFat: Number(data.bodyFat),
        age: Number(data.age),
        rate: rate[1],
        plan: rate[0]
      };
      dietFn({
        addGuest: { ...data, email, fullName, rate: rate[1], plan: rate[0] },
        email
      });
      const nutrations = await getNutritions(nutrationsGuest);
      if (nutrations) {
        targetFn({ email, targetData: nutrations });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  if (isGetting) {
    return <Spinner />;
  }

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-800">
        Calculate Your Diet Plan
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          {/* Age */}
          <InputField
            id="age"
            label="Age"
            type="number"
            register={register}
            validation={{
              required: "Age is required",
              min: { value: 13, message: "Age must be at least 13" },
              max: { value: 110, message: "Age must not exceed 110" }
            }}
            error={errors.age}
          />

          {/* Height */}
          <InputField
            id="height"
            label="Height (cm)"
            type="number"
            register={register}
            validation={{
              required: "Height is required",
              min: { value: 100, message: "Height must be at least 100 cm" },
              max: { value: 250, message: "Height must not exceed 250 cm" }
            }}
            error={errors.height}
          />

          {/* Weight */}
          <InputField
            id="weight"
            label="Weight (kg)"
            type="number"
            register={register}
            validation={{
              required: "Weight is required",
              min: {
                value: 60,
                message: "Weight should be greater than 60"
              },
              max: {
                value: 300,
                message: "Weight should be less than 300"
              }
            }}
            error={errors.weight}
          />

          {/* Gender */}
          <SelectField
            id="gender"
            label="Gender"
            register={register}
            validation={{ required: "Gender is required" }}
            error={errors.gender}
            options={[
              { value: "male", label: "Male" },
              { value: "female", label: "Female" }
            ]}
          />
        </div>

        {/* Plan & Activity */}
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <SelectField
              id="plan"
              label="Your weight loss plan:"
              register={register}
              validation={{ required: "Plan is required" }}
              error={errors.plan}
              options={[
                { value: "gain 0.5", label: "Gain Weight" },
                { value: "gain 1", label: "Extreme Gain Weight" },
                { value: "maintain 0", label: "Maintain" },
                { value: "loss 0.5", label: "Weight Loss" },
                { value: "loss 1", label: "Extreme Weight Loss" }
              ]}
            />
          </div>
          <div>
            <SelectField
              id="activity"
              label="Activity Level"
              register={register}
              validation={{ required: "Activity is required" }}
              error={errors.activity}
              options={[
                { value: "sedentary", label: "Little/no exercise" },
                { value: "lightlyActive", label: "Light exercise" },
                { value: "moderateActivity", label: "Moderate exercise" },
                { value: "active", label: "Active" },
                {
                  value: "veryActive",
                  label: "Very Active & Physical Job"
                }
              ]}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="py-4">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 p-3 text-white bg-green-600 rounded-lg md:w-48 hover:bg-green-700"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <SpinnerMini />
              </div>
            ) : (
              "Calculate"
            )}
          </button>
        </div>
      </form>
      <Target />
    </div>
  );
}

export default DietForm;
