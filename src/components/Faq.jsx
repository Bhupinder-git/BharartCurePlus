import React, { useState } from "react";
import { Plus, Mic, Calendar, Share2, Lock, HelpCircle } from "lucide-react";
import ContactModal from "./ContactModal";

export default function Faq() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
      <div className="bg-white py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-5xl font-bold text-gray-900 mb-3">FAQs</h1>
            <p className="text-gray-600 text-lg">
              Common questions about our BHARATCURE+
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-6">
            <div className="flex flex-col items-center text-center h-full p-6">
              <div className="flex justify-center mb-6">
                <div className="p-3 bg-blue-100 rounded-full border-2 border-black">
                  <Plus className="w-11 h-11 text-blue-600" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex-shrink-0">
                How does Bharat Cure+ work?
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed flex-grow">
                We provide real-time tracking of medical resources and
                AI-powered support.
              </p>
            </div>

            <div className="flex flex-col items-center text-center h-full p-6">
              <div className="flex justify-center mb-6">
                <div className="p-3 bg-green-100 rounded-full border-2 border-black">
                  <Mic className="w-11 h-11 text-green-600" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex-shrink-0">
                Is the service free?
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed flex-grow">
                Basic services are free, with premium features available for
                advanced support.
              </p>
            </div>

            <div className="flex flex-col items-center text-center h-full p-6">
              <div className="flex justify-center mb-6">
                <div className="p-3 bg-purple-100 rounded-full border-2 border-black">
                  <Calendar className="w-11 h-11 text-purple-600" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex-shrink-0">
                How accurate is the resource tracking?
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed flex-grow">
                We update information in real-time from verified hospital and
                medical sources.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="flex flex-col items-center text-center h-full p-6">
              <div className="flex justify-center mb-6">
                <div className="p-3 bg-orange-100 rounded-full border-2 border-black">
                  <Share2 className="w-11 h-11 text-orange-600" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex-shrink-0">
                Can I access the service nationwide?
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed flex-grow">
                Currently available in major cities across India, with plans for
                nationwide expansion.
              </p>
            </div>

            <div className="flex flex-col items-center text-center h-full p-6">
              <div className="flex justify-center mb-6">
                <div className="p-3 bg-red-100 rounded-full border-2 border-black">
                  <Lock className="w-11 h-11 text-red-600" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex-shrink-0">
                How secure is my personal information?
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed flex-grow">
                We use advanced encryption and follow strict data protection
                guidelines.
              </p>
            </div>

            <div className="flex flex-col items-center text-center h-full p-6">
              <div className="flex justify-center mb-6">
                <div className="p-3 bg-indigo-100 rounded-full border-2 border-black">
                  <HelpCircle className="w-11 h-11 text-indigo-600" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex-shrink-0">
                How do I contact support?
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed flex-grow">
                Our AI chatbot and support team are available 24/7 through
                multiple channels.
              </p>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-3">
              Need more information?
            </h2>
            <p className="text-gray-600 text-xl mb-8">
              Our support team is ready to answer any additional questions you
              might have.
            </p>
            <button
              onClick={() => setIsContactOpen(true)}
              className="border-2 border-gray-900 text-gray-900 font-medium px-6 py-2 text-lg hover:bg-gray-900 hover:text-white transition-colors duration-300"
            >
              Contact us
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
