import React, { useState, useMemo, useCallback } from "react";

// Mock Data
const MOCK_HOSPITALS = [
  {
    name: "CMC Christian Medical College",
    location: "Garhshankar, Punjab",
    distance: "2.3 km",
    rating: 4.5,
    waitTime: "15 mins",
    beds: 450,
    satisfaction: "92%",
    insurance: "CGHS, ESI, Cashless",
    specialties: ["Cardiology", "Orthopedics", "Emergency Care"],
  },
  {
    name: "Civil Hospital Garhshankar",
    location: "Garhshankar, Punjab",
    distance: "3.5 km",
    rating: 4.2,
    waitTime: "25 mins",
    beds: 200,
    satisfaction: "85%",
    insurance: "Government Schemes",
    specialties: ["General Medicine", "Emergency Care", "Maternity"],
  },
  {
    name: "Fortis Hospital",
    location: "Ludhiana, Punjab",
    distance: "45 km",
    rating: 4.8,
    waitTime: "10 mins",
    beds: 520,
    satisfaction: "95%",
    insurance: "All major plans",
    specialties: ["Neurology", "Pediatrics", "Cancer Care"],
  },
  {
    name: "Dayanand Medical College & Hospital",
    location: "Ludhiana, Punjab",
    distance: "48 km",
    rating: 4.7,
    waitTime: "12 mins",
    beds: 600,
    satisfaction: "94%",
    insurance: "CGHS, ESI, Mediclaim",
    specialties: ["Cardiology", "Neurology", "Surgery"],
  },
  {
    name: "SPS Apollo Hospital",
    location: "Ludhiana, Punjab",
    distance: "46 km",
    rating: 4.6,
    waitTime: "15 mins",
    beds: 250,
    satisfaction: "91%",
    insurance: "Cashless, Mediclaim, ESI",
    specialties: ["Orthopedics", "Emergency Care", "Gynecology"],
  },
  {
    name: "Deepak Hospital",
    location: "Ludhiana, Punjab",
    distance: "47 km",
    rating: 4.4,
    waitTime: "18 mins",
    beds: 180,
    satisfaction: "88%",
    insurance: "ESI, Cashless",
    specialties: ["General Surgery", "Pediatrics", "Maternity"],
  },
  {
    name: "Guru Nanak Mission Hospital",
    location: "Ludhiana, Punjab",
    distance: "44 km",
    rating: 4.3,
    waitTime: "20 mins",
    beds: 150,
    satisfaction: "87%",
    insurance: "CGHS, ESI",
    specialties: ["Cardiology", "Orthopedics", "Emergency Care"],
  },
  {
    name: "Manipal Hospital",
    location: "Ludhiana, Punjab",
    distance: "46 km",
    rating: 4.7,
    waitTime: "12 mins",
    beds: 320,
    satisfaction: "93%",
    insurance: "All major plans",
    specialties: ["Cancer Care", "Neurology", "Cardiology"],
  },
  {
    name: "Civil Hospital Khanna",
    location: "Khanna, Punjab",
    distance: "28 km",
    rating: 4.0,
    waitTime: "30 mins",
    beds: 150,
    satisfaction: "82%",
    insurance: "Government Schemes",
    specialties: ["General Medicine", "Emergency Care", "Pediatrics"],
  },
  {
    name: "Max Hospital Khanna",
    location: "Khanna, Punjab",
    distance: "27 km",
    rating: 4.3,
    waitTime: "20 mins",
    beds: 120,
    satisfaction: "86%",
    insurance: "ESI, Cashless, Mediclaim",
    specialties: ["Orthopedics", "Maternity", "Surgery"],
  },
  {
    name: "Satguru Partap Singh Hospital",
    location: "Khanna, Punjab",
    distance: "29 km",
    rating: 4.2,
    waitTime: "22 mins",
    beds: 100,
    satisfaction: "85%",
    insurance: "CGHS, ESI",
    specialties: ["General Medicine", "Emergency Care", "Cardiology"],
  },
  {
    name: "Khanna Eye Hospital",
    location: "Khanna, Punjab",
    distance: "28 km",
    rating: 4.5,
    waitTime: "15 mins",
    beds: 80,
    satisfaction: "90%",
    insurance: "Cashless, ESI",
    specialties: ["Ophthalmology", "Eye Surgery", "Emergency Care"],
  },
  {
    name: "Ivy Hospital",
    location: "Jalandhar, Punjab",
    distance: "52 km",
    rating: 4.7,
    waitTime: "14 mins",
    beds: 350,
    satisfaction: "93%",
    insurance: "All major plans",
    specialties: ["Cardiology", "Neurology", "Oncology"],
  },
  {
    name: "Tagore Hospital",
    location: "Jalandhar, Punjab",
    distance: "53 km",
    rating: 4.4,
    waitTime: "18 mins",
    beds: 200,
    satisfaction: "89%",
    insurance: "CGHS, ESI, Mediclaim",
    specialties: ["Orthopedics", "Pediatrics", "General Surgery"],
  },
  {
    name: "Innocent Hearts Hospital",
    location: "Jalandhar, Punjab",
    distance: "51 km",
    rating: 4.3,
    waitTime: "20 mins",
    beds: 180,
    satisfaction: "87%",
    insurance: "ESI, Cashless",
    specialties: ["Maternity", "Pediatrics", "Emergency Care"],
  },
  {
    name: "Jalandhar Civil Hospital",
    location: "Jalandhar, Punjab",
    distance: "54 km",
    rating: 4.1,
    waitTime: "28 mins",
    beds: 300,
    satisfaction: "84%",
    insurance: "Government Schemes",
    specialties: ["General Medicine", "Emergency Care", "Surgery"],
  },
  {
    name: "PGIMER (Post Graduate Institute)",
    location: "Chandigarh",
    distance: "95 km",
    rating: 4.9,
    waitTime: "8 mins",
    beds: 1800,
    satisfaction: "98%",
    insurance: "CGHS, ESI, All major plans",
    specialties: ["All Specialties", "Research", "Advanced Surgery"],
  },
  {
    name: "Fortis Hospital Mohali",
    location: "Chandigarh (Mohali)",
    distance: "92 km",
    rating: 4.8,
    waitTime: "10 mins",
    beds: 355,
    satisfaction: "96%",
    insurance: "All major plans",
    specialties: ["Cardiology", "Neurology", "Cancer Care"],
  },
  {
    name: "Max Super Speciality Hospital",
    location: "Chandigarh (Mohali)",
    distance: "94 km",
    rating: 4.8,
    waitTime: "10 mins",
    beds: 350,
    satisfaction: "95%",
    insurance: "All major plans",
    specialties: ["Orthopedics", "Oncology", "Cardiology"],
  },
  {
    name: "Government Multi Specialty Hospital",
    location: "Chandigarh (Sector 16)",
    distance: "96 km",
    rating: 4.5,
    waitTime: "20 mins",
    beds: 500,
    satisfaction: "90%",
    insurance: "Government Schemes, CGHS",
    specialties: ["General Medicine", "Surgery", "Emergency Care"],
  },
];

