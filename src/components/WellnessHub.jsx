import React, { useState, useEffect } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Check,
  Timer,
  Dumbbell,
  Brain,
  Heart,
  Zap,
  Sun,
  Moon,
  Coffee,
  Wind,
  Target,
  TrendingUp,
  Award,
  Calendar,
} from "lucide-react";

const WellnessHub = () => {
  const [activeTab, setActiveTab] = useState("physical");
  const [completedExercises, setCompletedExercises] = useState([]);
  const [activeTimer, setActiveTimer] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);

  const physicalExercises = [
    {
      id: 1,
      name: "Morning Stretching Routine",
      duration: 10,
      difficulty: "Easy",
      calories: 30,
      icon: Sun,
      benefits: ["Flexibility", "Blood circulation", "Energy boost"],
      steps: [
        "Neck rolls - 10 rotations each side",
        "Shoulder rolls - 15 rotations",
        "Side bends - 10 each side",
        "Hamstring stretch - Hold 30 seconds each leg",
        "Cat-cow stretch - 15 repetitions",
      ],
      bestTime: "Morning",
      category: "Flexibility",
    },
    {
      id: 2,
      name: "Quick Cardio Blast",
      duration: 15,
      difficulty: "Medium",
      calories: 120,
      icon: Zap,
      benefits: ["Heart health", "Fat burning", "Stamina"],
      steps: [
        "Jumping jacks - 1 minute",
        "High knees - 1 minute",
        "Burpees - 30 seconds",
        "Mountain climbers - 1 minute",
        "Rest - 30 seconds",
        "Repeat circuit 2 times",
      ],
      bestTime: "Morning/Evening",
      category: "Cardio",
    },
    {
      id: 3,
      name: "Core Strength Builder",
      duration: 12,
      difficulty: "Medium",
      calories: 80,
      icon: Target,
      benefits: ["Core strength", "Posture", "Back health"],
      steps: [
        "Plank hold - 30 seconds",
        "Crunches - 20 reps",
        "Russian twists - 30 reps",
        "Leg raises - 15 reps",
        "Bicycle crunches - 30 reps",
        "Rest and repeat",
      ],
      bestTime: "Anytime",
      category: "Strength",
    },
    {
      id: 4,
      name: "Desk Worker's Relief",
      duration: 8,
      difficulty: "Easy",
      calories: 25,
      icon: Coffee,
      benefits: ["Reduce stiffness", "Improve posture", "Eye relief"],
      steps: [
        "Seated spinal twist - 30 seconds each side",
        "Neck stretches - 4 directions, 10 seconds each",
        "Wrist circles - 20 rotations",
        "Ankle rotations - 20 each foot",
        "Eye exercises - Look far and near, 1 minute",
      ],
      bestTime: "During work",
      category: "Recovery",
    },
    {
      id: 5,
      name: "Evening Wind Down Yoga",
      duration: 20,
      difficulty: "Easy",
      calories: 60,
      icon: Moon,
      benefits: ["Relaxation", "Better sleep", "Stress relief"],
      steps: [
        "Child's pose - 2 minutes",
        "Seated forward bend - 2 minutes",
        "Supine twist - 1 minute each side",
        "Legs up the wall - 5 minutes",
        "Corpse pose - 5 minutes",
      ],
      bestTime: "Evening",
      category: "Relaxation",
    },
    {
      id: 6,
      name: "Full Body Workout",
      duration: 25,
      difficulty: "Hard",
      calories: 200,
      icon: Dumbbell,
      benefits: ["Muscle building", "Fat loss", "Overall fitness"],
      steps: [
        "Warm up - 3 minutes",
        "Push-ups - 15 reps",
        "Squats - 20 reps",
        "Lunges - 15 each leg",
        "Plank - 45 seconds",
        "Jump rope - 2 minutes",
        "Rest - 1 minute",
        "Repeat circuit 2 times",
      ],
      bestTime: "Morning/Evening",
      category: "Full Body",
    },
  ];

  const mentalHacks = [
    {
      id: 7,
      name: "Mindful Meditation",
      duration: 10,
      difficulty: "Easy",
      icon: Brain,
      benefits: ["Reduce anxiety", "Mental clarity", "Emotional balance"],
      steps: [
        "Sit comfortably with closed eyes",
        "Focus on your breath - 2 minutes",
        "Body scan from head to toe - 3 minutes",
        "Observe thoughts without judgment - 3 minutes",
        "Gradually return awareness - 2 minutes",
      ],
      bestTime: "Morning/Evening",
      category: "Meditation",
      mentalBoost: "Reduces stress by 40%",
    },
    {
      id: 8,
      name: "Breathing Exercise (4-7-8)",
      duration: 5,
      difficulty: "Easy",
      icon: Wind,
      benefits: ["Anxiety relief", "Better sleep", "Calm mind"],
      steps: [
        "Exhale completely through mouth",
        "Inhale through nose for 4 counts",
        "Hold breath for 7 counts",
        "Exhale through mouth for 8 counts",
        "Repeat cycle 4 times",
      ],
      bestTime: "Anytime",
      category: "Breathing",
      mentalBoost: "Instant calm",
    },
    {
      id: 9,
      name: "Gratitude Journaling",
      duration: 10,
      difficulty: "Easy",
      icon: Heart,
      benefits: ["Positive mindset", "Better mood", "Life satisfaction"],
      steps: [
        "List 3 things you're grateful for today",
        "Write about one positive experience",
        "Note one person who made you smile",
        "Describe how you helped someone",
        "Set one positive intention for tomorrow",
      ],
      bestTime: "Evening",
      category: "Mindfulness",
      mentalBoost: "Increases happiness by 25%",
    },
    {
      id: 10,
      name: "Power Visualization",
      duration: 8,
      difficulty: "Easy",
      icon: Target,
      benefits: ["Goal clarity", "Motivation", "Confidence"],
      steps: [
        "Find a quiet space and relax",
        "Close eyes and breathe deeply",
        "Visualize your goal in detail - 3 minutes",
        "Feel the emotions of achieving it",
        "Affirm your capability - 2 minutes",
      ],
      bestTime: "Morning",
      category: "Motivation",
      mentalBoost: "Boosts confidence",
    },
    {
      id: 11,
      name: "Digital Detox Break",
      duration: 15,
      difficulty: "Medium",
      icon: Moon,
      benefits: ["Reduced screen fatigue", "Better focus", "Eye health"],
      steps: [
        "Turn off all devices",
        "Step outside or look at nature",
        "Do light stretching or walk",
        "Practice mindful observation",
        "Return with refreshed mind",
      ],
      bestTime: "Afternoon",
      category: "Recovery",
      mentalBoost: "Improves focus by 30%",
    },
    {
      id: 12,
      name: "Progressive Muscle Relaxation",
      duration: 12,
      difficulty: "Easy",
      icon: Zap,
      benefits: ["Release tension", "Better sleep", "Stress relief"],
      steps: [
        "Lie down comfortably",
        "Tense face muscles, then release - 30 seconds",
        "Tense shoulders and arms, release - 30 seconds",
        "Tense stomach, release - 30 seconds",
        "Tense legs and feet, release - 30 seconds",
        "Full body relaxation - 8 minutes",
      ],
      bestTime: "Evening",
      category: "Relaxation",
      mentalBoost: "Deep relaxation",
    },
  ];

  const allExercises =
    activeTab === "physical" ? physicalExercises : mentalHacks;

  useEffect(() => {
    let interval;
    if (isTimerRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            handleTimerComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeRemaining]);

  const startTimer = (exercise) => {
    setActiveTimer(exercise.id);
    setTimeRemaining(exercise.duration * 60);
    setIsTimerRunning(true);
  };

  const pauseTimer = () => {
    setIsTimerRunning(false);
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    setActiveTimer(null);
    setTimeRemaining(0);
  };

  const handleTimerComplete = () => {
    if (!completedExercises.includes(activeTimer)) {
      setCompletedExercises((prev) => [...prev, activeTimer]);
      setShowCongrats(true);
      setTimeout(() => setShowCongrats(false), 3000);
    }
    resetTimer();
  };

  const toggleComplete = (id) => {
    setCompletedExercises((prev) =>
      prev.includes(id) ? prev.filter((eid) => eid !== id) : [...prev, id]
    );
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getTotalTime = () => {
    return allExercises.reduce((total, ex) => total + ex.duration, 0);
  };

  const getCompletedTime = () => {
    return allExercises
      .filter((ex) => completedExercises.includes(ex.id))
      .reduce((total, ex) => total + ex.duration, 0);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-700";
      case "Medium":
        return "bg-yellow-100 text-yellow-700";
      case "Hard":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 mt-20">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-orange-500 via-red-500 to-yellow-500 p-3 rounded-2xl shadow-lg">
                <Heart className="text-neutral-700" size={36} />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  Daily Wellness Hub
                </h1>
                <p className="text-gray-600 font-medium">
                  Your journey to better health starts here
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-orange-100 to-red-100 px-6 py-4 rounded-2xl shadow-md">
              <div className="text-center">
                <Calendar className="mx-auto text-orange-600 mb-2" size={32} />
                <p className="text-sm text-gray-600">Daily Progress</p>
                <p className="text-2xl font-bold text-orange-600">
                  {completedExercises.length}/{allExercises.length}
                </p>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab("physical")}
              className={`flex-1 flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
                activeTab === "physical"
                  ? "bg-gradient-to-r from-orange-500 to-red-500 text-neutral-700 shadow-xl scale-105"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Dumbbell size={24} />
              Physical Exercises
            </button>
            <button
              onClick={() => setActiveTab("mental")}
              className={`flex-1 flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
                activeTab === "mental"
                  ? "bg-gradient-to-r from-red-500 to-yellow-500 text-neutral-700 shadow-xl scale-105"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Brain size={24} />
              Mental Health Hacks
            </button>
          </div>
        </div>
      </header>

      {/* Stats Bar */}
      <div className="bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 text-neutral-700 py-6 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-4 text-center">
            <Timer size={32} className="mx-auto mb-2" />
            <p className="text-sm opacity-90">Total Time Available</p>
            <p className="text-3xl font-bold">{getTotalTime()} mins</p>
          </div>
          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-4 text-center">
            <TrendingUp size={32} className="mx-auto mb-2" />
            <p className="text-sm opacity-90">Time Completed</p>
            <p className="text-3xl font-bold">{getCompletedTime()} mins</p>
          </div>
          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-4 text-center">
            <Award size={32} className="mx-auto mb-2" />
            <p className="text-sm opacity-90">Completion Rate</p>
            <p className="text-3xl font-bold">
              {allExercises.length > 0
                ? Math.round(
                    (completedExercises.length / allExercises.length) * 100
                  )
                : 0}
              %
            </p>
          </div>
        </div>
      </div>

      {/* Exercises Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {activeTab === "physical"
              ? "Physical Exercises"
              : "Mental Health Practices"}
          </h2>
          <p className="text-gray-600 text-lg">
            {activeTab === "physical"
              ? "Build strength, flexibility, and stamina with these exercises"
              : "Improve your mental wellbeing with these daily practices"}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {allExercises.map((exercise) => {
            const Icon = exercise.icon;
            const isCompleted = completedExercises.includes(exercise.id);
            const isActive = activeTimer === exercise.id;

            return (
              <div
                key={exercise.id}
                className={`bg-white rounded-3xl shadow-xl overflow-hidden border-4 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 ${
                  isCompleted
                    ? "border-green-400 bg-green-50"
                    : "border-transparent"
                }`}
              >
                {/* Exercise Header */}
                <div
                  className={`p-6 ${
                    activeTab === "physical"
                      ? "bg-gradient-to-r from-orange-500 to-red-500"
                      : "bg-gradient-to-r from-red-500 to-yellow-500"
                  } text-neutral-700 relative`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-white bg-opacity-20 p-3 rounded-2xl backdrop-blur-sm">
                        <Icon size={32} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-1">
                          {exercise.name}
                        </h3>
                        <div className="flex items-center gap-3 flex-wrap">
                          <span className="bg-white bg-opacity-30 px-3 py-1 rounded-full text-sm font-semibold text-gray-800">
                            ⏱️ {exercise.duration} mins
                          </span>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${getDifficultyColor(
                              exercise.difficulty
                            )}`}
                          >
                            {exercise.difficulty}
                          </span>
                          <span className="bg-white bg-opacity-30 px-3 py-1 rounded-full text-sm font-semibold text-gray-800">
                            📍 {exercise.bestTime}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleComplete(exercise.id)}
                      className={`p-3 rounded-full transition-all duration-300 ${
                        isCompleted
                          ? "bg-green-500 scale-110"
                          : "bg-white bg-opacity-20 hover:bg-opacity-30"
                      }`}
                    >
                      <Check
                        size={24}
                        className={
                          isCompleted
                            ? "animate-bounce text-neutral-700"
                            : "text-neutral-700"
                        }
                      />
                    </button>
                  </div>

                  {activeTab === "physical" && (
                    <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-3">
                      <p className="text-sm font-semibold">
                        🔥 Burns ~{exercise.calories} calories | 💪{" "}
                        {exercise.category}
                      </p>
                    </div>
                  )}
                  {activeTab === "mental" && (
                    <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-3">
                      <p className="text-sm font-semibold">
                        🧠 {exercise.mentalBoost} | 🏷️ {exercise.category}
                      </p>
                    </div>
                  )}
                </div>

                {/* Exercise Content */}
                <div className="p-6 space-y-6">
                  {/* Benefits */}
                  <div>
                    <h4 className="font-bold text-gray-800 mb-3 text-lg flex items-center gap-2">
                      <Award className="text-orange-600" size={20} />
                      Benefits
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {exercise.benefits.map((benefit, idx) => (
                        <span
                          key={idx}
                          className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold"
                        >
                          ✓ {benefit}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Steps */}
                  <div>
                    <h4 className="font-bold text-gray-800 mb-3 text-lg flex items-center gap-2">
                      <Target className="text-red-600" size={20} />
                      Steps to Follow
                    </h4>
                    <div className="space-y-2">
                      {exercise.steps.map((step, idx) => (
                        <div
                          key={idx}
                          className="flex gap-3 items-start bg-gray-50 p-3 rounded-xl"
                        >
                          <span className="bg-gradient-to-br from-orange-500 to-red-500 text-neutral-700 font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                            {idx + 1}
                          </span>
                          <p className="text-gray-800 font-medium">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Timer Controls */}
                  <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-2xl border-2 border-orange-200">
                    {isActive && (
                      <div className="text-center mb-6">
                        <div className="text-6xl font-bold text-orange-700 mb-2">
                          {formatTime(timeRemaining)}
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-orange-500 to-red-500 h-full transition-all duration-1000"
                            style={{
                              width: `${
                                ((exercise.duration * 60 - timeRemaining) /
                                  (exercise.duration * 60)) *
                                100
                              }%`,
                            }}
                          />
                        </div>
                      </div>
                    )}

                    <div className="flex gap-3">
                      {!isActive ? (
                        <button
                          onClick={() => startTimer(exercise)}
                          className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-neutral-700 py-4 rounded-2xl font-bold text-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 hover:scale-105"
                        >
                          <Play size={24} />
                          Start Timer
                        </button>
                      ) : (
                        <>
                          <button
                            onClick={
                              isTimerRunning
                                ? pauseTimer
                                : () => setIsTimerRunning(true)
                            }
                            className="flex-1 bg-gradient-to-r from-red-500 to-yellow-500 text-neutral-700 py-4 rounded-2xl font-bold text-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
                          >
                            {isTimerRunning ? (
                              <Pause size={24} />
                            ) : (
                              <Play size={24} />
                            )}
                            {isTimerRunning ? "Pause" : "Resume"}
                          </button>
                          <button
                            onClick={resetTimer}
                            className="bg-red-500 text-neutral-700 py-4 px-6 rounded-2xl font-bold text-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                          >
                            <RotateCcw size={24} />
                            Reset
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Congratulations Modal */}
      {showCongrats && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-10 shadow-2xl text-center max-w-md animate-bounce-in">
            <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-full w-28 h-28 flex items-center justify-center mx-auto mb-6">
              <Award size={64} className="text-green-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-3">
              Congratulations! 🎉
            </h3>
            <p className="text-gray-600 text-lg mb-2">
              You completed this exercise!
            </p>
            <p className="text-orange-600 font-semibold">
              Keep up the great work!
            </p>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes bounce-in {
          0% {
            transform: scale(0.3);
            opacity: 0;
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-bounce-in {
          animation: bounce-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default WellnessHub;
