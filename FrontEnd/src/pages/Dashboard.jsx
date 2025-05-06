import { FaUtensils, FaCalculator } from "react-icons/fa";
import { Link } from "react-router-dom";
import useUser from "../features/auth/useUser";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { FiSearch } from "react-icons/fi";

function Dashboard() {
  const { user, isAuthenticated } = useUser();
  const Name =
    user?.user_metadata?.firstName + " " + user?.user_metadata?.lastName;
  const stats = {
    caloriesConsumed: 1200,
    workoutsCompleted: 3,
    goalsAchieved: 2
  };
  const recentActivities = [
    { id: 1, type: "Meal", description: "Logged breakfast: 400 kcal" },
    { id: 2, type: "Workout", description: "Completed 30-minute run" },
    { id: 3, type: "Goal", description: "Reached 50% of monthly goal" }
  ];
  const progress = { current: 50, target: 100 };
  const weeklySummary = {
    totalCalories: 8400,
    totalWorkouts: 5,
    averageWaterIntake: 2.5,
    weightChange: -1.2
  };
  const progressData = [
    { week: "Week 1", progress: 20 },
    { week: "Week 2", progress: 40 },
    { week: "Week 3", progress: 60 },
    { week: "Week 4", progress: 80 }
  ];
  const dailyTips = [
    "Drink a glass of water before every meal to help control portion sizes.",
    "Aim for at least 30 minutes of physical activity every day.",
    "Include a variety of colorful fruits and vegetables in your meals.",
    "Track your progress regularly to stay motivated.",
    "Start your day with a high-protein breakfast to stay full longer.",
    "Get at least 7-9 hours of sleep each night for better overall health.",
    "Limit processed foods and opt for whole, natural ingredients instead.",
    "Practice mindful eating—slow down and savor each bite.",
    "Take short breaks from sitting every hour to stretch and move.",
    "Drink herbal tea instead of sugary beverages to stay hydrated.",
    "Plan your meals ahead to make healthier choices throughout the week.",
    "Reduce screen time before bed to improve sleep quality.",
    "Engage in deep breathing exercises to reduce stress and anxiety.",
    "Swap refined grains for whole grains like brown rice and quinoa.",
    "Use smaller plates to help control portion sizes naturally.",
    "Choose lean protein sources like fish, chicken, and plant-based proteins.",
    "Snack on nuts and seeds for a boost of healthy fats and energy.",
    "Get fresh air and natural sunlight daily to improve mood and vitamin D levels.",
    "Prioritize mental health by practicing gratitude and positive thinking.",
    "Reduce sugar intake by checking food labels for hidden sugars.",
    "Incorporate strength training exercises at least twice a week.",
    "Use stairs instead of elevators whenever possible.",
    "Avoid eating late at night to support better digestion and sleep.",
    "Hydrate properly—aim for at least 8 cups of water daily.",
    "Try meal prepping to ensure balanced meals and avoid unhealthy snacking.",
    "Take a 5-minute break for stretching or walking every hour at work.",
    "Experiment with different physical activities to find what you enjoy most.",
    "Limit caffeine intake in the afternoon to improve sleep quality.",
    "Eat fiber-rich foods like beans, whole grains, and vegetables for digestion.",
    "Reduce salt intake by seasoning food with herbs and spices instead.",
    "Practice portion control even with healthy foods.",
    "Listen to your body's hunger and fullness cues before eating.",
    "Add fermented foods like yogurt, kimchi, and sauerkraut for gut health.",
    "Cook more meals at home to control ingredients and portion sizes.",
    "Avoid skipping meals, as it can lead to overeating later in the day.",
    "Keep healthy snacks like fruits and nuts on hand to curb cravings.",
    "Limit alcohol consumption to maintain energy and health.",
    "Eat a variety of protein sources to get all essential amino acids.",
    "Stretch in the morning and before bed to stay flexible and relaxed.",
    "Make sleep a priority—stick to a consistent bedtime routine.",
    "Replace soda with sparkling water or herbal tea.",
    "Practice meditation or mindfulness daily for mental clarity.",
    "Laugh often—it reduces stress and boosts mood.",
    "Swap fried foods for baked or grilled options to reduce unhealthy fats.",
    "Eat dark leafy greens like spinach and kale for essential nutrients.",
    "Chew your food thoroughly to aid digestion and prevent overeating.",
    "Take a short walk after meals to help digestion and lower blood sugar.",
    "Keep a food journal to identify eating patterns and improve habits.",
    "Set realistic fitness goals to stay consistent and motivated.",
    "Try a new physical activity, like dancing or hiking, for variety.",
    "Reduce stress with hobbies and activities you enjoy.",
    "Avoid processed snacks—choose whole foods like fruit and nuts instead.",
    "Use a standing desk or take standing breaks if you work at a desk.",
    "Replace refined sugar with natural sweeteners like honey or dates.",
    "Limit fast food consumption—prepare homemade versions instead.",
    "Consume more omega-3 fatty acids from fish, flaxseeds, and walnuts.",
    "Get enough vitamin C from citrus fruits, bell peppers, and strawberries.",
    "Avoid distractions like TV or phone while eating to be more mindful.",
    "Take deep breaths throughout the day to reduce stress.",
    "Try a digital detox by taking breaks from social media.",
    "Incorporate stretching or yoga into your morning routine.",
    "Eat foods rich in iron, like lentils, spinach, and red meat.",
    "Choose whole fruit over fruit juices to get more fiber and nutrients.",
    "Cook meals with healthy fats like olive oil and avocado oil.",
    "Keep a reusable water bottle with you to stay hydrated.",
    "Swap white bread and pasta for whole grain alternatives.",
    "Choose dark chocolate over milk chocolate for antioxidants.",
    "Listen to music that relaxes you to lower stress levels.",
    "Schedule regular health checkups and screenings.",
    "Try intermittent fasting if it aligns with your health goals.",
    "Add chia or flaxseeds to smoothies for extra fiber and nutrients.",
    "Eat probiotic-rich foods like yogurt and kefir for gut health.",
    "Limit screen time before bed to improve melatonin production.",
    "Start your day with a glass of warm lemon water.",
    "Use the 80/20 rule—eat healthy 80% of the time and indulge 20%.",
    "Choose high-fiber breakfast options like oats and whole grains.",
    "Eat more plant-based meals for a balanced diet.",
    "Practice self-care by taking time to relax and unwind.",
    "Get outside for at least 15 minutes daily for fresh air and sunlight.",
    "Drink green tea for antioxidants and metabolism support.",
    "Eat seasonal produce for maximum flavor and nutrition.",
    "Use resistance bands or bodyweight exercises for strength training.",
    "Set a sleep schedule and stick to it, even on weekends.",
    "Replace sugary cereals with protein-rich breakfasts.",
    "Limit red meat intake and opt for leaner protein sources.",
    "Challenge yourself to try a new healthy recipe each week.",
    "Stay socially active—connecting with loved ones improves well-being.",
    "Reduce refined carbs and opt for complex carbs instead.",
    "Try meditative breathing techniques to calm your mind.",
    "Keep your kitchen stocked with healthy ingredients for easy meals.",
    "Use smaller bowls and plates to prevent overeating.",
    "Try dry brushing to boost circulation and exfoliate skin.",
    "Switch to natural cleaning and personal care products.",
    "Take a daily multivitamin if needed to fill nutritional gaps.",
    "Focus on progress, not perfection, in your health journey."
  ];

  const randomTip = dailyTips[Math.floor(Math.random() * dailyTips.length)];

  return (
    <main className="w-full min-h-screen p-6 rounded-lg bg-[#feffff]">
      {/* Welcome Section */}
      <div className="mb-8 text-center md:text-left">
        <h1 className="mb-3 text-2xl font-bold text-gray-800 sm:text-3xl">
          Welcome back, {isAuthenticated ? Name : "User"}!
        </h1>
        <p className="text-sm text-gray-600 md:text-base">
          Keep up the great work on your fitness journey.
        </p>
        <div className="p-4 mt-4 rounded-lg bg-green-50">
          <p className="text-sm text-green-700">💡 Daily Tip: {randomTip}</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3">
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700">
            Calories Consumed
          </h3>
          <p className="text-2xl font-bold text-green-600">
            {stats.caloriesConsumed} kcal
          </p>
        </div>
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700">
            Workouts Completed
          </h3>
          <p className="text-2xl font-bold text-blue-600">
            {stats.workoutsCompleted}
          </p>
        </div>
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700">
            Goals Achieved
          </h3>
          <p className="text-2xl font-bold text-purple-600">
            {stats.goalsAchieved}
          </p>
        </div>
      </div>

      {/* Weekly Summary */}
      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-bold text-gray-800">
          Weekly Summary
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-700">
              Total Calories
            </h3>
            <p className="text-2xl font-bold text-green-600">
              {weeklySummary.totalCalories} kcal
            </p>
          </div>
          <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-700">
              Total Workouts
            </h3>
            <p className="text-2xl font-bold text-blue-600">
              {weeklySummary.totalWorkouts}
            </p>
          </div>
          <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-700">
              Avg. Water Intake
            </h3>
            <p className="text-2xl font-bold text-purple-600">
              {weeklySummary.averageWaterIntake}L/day
            </p>
          </div>
          <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-700">
              Weight Change
            </h3>
            <p className="text-2xl font-bold text-yellow-600">
              {weeklySummary.weightChange} kg
            </p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-bold text-gray-800">
          Recent Activity
        </h2>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div
              key={activity.id}
              className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
            >
              <p className="text-gray-700">{activity.description}</p>
            </div>
          ))}
        </div>
        <Link
          rel="preload"
          to="/activity"
          className="block mt-4 text-sm text-blue-600 hover:underline"
        >
          View All Activity →
        </Link>
      </div>

      {/* Goals and Progress */}
      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-bold text-gray-800">Your Progress</h2>
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700">
            Monthly Goal: {progress.current}% Complete
          </h3>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
            <div
              className="bg-green-600 h-2.5 rounded-full"
              style={{ width: `${progress.current}%` }}
            ></div>
          </div>
          <div className="mt-6">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={progressData}>
                <XAxis dataKey="week" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="progress"
                  stroke="#3B82F6"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-bold text-gray-800">Quick Actions</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Link
            rel="preload"
            to="/food-log"
            className="flex items-center justify-center gap-2 p-6 transition-all bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-green-50"
          >
            <FaUtensils className="text-green-600" size={24} />
            <span className="text-lg font-semibold text-gray-700">
              Log a Meal
            </span>
          </Link>
          <Link
            rel="preload"
            to="/diet-recommendation"
            className="flex items-center justify-center gap-2 p-6 transition-all bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-blue-50"
          >
            <FaCalculator className="text-blue-600" size={24} />
            <span className="text-lg font-semibold text-gray-700">
              Calculator
            </span>
          </Link>
          <Link
            rel="preload"
            to="/browse-foods"
            className="flex items-center justify-center gap-2 p-6 transition-all bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-orange-50"
          >
            <FiSearch className="text-orange-600" size={24} />
            <span className="text-lg font-semibold text-gray-700">
              Explore Recipes
            </span>
          </Link>
        </div>
      </div>

      {/* Recent Nutrition Log */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Recent Nutrition Log
          </h2>
          <Link
            to="/nutrition-log"
            className="text-sm text-blue-600 hover:underline"
          >
            View All
          </Link>
        </div>
        <div className="space-y-4">
          <div className="p-4 rounded-lg shadow-sm border border-gray-200 bg-[#F9FAFB]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Lunch</h3>
                  <p className="text-gray-600">Grilled Chicken Salad, Quinoa</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-gray-500">12:30 PM</p>
                <p className="font-semibold">550 cal</p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg shadow-sm border border-gray-200 bg-[#F9FAFB]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Snack</h3>
                  <p className="text-gray-600">Apple, Almonds</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-gray-500">10:00 AM</p>
                <p className="font-semibold">120 cal</p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg shadow-sm border border-gray-200 bg-[#F9FAFB]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Breakfast</h3>
                  <p className="text-gray-600">Oatmeal with Berries</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-gray-500">8:00 AM</p>
                <p className="font-semibold">420 cal</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
