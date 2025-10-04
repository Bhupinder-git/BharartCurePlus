import React from "react";
import { useNavigate } from "react-router-dom";
import { Radio, MessageSquare, Droplet, Search, Sparkles } from "lucide-react";

export default function FeatureSection() {
  const navigate = useNavigate();
  const features = [
    {
      icon: <Radio className="w-8 h-8 stroke-black" />,
      title: "Live Resource Tracker",
      description:
        "Real-time updates on bed, ventilator accessible with a single click.",
      color: "bg-pink-100",
      clickable: true,
      onClick: () => navigate("/live-resource-tracker"),
    },

    {
      icon: <Droplet className="w-8 h-8 fill-red-500 stroke-black" />,
      title: "Urgent Blood Alerts",
      description:
        "Location-based notifications to donors and hospitals for critical blood requests",
      color: "bg-pink-100",
      clickable: true,
      onClick: () => navigate("/blood-urgent-alerts"),
    },
    {
      icon: <Search className="w-8 h-8 stroke-black" />,
      title: "Review & Comparison Engine",
      description:
        "Review & Comparison Engine Crowdsourced and verified insights to help users choose hospitals and doctors confidently.",
      color: "bg-pink-100",
      clickable: true,
      onClick: () => navigate("/hospital-comparison"),
    },
    {
      icon: <Sparkles className="w-8 h-8 stroke-black" />,
      title: "SkinCare Routine Planner",
      description:
        "Personalized skincare routines with product recommendations, diet plans, and weekly usage tracking for healthy glowing skin.",
      color: "bg-pink-100",
      clickable: true,
      onClick: () => navigate("/skincare-routine-planner"),
    },
  ];

  const handleFeatureClick = (feature) => {
    if (feature.clickable && feature.onClick) {
      feature.onClick();
    }
  };

  return (
    <div id="features-section" className="bg-white py-16 px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <h2 className="text-5xl font-black text-gray-900">OUR FEATURES</h2>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`border-4 border-slate-200 rounded-2xl p-6 hover:shadow-xl hover:scale-[1.10] transition-all duration-400 ${
                feature.clickable
                  ? "cursor-pointer hover:border-orange-300"
                  : ""
              }`}
              onClick={() => handleFeatureClick(feature)}
            >
              <div className="flex flex-col items-start gap-4">
                <div
                  className={`${feature.color} p-3 rounded-lg border-2 border-black flex-shrink-0`}
                >
                  {feature.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {feature.title}
                    {feature.clickable && (
                      <span className="ml-2 text-orange-600">→</span>
                    )}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {feature.description}
                  </p>
                  {feature.clickable && (
                    <p className="text-orange-600 font-semibold text-sm mt-2">
                      Click to explore →
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
