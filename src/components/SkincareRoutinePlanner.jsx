import React, { useState } from "react";

const SkincareRoutinePlanner = () => {
  const [currentSkinType, setCurrentSkinType] = useState("normal");
  const [waterGlasses, setWaterGlasses] = useState(Array(10).fill(false));

  const dietPlan = {
    meals: [
      {
        name: "Early Morning",
        time: "6:00 AM",
        icon: "🌅",
        items: [
          {
            food: "Warm Lemon Water",
            benefit: "Detoxifies skin, boosts vitamin C",
          },
          {
            food: "Soaked Almonds (5-6)",
            benefit: "Rich in vitamin E for skin repair",
          },
        ],
      },
      {
        name: "Breakfast",
        time: "8:00 AM",
        icon: "🍳",
        items: [
          {
            food: "Oatmeal with Berries",
            benefit: "Antioxidants fight free radicals",
          },
          { food: "Greek Yogurt", benefit: "Probiotics for gut-skin health" },
          { food: "Green Tea", benefit: "Anti-inflammatory, reduces acne" },
          {
            food: "Chia Seeds (1 tbsp)",
            benefit: "Omega-3 for skin hydration",
          },
        ],
      },
      {
        name: "Mid-Morning Snack",
        time: "11:00 AM",
        icon: "🥗",
        items: [
          { food: "Mixed Nuts", benefit: "Healthy fats for glowing skin" },
          { food: "Orange or Kiwi", benefit: "Vitamin C boosts collagen" },
        ],
      },
      {
        name: "Lunch",
        time: "1:00 PM",
        icon: "🍱",
        items: [
          {
            food: "Grilled Fish (Salmon/Tuna)",
            benefit: "Omega-3 fatty acids reduce inflammation",
          },
          {
            food: "Quinoa or Brown Rice",
            benefit: "Complex carbs stabilize blood sugar",
          },
          {
            food: "Spinach & Kale Salad",
            benefit: "Iron and vitamins A, C, K",
          },
          { food: "Avocado", benefit: "Healthy fats for skin elasticity" },
        ],
      },
      {
        name: "Evening Snack",
        time: "4:00 PM",
        icon: "🥤",
        items: [
          {
            food: "Carrot Sticks with Hummus",
            benefit: "Beta-carotene for skin repair",
          },
          { food: "Green Smoothie", benefit: "Cucumber, celery for hydration" },
        ],
      },
      {
        name: "Dinner",
        time: "7:00 PM",
        icon: "🍽️",
        items: [
          {
            food: "Grilled Chicken or Tofu",
            benefit: "Protein for skin cell repair",
          },
          {
            food: "Sweet Potato",
            benefit: "Beta-carotene for healthy skin tone",
          },
          {
            food: "Broccoli & Bell Peppers",
            benefit: "Vitamin C and antioxidants",
          },
          { food: "Tomato Soup", benefit: "Lycopene protects from sun damage" },
        ],
      },
      {
        name: "Before Bed",
        time: "9:00 PM",
        icon: "🌙",
        items: [
          { food: "Chamomile Tea", benefit: "Reduces stress, improves sleep" },
          {
            food: "Walnuts (3-4)",
            benefit: "Melatonin for overnight skin repair",
          },
        ],
      },
    ],
    keyNutrients: [
      {
        icon: "💧",
        name: "Hydration",
        detail: "Drink 8-10 glasses of water daily for plump, clear skin",
      },
      {
        icon: "🥑",
        name: "Healthy Fats",
        detail: "Omega-3s keep skin moisturized and supple",
      },
      {
        icon: "🍊",
        name: "Vitamin C",
        detail: "Boosts collagen production and brightens skin",
      },
      {
        icon: "🥕",
        name: "Vitamin A",
        detail: "Promotes cell turnover and prevents acne",
      },
      {
        icon: "🥜",
        name: "Vitamin E",
        detail: "Antioxidant that protects from damage",
      },
      {
        icon: "🍓",
        name: "Antioxidants",
        detail: "Fight free radicals and aging",
      },
    ],
    avoid: [
      "🚫 Excessive Sugar - Causes inflammation and breakouts",
      "🚫 Processed Foods - Lack nutrients, increase oil production",
      "🚫 Dairy (if sensitive) - May trigger acne in some people",
      "🚫 Alcohol - Dehydrates skin and causes dullness",
      "🚫 High-Sodium Foods - Causes puffiness and water retention",
    ],
  };

  const skinCareRoutines = {
    normal: {
      morning: [
        {
          name: "Gentle Cleanser",
          step: "Step 1",
          amount: "1-2 pumps (1ml)",
          frequency: "Daily",
          weeklyUsage: "7ml",
          ingredients: "Glycerin, Niacinamide, Ceramides, Hyaluronic Acid",
          benefits: "Cleanses without stripping natural oils",
        },
        {
          name: "Vitamin C Serum",
          step: "Step 2",
          amount: "3-4 drops (0.5ml)",
          frequency: "Daily",
          weeklyUsage: "3.5ml",
          ingredients: "L-Ascorbic Acid (15%), Vitamin E, Ferulic Acid",
          benefits: "Brightens skin and protects from free radicals",
        },
        {
          name: "Moisturizer",
          step: "Step 3",
          amount: "Pea-sized (0.5ml)",
          frequency: "Daily",
          weeklyUsage: "3.5ml",
          ingredients: "Hyaluronic Acid, Glycerin, Ceramides, Peptides",
          benefits: "Hydrates and strengthens skin barrier",
        },
        {
          name: "Sunscreen SPF 50",
          step: "Step 4",
          amount: "2 finger lengths (2ml)",
          frequency: "Daily",
          weeklyUsage: "14ml",
          ingredients: "Zinc Oxide, Titanium Dioxide, Niacinamide",
          benefits: "Protects from UV damage and premature aging",
        },
      ],
      evening: [
        {
          name: "Oil Cleanser",
          step: "Step 1",
          amount: "2 pumps (2ml)",
          frequency: "Daily",
          weeklyUsage: "14ml",
          ingredients: "Jojoba Oil, Vitamin E, Squalane",
          benefits: "Removes makeup and sunscreen",
        },
        {
          name: "Gentle Cleanser",
          step: "Step 2",
          amount: "1-2 pumps (1ml)",
          frequency: "Daily",
          weeklyUsage: "7ml",
          ingredients: "Glycerin, Niacinamide, Ceramides",
          benefits: "Second cleanse for deep cleaning",
        },
        {
          name: "Retinol Serum",
          step: "Step 3",
          amount: "3-4 drops (0.5ml)",
          frequency: "3x per week",
          weeklyUsage: "1.5ml",
          ingredients: "Retinol 0.5%, Niacinamide, Peptides",
          benefits: "Anti-aging, improves texture and tone",
        },
        {
          name: "Night Cream",
          step: "Step 4",
          amount: "Pea-sized (0.5ml)",
          frequency: "Daily",
          weeklyUsage: "3.5ml",
          ingredients: "Ceramides, Peptides, Hyaluronic Acid, Shea Butter",
          benefits: "Deep overnight hydration and repair",
        },
      ],
    },
    oily: {
      morning: [
        {
          name: "Salicylic Acid Cleanser",
          step: "Step 1",
          amount: "1-2 pumps (1ml)",
          frequency: "Daily",
          weeklyUsage: "7ml",
          ingredients: "Salicylic Acid 2%, Niacinamide, Tea Tree Oil",
          benefits: "Controls oil and prevents breakouts",
        },
        {
          name: "Niacinamide Serum",
          step: "Step 2",
          amount: "3-4 drops (0.5ml)",
          frequency: "Daily",
          weeklyUsage: "3.5ml",
          ingredients: "Niacinamide 10%, Zinc, Hyaluronic Acid",
          benefits: "Minimizes pores and controls sebum",
        },
        {
          name: "Oil-Free Moisturizer",
          step: "Step 3",
          amount: "Pea-sized (0.5ml)",
          frequency: "Daily",
          weeklyUsage: "3.5ml",
          ingredients: "Hyaluronic Acid, Glycerin, Aloe Vera",
          benefits: "Lightweight hydration without greasiness",
        },
        {
          name: "Mattifying Sunscreen SPF 50",
          step: "Step 4",
          amount: "2 finger lengths (2ml)",
          frequency: "Daily",
          weeklyUsage: "14ml",
          ingredients: "Zinc Oxide, Niacinamide, Silica",
          benefits: "Sun protection with oil control",
        },
      ],
      evening: [
        {
          name: "Micellar Water",
          step: "Step 1",
          amount: "Cotton pad soaked",
          frequency: "Daily",
          weeklyUsage: "7ml",
          ingredients: "Micelles, Glycerin, Cucumber Extract",
          benefits: "Gentle makeup removal",
        },
        {
          name: "Salicylic Acid Cleanser",
          step: "Step 2",
          amount: "1-2 pumps (1ml)",
          frequency: "Daily",
          weeklyUsage: "7ml",
          ingredients: "Salicylic Acid 2%, Tea Tree Oil",
          benefits: "Deep pore cleansing",
        },
        {
          name: "AHA/BHA Toner",
          step: "Step 3",
          amount: "2-3 drops (0.5ml)",
          frequency: "Alternate days",
          weeklyUsage: "1.75ml",
          ingredients: "Glycolic Acid, Salicylic Acid, Witch Hazel",
          benefits: "Exfoliates and refines pores",
        },
        {
          name: "Gel Moisturizer",
          step: "Step 4",
          amount: "Pea-sized (0.5ml)",
          frequency: "Daily",
          weeklyUsage: "3.5ml",
          ingredients: "Hyaluronic Acid, Aloe Vera, Green Tea",
          benefits: "Hydrates without clogging pores",
        },
      ],
    },
    dry: {
      morning: [
        {
          name: "Creamy Cleanser",
          step: "Step 1",
          amount: "2 pumps (1.5ml)",
          frequency: "Daily",
          weeklyUsage: "10.5ml",
          ingredients: "Ceramides, Glycerin, Shea Butter, Oat Extract",
          benefits: "Cleanses while maintaining moisture",
        },
        {
          name: "Hyaluronic Acid Serum",
          step: "Step 2",
          amount: "4-5 drops (0.7ml)",
          frequency: "Daily",
          weeklyUsage: "4.9ml",
          ingredients: "Hyaluronic Acid, Vitamin B5, Glycerin",
          benefits: "Intense hydration and plumping",
        },
        {
          name: "Rich Moisturizer",
          step: "Step 3",
          amount: "Nickel-sized (0.7ml)",
          frequency: "Daily",
          weeklyUsage: "4.9ml",
          ingredients: "Ceramides, Shea Butter, Squalane, Peptides",
          benefits: "Deep moisture and barrier repair",
        },
        {
          name: "Hydrating Sunscreen SPF 50",
          step: "Step 4",
          amount: "2 finger lengths (2ml)",
          frequency: "Daily",
          weeklyUsage: "14ml",
          ingredients: "Zinc Oxide, Hyaluronic Acid, Vitamin E",
          benefits: "Sun protection with added hydration",
        },
      ],
      evening: [
        {
          name: "Cleansing Balm",
          step: "Step 1",
          amount: "Almond-sized (2ml)",
          frequency: "Daily",
          weeklyUsage: "14ml",
          ingredients: "Shea Butter, Jojoba Oil, Vitamin E",
          benefits: "Gentle makeup removal",
        },
        {
          name: "Creamy Cleanser",
          step: "Step 2",
          amount: "2 pumps (1.5ml)",
          frequency: "Daily",
          weeklyUsage: "10.5ml",
          ingredients: "Ceramides, Glycerin, Oat Extract",
          benefits: "Second cleanse without drying",
        },
        {
          name: "Facial Oil",
          step: "Step 3",
          amount: "3-4 drops (0.5ml)",
          frequency: "Daily",
          weeklyUsage: "3.5ml",
          ingredients: "Rosehip Oil, Argan Oil, Vitamin E, Squalane",
          benefits: "Nourishes and locks in moisture",
        },
        {
          name: "Night Cream",
          step: "Step 4",
          amount: "Nickel-sized (0.7ml)",
          frequency: "Daily",
          weeklyUsage: "4.9ml",
          ingredients: "Ceramides, Peptides, Shea Butter, Retinol",
          benefits: "Overnight repair and hydration",
        },
      ],
    },
    combination: {
      morning: [
        {
          name: "Balanced Cleanser",
          step: "Step 1",
          amount: "1-2 pumps (1ml)",
          frequency: "Daily",
          weeklyUsage: "7ml",
          ingredients: "Niacinamide, Glycerin, Green Tea Extract",
          benefits: "Balances both oily and dry areas",
        },
        {
          name: "Niacinamide + Hyaluronic Serum",
          step: "Step 2",
          amount: "3-4 drops (0.5ml)",
          frequency: "Daily",
          weeklyUsage: "3.5ml",
          ingredients: "Niacinamide 5%, Hyaluronic Acid, Zinc",
          benefits: "Balances oil and hydrates",
        },
        {
          name: "Lightweight Moisturizer",
          step: "Step 3",
          amount: "Pea-sized (0.5ml)",
          frequency: "Daily",
          weeklyUsage: "3.5ml",
          ingredients: "Hyaluronic Acid, Ceramides, Squalane",
          benefits: "Hydrates without heaviness",
        },
        {
          name: "Broad Spectrum Sunscreen SPF 50",
          step: "Step 4",
          amount: "2 finger lengths (2ml)",
          frequency: "Daily",
          weeklyUsage: "14ml",
          ingredients: "Zinc Oxide, Niacinamide, Vitamin C",
          benefits: "Universal sun protection",
        },
      ],
      evening: [
        {
          name: "Cleansing Oil",
          step: "Step 1",
          amount: "2 pumps (2ml)",
          frequency: "Daily",
          weeklyUsage: "14ml",
          ingredients: "Grapeseed Oil, Jojoba Oil, Vitamin E",
          benefits: "Removes makeup and impurities",
        },
        {
          name: "Balanced Cleanser",
          step: "Step 2",
          amount: "1-2 pumps (1ml)",
          frequency: "Daily",
          weeklyUsage: "7ml",
          ingredients: "Niacinamide, Glycerin, Green Tea",
          benefits: "Thorough cleansing",
        },
        {
          name: "AHA Toner",
          step: "Step 3",
          amount: "2-3 drops (0.5ml)",
          frequency: "3x per week",
          weeklyUsage: "1.5ml",
          ingredients: "Lactic Acid 5%, Glycolic Acid, Aloe Vera",
          benefits: "Gentle exfoliation for T-zone",
        },
        {
          name: "Balancing Night Cream",
          step: "Step 4",
          amount: "Pea-sized (0.5ml)",
          frequency: "Daily",
          weeklyUsage: "3.5ml",
          ingredients: "Ceramides, Peptides, Niacinamide, Squalane",
          benefits: "Overnight balance and repair",
        },
      ],
    },
    sensitive: {
      morning: [
        {
          name: "Fragrance-Free Cleanser",
          step: "Step 1",
          amount: "1-2 pumps (1ml)",
          frequency: "Daily",
          weeklyUsage: "7ml",
          ingredients: "Colloidal Oatmeal, Glycerin, Ceramides",
          benefits: "Ultra-gentle cleansing",
        },
        {
          name: "Calming Serum",
          step: "Step 2",
          amount: "3-4 drops (0.5ml)",
          frequency: "Daily",
          weeklyUsage: "3.5ml",
          ingredients: "Centella Asiatica, Niacinamide, Panthenol",
          benefits: "Soothes and reduces redness",
        },
        {
          name: "Barrier Repair Moisturizer",
          step: "Step 3",
          amount: "Pea-sized (0.5ml)",
          frequency: "Daily",
          weeklyUsage: "3.5ml",
          ingredients: "Ceramides, Colloidal Oatmeal, Allantoin",
          benefits: "Strengthens sensitive skin barrier",
        },
        {
          name: "Mineral Sunscreen SPF 50",
          step: "Step 4",
          amount: "2 finger lengths (2ml)",
          frequency: "Daily",
          weeklyUsage: "14ml",
          ingredients: "Zinc Oxide, Titanium Dioxide (Physical filters only)",
          benefits: "Gentle sun protection",
        },
      ],
      evening: [
        {
          name: "Gentle Micellar Water",
          step: "Step 1",
          amount: "Cotton pad soaked",
          frequency: "Daily",
          weeklyUsage: "7ml",
          ingredients: "Micelles, Glycerin, Chamomile Extract",
          benefits: "No-rinse gentle cleansing",
        },
        {
          name: "Fragrance-Free Cleanser",
          step: "Step 2",
          amount: "1-2 pumps (1ml)",
          frequency: "Daily",
          weeklyUsage: "7ml",
          ingredients: "Colloidal Oatmeal, Ceramides",
          benefits: "Second gentle cleanse",
        },
        {
          name: "Soothing Essence",
          step: "Step 3",
          amount: "3-4 drops (0.5ml)",
          frequency: "Daily",
          weeklyUsage: "3.5ml",
          ingredients: "Centella Asiatica, Madecassoside, Panthenol",
          benefits: "Calms irritation overnight",
        },
        {
          name: "Rich Barrier Cream",
          step: "Step 4",
          amount: "Pea-sized (0.5ml)",
          frequency: "Daily",
          weeklyUsage: "3.5ml",
          ingredients: "Ceramides, Shea Butter, Colloidal Oatmeal",
          benefits: "Intensive overnight repair",
        },
      ],
    },
  };

  const toggleWater = (index) => {
    const newWaterGlasses = [...waterGlasses];
    newWaterGlasses[index] = !newWaterGlasses[index];
    setWaterGlasses(newWaterGlasses);
  };

  const ProductCard = ({ product }) => (
    <div className="bg-gradient-to-br from-gray-50 to-gray-200 p-5 rounded-2xl border-l-4 border-orange-500">
      <div className="flex justify-between items-start mb-4">
        <div className="text-xl font-bold text-gray-800">{product.name}</div>
        <div className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm">
          {product.step}
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between py-2 border-b border-gray-300">
          <span className="font-semibold text-gray-600">Amount per use:</span>
          <span className="text-gray-800">{product.amount}</span>
        </div>
        <div className="flex justify-between py-2 border-b border-gray-300">
          <span className="font-semibold text-gray-600">Frequency:</span>
          <span className="text-gray-800">{product.frequency}</span>
        </div>
        <div className="flex justify-between py-2 border-b border-gray-300">
          <span className="font-semibold text-gray-600">Weekly usage:</span>
          <span className="text-gray-800">{product.weeklyUsage}</span>
        </div>
      </div>
      <div className="mt-4 p-4 bg-white rounded-xl">
        <div className="font-bold text-orange-600 mb-2">
          🧪 Key Ingredients:
        </div>
        <div className="text-gray-600 leading-relaxed">
          {product.ingredients}
        </div>
        <div className="mt-2 text-orange-600 font-medium">
          ✓ {product.benefits}
        </div>
      </div>
    </div>
  );

  const routine = skinCareRoutines[currentSkinType];
  const allProducts = [...routine.morning, ...routine.evening];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 p-5 mt-5">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-10">
          <div className="inline-block mb-4 bg-white rounded-full px-6 py-2 shadow-md border border-orange-200">
            <span className="text-orange-600 font-semibold text-sm">
              ✨ Skincare & Wellness
            </span>
          </div>
          <h1 className="text-5xl font-black mb-4">
            <span className="bg-gradient-to-r from-orange-600 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Skincare Routine Planner
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your personalized skincare guide with weekly usage tracking
          </p>
        </header>

        <div className="bg-white p-8 rounded-3xl shadow-2xl mb-8">
          <h2 className="text-2xl font-bold text-orange-600 mb-5">
            Select Your Skin Type
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {["normal", "oily", "dry", "combination", "sensitive"].map(
              (type) => (
                <button
                  key={type}
                  onClick={() => setCurrentSkinType(type)}
                  className={`p-4 rounded-xl border-2 text-lg font-medium transition-all transform hover:scale-105 ${
                    currentSkinType === type
                      ? "bg-orange-600 text-white border-orange-600"
                      : "bg-white text-orange-600 border-orange-600 hover:bg-orange-600 hover:text-white"
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              )
            )}
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-2xl mb-8">
          <h2 className="text-2xl font-bold text-orange-600 mb-5 flex items-center gap-3">
            🌅 Morning Routine
            <span className="bg-orange-600 text-white px-4 py-1 rounded-full text-sm">
              AM
            </span>
          </h2>
          <div className="grid gap-5">
            {routine.morning.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-2xl mb-8">
          <h2 className="text-2xl font-bold text-orange-600 mb-5 flex items-center gap-3">
            🌙 Evening Routine
            <span className="bg-orange-600 text-white px-4 py-1 rounded-full text-sm">
              PM
            </span>
          </h2>
          <div className="grid gap-5">
            {routine.evening.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-400 to-red-500 p-8 rounded-3xl shadow-2xl text-white mb-8">
          <h2 className="text-3xl font-bold mb-5">
            📊 Weekly Product Usage Summary
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allProducts.map((product, index) => (
              <div
                key={index}
                className="bg-white bg-opacity-90 p-4 rounded-xl backdrop-blur-sm text-gray-800"
              >
                <div className="font-bold text-lg mb-1 text-gray-900">
                  {product.name}
                </div>
                <div className="text-2xl mb-1 text-orange-600 font-bold">
                  {product.weeklyUsage}/week
                </div>
                <div className="text-gray-700">{product.frequency}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-red-600 p-8 rounded-3xl shadow-2xl text-white mb-8">
          <h2 className="text-3xl font-bold mb-3">
            🥗 Daily Diet Plan for Glowing Skin
          </h2>
          <p className="text-lg mb-5">
            Nutrition is 70% of skincare! Combine your routine with these foods
            for maximum results.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
            {dietPlan.meals.map((meal, index) => (
              <div
                key={index}
                className="bg-white bg-opacity-95 text-gray-800 p-5 rounded-2xl shadow-lg"
              >
                <div className="text-xl font-bold text-orange-600 mb-4 flex items-center gap-2">
                  <span>{meal.icon}</span>
                  <span>{meal.name}</span>
                  <span className="bg-orange-600 text-white px-2 py-1 rounded-full text-xs ml-auto">
                    {meal.time}
                  </span>
                </div>
                {meal.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="py-2 border-b border-gray-200 last:border-0"
                  >
                    <div className="font-semibold text-gray-800 mb-1">
                      ✓ {item.food}
                    </div>
                    <div className="text-sm text-gray-600">{item.benefit}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="bg-white bg-opacity-95 p-5 rounded-2xl text-gray-800 mb-5">
            <h3 className="text-xl text-orange-600 font-bold text-center mb-3">
              💧 Daily Water Intake Tracker
            </h3>
            <p className="text-center mb-4">
              Click each glass as you drink! Target: 8-10 glasses
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              {waterGlasses.map((filled, index) => (
                <span
                  key={index}
                  onClick={() => toggleWater(index)}
                  className="text-4xl cursor-pointer transition-transform hover:scale-125"
                >
                  {filled ? "💧" : "🥛"}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl">
            <h3 className="text-2xl text-orange-600 font-bold text-center mb-5">
              Key Nutrients for Your Skin
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {dietPlan.keyNutrients.map((nutrient, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-orange-500 to-red-600 text-white p-4 rounded-xl text-center"
                >
                  <div className="text-3xl mb-2">{nutrient.icon}</div>
                  <div className="font-bold mb-1">{nutrient.name}</div>
                  <div className="text-sm">{nutrient.detail}</div>
                </div>
              ))}
            </div>

            <div className="mb-6 p-5 bg-red-100 border-l-4 border-red-500 rounded-lg">
              <h4 className="text-red-800 font-bold text-xl mb-3">
                ⚠️ Foods to Avoid or Limit
              </h4>
              {dietPlan.avoid.map((item, index) => (
                <div key={index} className="py-1 text-red-800">
                  {item}
                </div>
              ))}
            </div>

            <div className="p-5 bg-orange-100 border-l-4 border-orange-500 rounded-lg">
              <h4 className="text-orange-800 font-bold text-xl mb-3">
                💡 Pro Tips
              </h4>
              <ul className="text-orange-800 space-y-2 list-disc pl-5">
                <li>Eat a rainbow of colorful fruits and vegetables daily</li>
                <li>
                  Include fermented foods (kimchi, sauerkraut) for gut health
                </li>
                <li>Take omega-3 supplements if you don't eat fish</li>
                <li>Reduce caffeine intake (max 2 cups/day)</li>
                <li>Eat dinner 3 hours before bedtime for better digestion</li>
                <li>
                  Combine this diet with your skincare routine for best results!
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkincareRoutinePlanner;