const HospitalCard = ({ hospital, isSelected, onToggleCompare }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border-2 border-gray-100 hover:border-orange-300 transform hover:-translate-y-1 pt-8">
      <div className="mb-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2 leading-tight">
          {hospital.name}
        </h3>
        <span className="text-sm text-gray-600 flex items-center">
          <span className="mr-1">📍</span>
          <span>{hospital.location}</span>
          <span className="mx-2">•</span>
          <span className="font-medium text-orange-600">
            {hospital.distance}
          </span>
        </span>
        <div className="inline-flex items-center bg-yellow-50 px-3 py-1 rounded-full border border-yellow-200">
          <span className="text-yellow-500 mr-1">⭐</span>
          <span className="font-bold text-yellow-600">{hospital.rating}</span>
          <span className="text-yellow-600 text-sm ml-1">/ 5.0</span>
        </div>
      </div>

      <div className="space-y-3 mb-5">
        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <span className="text-sm text-gray-600 flex items-center">
            <span className="mr-2">⏱️</span>
            Avg. Wait Time
          </span>
          <span className="font-semibold text-gray-800">
            {hospital.waitTime}
          </span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <span className="text-sm text-gray-600 flex items-center">
            <span className="mr-2">🛏️</span>
            Total Beds
          </span>
          <span className="font-semibold text-gray-800">{hospital.beds}</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <span className="text-sm text-gray-600 flex items-center">
            <span className="mr-2">😊</span>
            Satisfaction
          </span>
          <span className="font-semibold text-green-600">
            {hospital.satisfaction}
          </span>
        </div>
        <div className="flex justify-between items-start py-2">
          <span className="text-sm text-gray-600 flex items-center">
            <span className="mr-2">💳</span>
            Insurance
          </span>
          <span className="font-semibold text-gray-800 text-right text-sm max-w-xs">
            {hospital.insurance}
          </span>
        </div>
      </div>

      <div className="mb-5 pb-5 border-b border-gray-100">
        <div className="flex items-center mb-3">
          <span className="text-sm font-bold text-gray-700">
            🏥 Specialties
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {hospital.specialties.map((s, index) => (
            <span
              key={index}
              className="bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 px-3 py-1.5 rounded-lg text-xs font-semibold border border-orange-200 hover:from-orange-200 hover:to-red-200 transition-colors duration-200"
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      <button
        className={`w-full py-3 px-4 rounded-xl font-bold text-sm tracking-wide transition-all duration-300 transform active:scale-95 shadow-md hover:shadow-lg ${
          isSelected
            ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600"
            : "bg-gradient-to-r from-orange-600 to-red-600 text-white hover:from-orange-700 hover:to-red-700"
        }`}
        onClick={() => onToggleCompare(hospital)}
      >
        {isSelected ? "✓ Selected for Comparison" : "+ Add to Compare"}
      </button>
    </div>
  );
};

const FilterControls = ({ filters, onFilterChange, resultCount }) => (
  <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
    <div className="flex items-center mb-6">
      <span className="text-2xl mr-3">🔍</span>
      <h2 className="text-2xl font-bold text-gray-800">Filter Hospitals</h2>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div>
        <label
          htmlFor="locationFilter"
          className="block text-sm font-bold text-gray-700 mb-3 flex items-center"
        >
          <span className="mr-2">📍</span>
          Location or Hospital Name
        </label>
        <input
          type="text"
          id="locationFilter"
          placeholder="e.g., Ludhiana, Fortis..."
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-400"
          value={filters.location}
          onChange={(e) => onFilterChange("location", e.target.value)}
        />
      </div>
      <div>
        <label
          htmlFor="specialtyFilter"
          className="block text-sm font-bold text-gray-700 mb-3 flex items-center"
        >
          <span className="mr-2">🏥</span>
          Specialty
        </label>
        <select
          id="specialtyFilter"
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-gray-700 bg-white cursor-pointer"
          value={filters.specialty}
          onChange={(e) => onFilterChange("specialty", e.target.value)}
        >
          <option value="">All Specialties</option>
          <option value="Cardiology">Cardiology</option>
          <option value="Orthopedics">Orthopedics</option>
          <option value="Neurology">Neurology</option>
          <option value="Pediatrics">Pediatrics</option>
          <option value="Cancer Care">Cancer Care</option>
          <option value="Maternity">Maternity</option>
          <option value="Emergency Care">Emergency Care</option>
          <option value="General Medicine">General Medicine</option>
          <option value="Surgery">Surgery</option>
        </select>
      </div>
      <div>
        <label
          htmlFor="ratingFilter"
          className="block text-sm font-bold text-gray-700 mb-3 flex items-center"
        >
          <span className="mr-2">⭐</span>
          Minimum Rating
        </label>
        <select
          id="ratingFilter"
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-700 bg-white cursor-pointer"
          value={filters.minRating}
          onChange={(e) =>
            onFilterChange("minRating", parseFloat(e.target.value))
          }
        >
          <option value="0">All Ratings</option>
          <option value="3">3+ Stars</option>
          <option value="4">4+ Stars</option>
          <option value="4.5">4.5+ Stars</option>
        </select>
      </div>
    </div>

    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
      <div className="text-sm font-semibold text-gray-600">
        <span className="inline-flex items-center bg-orange-100 text-orange-700 px-4 py-2 rounded-lg border border-orange-200">
          <span className="mr-2">📊</span>
          Showing <span className="font-bold mx-1">{resultCount}</span> hospital
          {resultCount !== 1 ? "s" : ""}
        </span>
      </div>
      {(filters.location || filters.specialty || filters.minRating > 0) && (
        <button
          onClick={() => onFilterChange("reset", null)}
          className="text-sm font-semibold text-orange-600 hover:text-orange-800 transition-colors duration-200 flex items-center"
        >
          <span className="mr-1">🔄</span>
          Reset Filters
        </button>
      )}
    </div>
  </div>
);

const ComparisonBar = ({ selectedCount, onViewComparison, onClearAll }) => {
  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-orange-600 via-orange-700 to-red-600 shadow-2xl z-50 transform transition-all duration-300 border-t-4 border-orange-400">
      <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center">
          <span className="text-white font-bold text-lg flex items-center">
            <span className="bg-white text-orange-600 rounded-full w-8 h-8 flex items-center justify-center mr-3 font-bold">
              {selectedCount}
            </span>
            hospital{selectedCount !== 1 ? "s" : ""} selected for comparison
          </span>
        </div>
        <div className="flex gap-3">
          <button
            className="bg-white text-orange-600 px-6 py-2.5 rounded-xl font-bold hover:bg-gray-100 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 flex items-center"
            onClick={onClearAll}
          >
            <span className="mr-2">✕</span>
            Clear All
          </button>
          <button
            className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-2.5 rounded-xl font-bold hover:from-green-600 hover:to-emerald-600 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 flex items-center"
            onClick={onViewComparison}
          >
            <span className="mr-2">📊</span>
            View Comparison
          </button>
        </div>
      </div>
    </div>
  );
};

const ComparisonModal = ({ selectedHospitals, onClose }) => {
  if (selectedHospitals.length === 0) return null;

  const criteria = [
    { label: "Location", key: "location", icon: "📍" },
    { label: "Distance", key: "distance", icon: "🚗" },
    {
      label: "Rating",
      key: "rating",
      icon: "⭐",
      formatter: (r) => `${r} / 5.0`,
    },
    { label: "Avg. Wait Time", key: "waitTime", icon: "⏱️" },
    { label: "Total Beds", key: "beds", icon: "🛏️" },
    { label: "Patient Satisfaction", key: "satisfaction", icon: "😊" },
    { label: "Insurance", key: "insurance", icon: "💳" },
    {
      label: "Specialties",
      key: "specialties",
      icon: "🏥",
      formatter: (s) => s.join(", "),
    },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 overflow-y-auto p-4 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl p-8 my-8 border-2 border-orange-100">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent flex items-center">
              <span className="mr-3">📊</span>
              Hospital Comparison
            </h2>
            <p className="text-gray-600 mt-2">
              Compare {selectedHospitals.length} hospital
              {selectedHospitals.length !== 1 ? "s" : ""} side by side
            </p>
          </div>
          <button
            onClick={onClose}
            className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-xl font-bold hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 flex items-center"
          >
            <span className="mr-2">✕</span>
            Close
          </button>
        </div>

        <div className="overflow-x-auto rounded-2xl shadow-lg border border-gray-200">
          <table className="w-full border-collapse bg-white">
            <thead>
              <tr className="bg-gradient-to-r from-orange-600 via-orange-700 to-red-600 text-white">
                <th className="p-5 text-left border-r border-orange-400 font-bold text-lg sticky left-0 bg-orange-700 z-10">
                  Criteria
                </th>
                {selectedHospitals.map((h, idx) => (
                  <th
                    key={h.name}
                    className={`p-5 text-left font-bold text-base ${
                      idx < selectedHospitals.length - 1
                        ? "border-r border-orange-400"
                        : ""
                    }`}
                  >
                    {h.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {criteria.map((item, index) => (
                <tr
                  key={item.key}
                  className={`${
                    index % 2 === 1 ? "bg-gray-50" : "bg-white"
                  } hover:bg-orange-50 transition-colors duration-150`}
                >
                  <td className="p-5 font-bold text-gray-700 border-r border-gray-200 sticky left-0 bg-inherit z-10">
                    <span className="flex items-center">
                      <span className="mr-2">{item.icon}</span>
                      {item.label}
                    </span>
                  </td>
                  {selectedHospitals.map((h, idx) => (
                    <td
                      key={`${h.name}-${item.key}`}
                      className={`p-5 text-gray-700 ${
                        idx < selectedHospitals.length - 1
                          ? "border-r border-gray-200"
                          : ""
                      }`}
                    >
                      <div
                        className={
                          item.key === "rating"
                            ? "font-bold text-yellow-600"
                            : item.key === "satisfaction"
                            ? "font-bold text-green-600"
                            : ""
                        }
                      >
                        {item.formatter
                          ? item.formatter(h[item.key])
                          : h[item.key]}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
          <p className="text-sm text-blue-800 flex items-center">
            <span className="mr-2">💡</span>
            <span>
              <strong>Tip:</strong> Use this comparison to make an informed
              decision based on your priorities like distance, rating, and
              available specialties.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default function HospitalCompareHub() {
  const [filters, setFilters] = useState({
    location: "",
    specialty: "",
    minRating: 0,
  });
  const [selectedHospitals, setSelectedHospitals] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFilterChange = useCallback((key, value) => {
    if (key === "reset") {
      setFilters({ location: "", specialty: "", minRating: 0 });
    } else {
      setFilters((prev) => ({ ...prev, [key]: value }));
    }
  }, []);

  const toggleCompare = useCallback((hospital) => {
    setSelectedHospitals((prevSelected) => {
      const isSelected = prevSelected.some((h) => h.name === hospital.name);
      if (isSelected) {
        return prevSelected.filter((h) => h.name !== hospital.name);
      } else {
        if (prevSelected.length >= 5) {
          alert(
            "⚠️ You can compare up to 5 hospitals at a time. Please remove a hospital before adding another."
          );
          return prevSelected;
        }
        return [...prevSelected, hospital];
      }
    });
  }, []);

  const clearAllSelections = useCallback(() => {
    setSelectedHospitals([]);
  }, []);

  const filteredHospitals = useMemo(() => {
    const locationLower = filters.location.toLowerCase();
    const minRating = filters.minRating;

    return MOCK_HOSPITALS.filter((hospital) => {
      const matchLocation =
        !locationLower ||
        hospital.location.toLowerCase().includes(locationLower) ||
        hospital.name.toLowerCase().includes(locationLower);

      const matchSpecialty =
        !filters.specialty || hospital.specialties.includes(filters.specialty);

      const matchRating = hospital.rating >= minRating;

      return matchLocation && matchSpecialty && matchRating;
    });
  }, [filters]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 py-8 pb-32">
        <header className="text-center mb-10">
          <div className="inline-block mb-4 bg-white rounded-full px-6 py-2 shadow-md border border-orange-200">
            <span className="text-orange-600 font-semibold text-sm">
              🏥 Healthcare Comparison Tool
            </span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-black mb-4">
            <span className="bg-gradient-to-r from-orange-600 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Review and Comparison Engine
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find and compare the best hospitals in Punjab for your healthcare
            needs
          </p>
        </header>

        <FilterControls
          filters={filters}
          onFilterChange={handleFilterChange}
          resultCount={filteredHospitals.length}
        />

        {filteredHospitals.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              No hospitals found
            </h3>
            <p className="text-gray-600 mb-6">
              No hospitals match your current filter criteria.
            </p>
            <button
              onClick={() => handleFilterChange("reset", null)}
              className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-3 rounded-xl font-bold hover:from-orange-700 hover:to-red-700 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHospitals.map((hospital) => (
              <HospitalCard
                key={hospital.name}
                hospital={hospital}
                isSelected={selectedHospitals.some(
                  (h) => h.name === hospital.name
                )}
                onToggleCompare={toggleCompare}
              />
            ))}
          </div>
        )}
      </div>

      <ComparisonBar
        selectedCount={selectedHospitals.length}
        onViewComparison={() => setIsModalOpen(true)}
        onClearAll={clearAllSelections}
      />

      {isModalOpen && (
        <ComparisonModal
          selectedHospitals={selectedHospitals}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
