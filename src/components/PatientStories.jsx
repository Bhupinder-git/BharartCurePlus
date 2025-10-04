import React from "react";
import { Star, User } from "lucide-react";
import Patient1 from "../assets/PatientPics/Patient1.jpeg";
import Patient2 from "../assets/PatientPics/Patient2.jpeg";
import Patient3 from "../assets/PatientPics/Patient3.jpeg";

export default function PatientStories() {
  const reviews = [
    {
      id: 1,
      text: "Bharat Cure+ saved my life during a critical medical emergency.",
      name: "Bhawya Kumar",
      role: "Patient, Ludhiana",
      avatar: Patient1,
      rating: 4,
    },
    {
      id: 2,
      text: "The AI chatbot provided instant guidance when I needed help most.",
      name: "Nadia Ansari",
      role: "Caregiver, J&K",
      avatar: Patient2,
      rating: 4.5,
    },
    {
      id: 3,
      text: "Transparent cost comparisons helped me make the right medical choice.",
      name: "Priya Sharma",
      role: "Patient, Delhi",
      avatar: Patient3,
      rating: 3.5,
    },
  ];

  const StarRating = ({ rating }) => (
    <div className="flex gap-2 mb-4 justify-center">
      {[...Array(5)].map((_, i) => {
        const starValue = i + 1;
        if (starValue <= rating) {
          return (
            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
          );
        } else if (starValue - 0.5 === rating) {
          return (
            <div key={i} className="relative w-5 h-5">
              <Star className="w-5 h-5 fill-gray-300 text-gray-300 absolute" />
              <div className="overflow-hidden w-1/2 absolute">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              </div>
            </div>
          );
        } else {
          return (
            <Star key={i} className="w-5 h-5 fill-gray-300 text-gray-300" />
          );
        }
      })}
    </div>
  );

  return (
    <div className="bg-slate-100 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Patients
          </h1>
          <p className="text-gray-600 text-lg">
            Real experiences from people who found critical support
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-3 gap-10">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl p-6 border-2 border-slate-700 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <StarRating rating={review.rating} />
              <p className="text-gray-700 md:text-[22px] mb-6 leading-relaxed">
                "{review.text}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-orange-400 to-pink-400 flex items-center justify-center">
                  {review.avatar ? (
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-6 h-6 text-white" />
                  )}
                </div>
                <div>
                  <p className="font-semibold md:text-[20px] text-gray-900">
                    {review.name}
                  </p>
                  <p className="text-sm text-gray-600">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
