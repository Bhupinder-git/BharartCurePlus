import React, { useState } from "react";
import { Heart, Droplet, AlertCircle, List, ArrowLeft } from "lucide-react";

export default function BloodUrgentApp() {
  const [screen, setScreen] = useState("home");
  const [donors, setDonors] = useState([]);
  const [requests, setRequests] = useState([]);
  const [donorBloodGroup, setDonorBloodGroup] = useState("");
  const [requesterBloodGroup, setRequesterBloodGroup] = useState("");
  const [filterDonorBlood, setFilterDonorBlood] = useState("");
  const [filterRequestBlood, setFilterRequestBlood] = useState("");

  const [donorForm, setDonorForm] = useState({ name: "", age: "" });
  const [requestForm, setRequestForm] = useState({
    name: "",
    age: "",
    units: "",
  });

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const handleDonorSubmit = () => {
    if (!donorForm.name || !donorForm.age || !donorBloodGroup) {
      alert("Please fill all fields and select a blood group");
      return;
    }

    const donor = {
      name: donorForm.name,
      age: donorForm.age,
      bloodGroup: donorBloodGroup,
      registeredOn: new Date().toLocaleDateString(),
    };

    setDonors([...donors, donor]);
    setDonorBloodGroup("");
    setDonorForm({ name: "", age: "" });
    setScreen("home");
    setTimeout(() => alert("✓ Successfully registered as a donor!"), 300);
  };

  const handleRequestSubmit = () => {
    if (
      !requestForm.name ||
      !requestForm.age ||
      !requestForm.units ||
      !requesterBloodGroup
    ) {
      alert("Please fill all fields and select a blood group");
      return;
    }

    const request = {
      name: requestForm.name,
      age: requestForm.age,
      bloodGroup: requesterBloodGroup,
      units: requestForm.units,
      submittedOn: new Date().toLocaleDateString(),
    };

    setRequests([...requests, request]);
    setRequesterBloodGroup("");
    setRequestForm({ name: "", age: "", units: "" });
    setScreen("requestsList");
  };

  const filteredDonors = filterDonorBlood
    ? donors.filter((d) => d.bloodGroup === filterDonorBlood)
    : donors;

  const filteredRequests = filterRequestBlood
    ? requests.filter((r) => r.bloodGroup === filterRequestBlood)
    : requests;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 p-5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block mb-4 bg-white rounded-full px-6 py-2 shadow-md border border-orange-200">
            <span className="text-orange-600 font-semibold text-sm">
              🩸 Blood Donation System
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-4">
            <span className="bg-gradient-to-r from-orange-600 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Blood Urgent
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connecting Lives, One Drop at a Time
          </p>
        </div>

        {screen === "home" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <OptionCard
              icon={<Droplet className="w-20 h-20" />}
              title="I'm a Donor"
              description="Register to save lives"
              onClick={() => setScreen("donorForm")}
            />
            <OptionCard
              icon={<AlertCircle className="w-20 h-20" />}
              title="I Need Blood"
              description="Submit urgent request"
              onClick={() => setScreen("requesterForm")}
            />
            <OptionCard
              icon={<List className="w-20 h-20" />}
              title="View Donors"
              description="Find available donors"
              onClick={() => setScreen("donorsList")}
            />
            <OptionCard
              icon={<Heart className="w-20 h-20" />}
              title="View Requests"
              description="See urgent needs"
              onClick={() => setScreen("requestsList")}
            />
          </div>
        )}

        {screen === "donorForm" && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
              <div className="text-center mb-8 pb-6 border-b-4 border-red-50">
                <h2 className="text-4xl font-bold text-red-500 mb-2">
                  🩸 Donor Registration
                </h2>
                <p className="text-gray-600 text-lg">
                  Thank you for choosing to save lives!
                </p>
              </div>

              <div className="space-y-6">
                <FormGroup label="Your Name *">
                  <input
                    type="text"
                    value={donorForm.name}
                    onChange={(e) =>
                      setDonorForm({ ...donorForm, name: e.target.value })
                    }
                    placeholder="Enter your full name"
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl text-lg bg-gray-50 focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all outline-none"
                  />
                </FormGroup>

                <FormGroup label="Your Age *">
                  <input
                    type="number"
                    value={donorForm.age}
                    onChange={(e) =>
                      setDonorForm({ ...donorForm, age: e.target.value })
                    }
                    min="18"
                    max="65"
                    placeholder="Enter your age"
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl text-lg bg-gray-50 focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all outline-none"
                  />
                </FormGroup>

                <FormGroup label="Blood Group *">
                  <div className="grid grid-cols-4 gap-3">
                    {bloodGroups.map((group) => (
                      <BloodGroupButton
                        key={group}
                        group={group}
                        selected={donorBloodGroup === group}
                        onClick={() => setDonorBloodGroup(group)}
                      />
                    ))}
                  </div>
                </FormGroup>

                <div className="flex gap-4 pt-4">
                  <button
                    onClick={() => setScreen("home")}
                    className="flex-1 px-8 py-4 bg-gray-500 text-white rounded-xl font-bold text-lg hover:bg-gray-600 transition-all hover:shadow-lg"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleDonorSubmit}
                    className="flex-1 px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all hover:scale-105"
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {screen === "requesterForm" && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
              <div className="text-center mb-8 pb-6 border-b-4 border-red-50">
                <h2 className="text-4xl font-bold text-red-500 mb-2">
                  🚨 Blood Request
                </h2>
                <p className="text-gray-600 text-lg">
                  We'll help you find a donor immediately
                </p>
              </div>

              <div className="space-y-6">
                <FormGroup label="Patient Name *">
                  <input
                    type="text"
                    value={requestForm.name}
                    onChange={(e) =>
                      setRequestForm({ ...requestForm, name: e.target.value })
                    }
                    placeholder="Enter patient's name"
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl text-lg bg-gray-50 focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all outline-none"
                  />
                </FormGroup>

                <FormGroup label="Patient Age *">
                  <input
                    type="number"
                    value={requestForm.age}
                    onChange={(e) =>
                      setRequestForm({ ...requestForm, age: e.target.value })
                    }
                    min="1"
                    max="120"
                    placeholder="Enter patient's age"
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl text-lg bg-gray-50 focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all outline-none"
                  />
                </FormGroup>

                <FormGroup label="Blood Group Needed *">
                  <div className="grid grid-cols-4 gap-3">
                    {bloodGroups.map((group) => (
                      <BloodGroupButton
                        key={group}
                        group={group}
                        selected={requesterBloodGroup === group}
                        onClick={() => setRequesterBloodGroup(group)}
                      />
                    ))}
                  </div>
                </FormGroup>

                <FormGroup label="Units Required (ml) *">
                  <input
                    type="number"
                    value={requestForm.units}
                    onChange={(e) =>
                      setRequestForm({ ...requestForm, units: e.target.value })
                    }
                    min="100"
                    step="50"
                    placeholder="e.g., 350, 450, 500 ml"
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl text-lg bg-gray-50 focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all outline-none"
                  />
                </FormGroup>

                <div className="flex gap-4 pt-4">
                  <button
                    onClick={() => setScreen("home")}
                    className="flex-1 px-8 py-4 bg-gray-500 text-white rounded-xl font-bold text-lg hover:bg-gray-600 transition-all hover:shadow-lg"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleRequestSubmit}
                    className="flex-1 px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all hover:scale-105"
                  >
                    Submit Request
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {screen === "donorsList" && (
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-gray-800 mb-2">
                📋 Available Donors
              </h2>
              <p className="text-xl text-gray-600">Find the perfect match</p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
              <select
                value={filterDonorBlood}
                onChange={(e) => setFilterDonorBlood(e.target.value)}
                className="w-full md:w-64 px-5 py-3 border-2 border-gray-200 rounded-xl text-lg cursor-pointer focus:border-red-500 focus:ring-4 focus:ring-red-100 outline-none"
              >
                <option value="">All Blood Groups</option>
                {bloodGroups.map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {filteredDonors.length === 0 ? (
                <div className="col-span-full text-center py-20">
                  <div className="text-8xl mb-4">🩸</div>
                  <p className="text-2xl text-gray-600">
                    No donors registered yet. Be the first!
                  </p>
                </div>
              ) : (
                filteredDonors.map((donor, index) => (
                  <InfoCard key={index} bloodGroup={donor.bloodGroup}>
                    <InfoRow label="Name:" value={donor.name} />
                    <InfoRow label="Age:" value={`${donor.age} years`} />
                    <InfoRow label="Registered:" value={donor.registeredOn} />
                  </InfoCard>
                ))
              )}
            </div>

            <button
              onClick={() => setScreen("home")}
              className="block mx-auto px-10 py-4 bg-orange-600 text-white rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all hover:scale-105 hover:bg-orange-700"
            >
              <ArrowLeft className="inline mr-2" size={20} />
              Back to Home
            </button>
          </div>
        )}

        {screen === "requestsList" && (
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-gray-800 mb-2">
                🚨 Urgent Requests
              </h2>
              <p className="text-xl text-gray-600">Help save a life today</p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
              <select
                value={filterRequestBlood}
                onChange={(e) => setFilterRequestBlood(e.target.value)}
                className="w-full md:w-64 px-5 py-3 border-2 border-gray-200 rounded-xl text-lg cursor-pointer focus:border-red-500 focus:ring-4 focus:ring-red-100 outline-none"
              >
                <option value="">All Blood Groups</option>
                {bloodGroups.map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {filteredRequests.length === 0 ? (
                <div className="col-span-full text-center py-20">
                  <div className="text-8xl mb-4">🚨</div>
                  <p className="text-2xl text-gray-600">
                    No urgent requests at the moment.
                  </p>
                </div>
              ) : (
                filteredRequests.map((request, index) => (
                  <InfoCard key={index} bloodGroup={request.bloodGroup}>
                    <InfoRow label="Patient:" value={request.name} />
                    <InfoRow label="Age:" value={`${request.age} years`} />
                    <InfoRow
                      label="Units Needed:"
                      value={`${request.units} ml`}
                    />
                    <InfoRow label="Submitted:" value={request.submittedOn} />
                  </InfoCard>
                ))
              )}
            </div>

            <button
              onClick={() => setScreen("home")}
              className="block mx-auto px-10 py-4 bg-orange-600 text-white rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all hover:scale-105 hover:bg-orange-700"
            >
              <ArrowLeft className="inline mr-2" size={20} />
              Back to Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function OptionCard({ icon, title, description, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-3xl p-12 text-center cursor-pointer transition-all hover:scale-105 hover:shadow-2xl shadow-xl group relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-red-100 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative">
        <div className="text-red-500 mb-5 flex justify-center group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-3">{title}</h2>
        <p className="text-gray-600 text-lg">{description}</p>
      </div>
    </div>
  );
}

function FormGroup({ label, children }) {
  return (
    <div>
      <label className="block mb-3 text-gray-700 font-semibold text-lg">
        {label}
      </label>
      {children}
    </div>
  );
}

function BloodGroupButton({ group, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`py-4 rounded-xl text-xl font-bold transition-all ${
        selected
          ? "bg-gradient-to-br from-red-500 to-red-600 text-white shadow-lg scale-105"
          : "bg-white border-2 border-gray-200 text-gray-700 hover:border-red-500 hover:scale-105"
      }`}
    >
      {group}
    </button>
  );
}

function InfoCard({ bloodGroup, children }) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all hover:scale-105">
      <div className="inline-block bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-full text-2xl font-bold mb-6 shadow-md">
        {bloodGroup}
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex py-3 border-b border-gray-100 last:border-0">
      <span className="font-semibold text-gray-700 min-w-[120px]">{label}</span>
      <span className="text-gray-600 flex-1">{value}</span>
    </div>
  );
}
