import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import {
  Bed,
  Wind,
  Phone,
  MapPin,
  X,
  CheckCircle,
  XCircle,
} from "lucide-react";

const HospitalTracker = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [hospitals, setHospitals] = useState([
    {
      id: 1,
      name: "Dayanand Medical College & Hospital",
      location: "Ludhiana, Punjab",
      beds: Array(200)
        .fill(null)
        .map((_, i) => ({ id: i + 1, occupied: i < 145 })),
      ventilators: Array(50)
        .fill(null)
        .map((_, i) => ({ id: i + 1, occupied: i < 38 })),
      phone: "+91-161-2302029",
    },
    {
      id: 2,
      name: "Christian Medical College",
      location: "Ludhiana, Punjab",
      beds: Array(150)
        .fill(null)
        .map((_, i) => ({ id: i + 1, occupied: i < 148 })),
      ventilators: Array(30)
        .fill(null)
        .map((_, i) => ({ id: i + 1, occupied: i < 29 })),
      phone: "+91-161-2628284",
    },
    {
      id: 3,
      name: "Ivy Hospital",
      location: "Jalandhar, Punjab",
      beds: Array(180)
        .fill(null)
        .map((_, i) => ({ id: i + 1, occupied: i < 92 })),
      ventilators: Array(40)
        .fill(null)
        .map((_, i) => ({ id: i + 1, occupied: i < 15 })),
      phone: "+91-181-5072000",
    },
    {
      id: 4,
      name: "Tagore Hospital",
      location: "Jalandhar, Punjab",
      beds: Array(120)
        .fill(null)
        .map((_, i) => ({ id: i + 1, occupied: i < 85 })),
      ventilators: Array(25)
        .fill(null)
        .map((_, i) => ({ id: i + 1, occupied: i < 18 })),
      phone: "+91-181-2224101",
    },
    {
      id: 5,
      name: "Post Graduate Institute (PGIMER)",
      location: "Chandigarh",
      beds: Array(250)
        .fill(null)
        .map((_, i) => ({ id: i + 1, occupied: i < 200 })),
      ventilators: Array(60)
        .fill(null)
        .map((_, i) => ({ id: i + 1, occupied: i < 45 })),
      phone: "+91-172-2747585",
    },
    {
      id: 6,
      name: "Government Multi Specialty Hospital",
      location: "Chandigarh",
      beds: Array(100)
        .fill(null)
        .map((_, i) => ({ id: i + 1, occupied: i < 45 })),
      ventilators: Array(20)
        .fill(null)
        .map((_, i) => ({ id: i + 1, occupied: i < 8 })),
      phone: "+91-172-2740742",
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [currentHospital, setCurrentHospital] = useState(null);
  const [currentResourceType, setCurrentResourceType] = useState(null);
  const [notification, setNotification] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [confirmationModal, setConfirmationModal] = useState({
    show: false,
    resourceIndex: null,
    resourceType: null,
    hospitalName: null,
    resourceId: null,
  });
  const bedModalRef = useRef(null);

  // Handle scroll events for bed modal to prevent propagation
  const handleBedModalWheel = (e) => {
    const container = bedModalRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const isScrollingUp = e.deltaY < 0;
    const isScrollingDown = e.deltaY > 0;
    const isAtTop = scrollTop === 0;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;

    // Prevent scroll bubbling when we can still scroll within the container
    if ((isScrollingUp && !isAtTop) || (isScrollingDown && !isAtBottom)) {
      e.stopPropagation();
    }
  };

  // Handle touch events for bed modal
  const handleBedModalTouchStart = (e) => {
    e.stopPropagation();
  };

  const handleBedModalTouchMove = (e) => {
    e.stopPropagation();
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const getStatus = (available, total) => {
    const percentage = (available / total) * 100;
    if (percentage > 30) return "available";
    if (percentage > 10) return "limited";
    return "full";
  };

  const openModal = (hospitalId, resourceType) => {
    const hospital = hospitals.find((h) => h.id === hospitalId);
    setCurrentHospital(hospital);
    setCurrentResourceType(resourceType);
    setModalOpen(true);
  };

  const handleResourceClick = (resourceIndex) => {
    if (!currentHospital || !currentResourceType) return;

    // Check if user is authenticated before allowing booking
    if (!isAuthenticated) {
      showNotification("Please login to book a bed or ventilator", "error");
      // Optionally redirect to login after a delay
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      return;
    }

    const resource = currentHospital[currentResourceType][resourceIndex];

    if (resource.occupied) {
      showNotification(
        `${currentResourceType === "beds" ? "Bed" : "Ventilator"} #${
          resource.id
        } is already occupied!`,
        "error"
      );
      return;
    }

    // Show confirmation modal
    setConfirmationModal({
      show: true,
      resourceIndex,
      resourceType: currentResourceType,
      hospitalName: currentHospital.name,
      resourceId: resource.id,
    });
  };

  const confirmBooking = () => {
    const { resourceIndex } = confirmationModal;

    const updatedHospitals = hospitals.map((h) => {
      if (h.id === currentHospital.id) {
        const resources = [...h[currentResourceType]];
        resources[resourceIndex] = {
          ...resources[resourceIndex],
          occupied: true,
        };

        showNotification(
          `${currentResourceType === "beds" ? "Bed" : "Ventilator"} #${
            resources[resourceIndex].id
          } booked successfully!`,
          "success"
        );

        return { ...h, [currentResourceType]: resources };
      }
      return h;
    });

    setHospitals(updatedHospitals);
    const updatedHospital = updatedHospitals.find(
      (h) => h.id === currentHospital.id
    );
    setCurrentHospital(updatedHospital);

    // Close confirmation modal
    setConfirmationModal({
      show: false,
      resourceIndex: null,
      resourceType: null,
      hospitalName: null,
      resourceId: null,
    });
  };

  const cancelBooking = () => {
    setConfirmationModal({
      show: false,
      resourceIndex: null,
      resourceType: null,
      hospitalName: null,
      resourceId: null,
    });
  };

  const calculateStats = () => {
    let totalAvailBeds = 0;
    let totalAvailVents = 0;
    let totalBeds = 0;
    let totalOccupied = 0;
    let criticalCount = 0;

    hospitals.forEach((h) => {
      const availBeds = h.beds.filter((b) => !b.occupied).length;
      const availVents = h.ventilators.filter((v) => !v.occupied).length;
      const occBeds = h.beds.filter((b) => b.occupied).length;

      totalAvailBeds += availBeds;
      totalAvailVents += availVents;
      totalBeds += h.beds.length;
      totalOccupied += occBeds;

      if (getStatus(availBeds, h.beds.length) === "full") {
        criticalCount++;
      }
    });

    return {
      totalAvailBeds,
      totalAvailVents,
      totalOccupancy: Math.round((totalOccupied / totalBeds) * 100),
      criticalCount,
    };
  };

  const stats = calculateStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 pt-24 p-4 md:p-6">
      <div className="max-w-7xl mx-auto mt-20">
        {/* Header */}
        <header className="text-center mb-10">
          <div className="inline-block mb-4 bg-white rounded-full px-6 py-2 shadow-md border border-orange-200">
            <span className="text-orange-600 font-semibold text-sm">
              🏥 Live Resource Tracking
            </span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-black mb-4">
            <span className="bg-gradient-to-r from-orange-600 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Hospital Resource Tracker
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-4">
            Real-time bed and ventilator availability across hospitals
          </p>
          <div className="inline-flex items-center bg-white px-6 py-3 rounded-full text-sm text-gray-700 shadow-md border border-orange-200">
            <span className="w-2.5 h-2.5 bg-red-500 rounded-full mr-2 animate-pulse"></span>
            Last Updated: {currentTime.toLocaleTimeString("en-IN")}
          </div>
        </header>

        {/* Stats Overview */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
          <div className="flex items-center mb-6">
            <span className="text-2xl mr-3">📊</span>
            <h2 className="text-2xl font-bold text-gray-800">
              Real-time Statistics
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-lg p-6 text-center hover:-translate-y-1 transition-transform border border-green-200">
              <h3 className="text-gray-600 text-sm uppercase mb-2">
                Total Available Beds
              </h3>
              <div className="text-4xl font-bold text-green-600">
                {stats.totalAvailBeds}
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-lg p-6 text-center hover:-translate-y-1 transition-transform border border-blue-200">
              <h3 className="text-gray-600 text-sm uppercase mb-2">
                Available Ventilators
              </h3>
              <div className="text-4xl font-bold text-blue-600">
                {stats.totalAvailVents}
              </div>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl shadow-lg p-6 text-center hover:-translate-y-1 transition-transform border border-orange-200">
              <h3 className="text-gray-600 text-sm uppercase mb-2">
                Total Occupancy
              </h3>
              <div className="text-4xl font-bold text-orange-600">
                {stats.totalOccupancy}%
              </div>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl shadow-lg p-6 text-center hover:-translate-y-1 transition-transform border border-red-200">
              <h3 className="text-gray-600 text-sm uppercase mb-2">
                Critical Facilities
              </h3>
              <div className="text-4xl font-bold text-red-600">
                {stats.criticalCount}
              </div>
            </div>
          </div>
        </div>

        {/* Hospitals Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {hospitals.map((hospital) => {
            const availableBeds = hospital.beds.filter(
              (b) => !b.occupied
            ).length;
            const occupiedBeds = hospital.beds.filter((b) => b.occupied).length;
            const availableVents = hospital.ventilators.filter(
              (v) => !v.occupied
            ).length;
            const occupiedVents = hospital.ventilators.filter(
              (v) => v.occupied
            ).length;
            const totalBeds = hospital.beds.length;
            const totalVents = hospital.ventilators.length;
            const bedPercentage = (occupiedBeds / totalBeds) * 100;
            const ventPercentage = (occupiedVents / totalVents) * 100;
            const status = getStatus(availableBeds, totalBeds);

            return (
              <div
                key={hospital.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border-2 border-gray-100 hover:border-orange-300 transform hover:-translate-y-1"
              >
                <div className="flex justify-between items-start mb-4 pb-4 border-b-2 border-gray-100">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 mb-1">
                      {hospital.name}
                    </h2>
                    <div className="flex items-center text-gray-600 text-sm">
                      <MapPin className="w-4 h-4 mr-1" />
                      {hospital.location}
                    </div>
                  </div>
                  <span
                    className={`px-4 py-2 rounded-full text-xs font-bold uppercase ${
                      status === "available"
                        ? "bg-green-500 text-white"
                        : status === "limited"
                        ? "bg-orange-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {status}
                  </span>
                </div>

                {/* Beds Section */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center text-gray-700 font-semibold">
                      <Bed className="w-5 h-5 mr-2" />
                      Beds
                    </div>
                    <button
                      onClick={() => openModal(hospital.id, "beds")}
                      className="bg-orange-600 text-white px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-orange-700 transition-colors"
                    >
                      View All
                    </button>
                  </div>
                  <div className="bg-gray-200 h-8 rounded-full overflow-hidden mb-2">
                    <div
                      className="bg-gradient-to-r from-green-500 to-green-600 h-full flex items-center justify-center text-white text-sm font-bold transition-all"
                      style={{ width: `${bedPercentage}%` }}
                    >
                      {occupiedBeds} / {totalBeds}
                    </div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>
                      Available: <strong>{availableBeds}</strong>
                    </span>
                    <span>
                      Occupied: <strong>{occupiedBeds}</strong>
                    </span>
                  </div>
                </div>

                {/* Ventilators Section */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center text-gray-700 font-semibold">
                      <Wind className="w-5 h-5 mr-2" />
                      Ventilators
                    </div>
                    <button
                      onClick={() => openModal(hospital.id, "ventilators")}
                      className="bg-orange-600 text-white px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-orange-700 transition-colors"
                    >
                      View All
                    </button>
                  </div>
                  <div className="bg-gray-200 h-8 rounded-full overflow-hidden mb-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-full flex items-center justify-center text-white text-sm font-bold transition-all"
                      style={{ width: `${ventPercentage}%` }}
                    >
                      {occupiedVents} / {totalVents}
                    </div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>
                      Available: <strong>{availableVents}</strong>
                    </span>
                    <span>
                      Occupied: <strong>{occupiedVents}</strong>
                    </span>
                  </div>
                </div>

                {/* Contact */}
                <div className="pt-4 border-t border-gray-100 flex items-center text-gray-600 text-sm">
                  <Phone className="w-4 h-4 mr-2" />
                  {hospital.phone}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      {modalOpen && currentHospital && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-300 flex flex-col">
            {/* Sticky Header */}
            <div className="sticky top-0 bg-white border-b-2 border-gray-100 p-6 flex justify-between items-start z-10 shadow-sm">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
                  {currentResourceType === "beds" ? (
                    <Bed className="w-6 h-6 mr-2" />
                  ) : (
                    <Wind className="w-6 h-6 mr-2" />
                  )}
                  {currentHospital.name} -{" "}
                  {currentResourceType === "beds" ? "Beds" : "Ventilators"}
                </h2>
                <div className="flex gap-4 flex-wrap">
                  <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg font-semibold flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Available:{" "}
                    {
                      currentHospital[currentResourceType].filter(
                        (r) => !r.occupied
                      ).length
                    }
                  </div>
                  <div className="bg-red-100 text-red-800 px-4 py-2 rounded-lg font-semibold flex items-center">
                    <XCircle className="w-5 h-5 mr-2" />
                    Occupied:{" "}
                    {
                      currentHospital[currentResourceType].filter(
                        (r) => r.occupied
                      ).length
                    }
                  </div>
                </div>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
              >
                <X className="w-8 h-8" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div
              ref={bedModalRef}
              className="flex-1 overflow-y-auto p-6 bed-modal-scroll"
              style={{ touchAction: "pan-y" }}
              onWheel={handleBedModalWheel}
              onTouchStart={handleBedModalTouchStart}
              onTouchMove={handleBedModalTouchMove}
            >
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
                {currentHospital[currentResourceType].map((resource, index) => (
                  <button
                    key={resource.id}
                    onClick={() => handleResourceClick(index)}
                    disabled={resource.occupied}
                    className={`aspect-square rounded-lg flex flex-col items-center justify-center font-semibold text-sm transition-all ${
                      resource.occupied
                        ? "bg-red-500 text-white cursor-not-allowed opacity-75"
                        : "bg-green-500 text-white hover:bg-green-600 hover:scale-110 hover:shadow-lg cursor-pointer"
                    }`}
                  >
                    <span className="text-2xl mb-1">
                      {currentResourceType === "beds" ? "🛏️" : "🫁"}
                    </span>
                    <span>#{resource.id}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {confirmationModal.show && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[60] p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full animate-in slide-in-from-bottom duration-300">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Confirm Booking
              </h3>
              <p className="text-gray-600">
                Are you sure you want to book this{" "}
                {confirmationModal.resourceType === "beds"
                  ? "bed"
                  : "ventilator"}
                ?
              </p>
            </div>

            <div className="p-6">
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
                <div className="flex items-center mb-2">
                  {confirmationModal.resourceType === "beds" ? (
                    <Bed className="w-5 h-5 text-orange-600 mr-2" />
                  ) : (
                    <Wind className="w-5 h-5 text-orange-600 mr-2" />
                  )}
                  <span className="font-semibold text-orange-800">
                    {confirmationModal.resourceType === "beds"
                      ? "Bed"
                      : "Ventilator"}{" "}
                    #{confirmationModal.resourceId}
                  </span>
                </div>
                <p className="text-sm text-orange-700">
                  <strong>Hospital:</strong> {confirmationModal.hospitalName}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={cancelBooking}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmBooking}
                  className="flex-1 px-4 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors"
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notification */}
      {notification && (
        <div
          className={`fixed top-4 right-4 px-6 py-4 rounded-xl shadow-2xl text-white font-semibold z-50 animate-in slide-in-from-right duration-300 ${
            notification.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {notification.message}
        </div>
      )}
    </div>
  );
};

export default HospitalTracker;
