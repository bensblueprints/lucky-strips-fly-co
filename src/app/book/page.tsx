"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { format, addDays, isBefore, isAfter, startOfDay } from "date-fns";
import {
  Calendar,
  Clock,
  Users,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Loader2,
  CreditCard,
  Shield,
  Phone,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const trips = [
  {
    id: "half-day",
    name: "Half Day Float Trip",
    duration: "4.5 Hours",
    description: "Perfect introduction to Smith River fly fishing",
    prices: { 1: 275, 2: 375 },
    includes: [
      "All fly fishing gear",
      "Snacks & beverages",
      "Expert instruction",
      "Drift boat float",
    ],
  },
  {
    id: "full-day",
    name: "Full Day Float Trip",
    duration: "7-8 Hours",
    featured: true,
    description: "Complete experience with lunch included",
    prices: { 1: 400, 2: 500 },
    includes: [
      "All fly fishing gear",
      "Full lunch & beverages",
      "Expert instruction",
      "Drift boat float",
      "Trip photos",
    ],
  },
];

type Step = 1 | 2 | 3;

export default function BookPage() {
  const [step, setStep] = useState<Step>(1);
  const [selectedTrip, setSelectedTrip] = useState<string>("full-day");
  const [partySize, setPartySize] = useState<1 | 2>(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    specialRequests: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const trip = trips.find((t) => t.id === selectedTrip)!;
  const price = trip.prices[partySize];

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startPadding = firstDay.getDay();
    const days: (Date | null)[] = [];

    // Add padding for days before the first of the month
    for (let i = 0; i < startPadding; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const isDateDisabled = (date: Date) => {
    const today = startOfDay(new Date());
    const minDate = addDays(today, 2); // Require 2 days advance booking
    const maxDate = addDays(today, 180); // Allow booking up to 6 months ahead
    return isBefore(date, minDate) || isAfter(date, maxDate);
  };

  const handleSubmit = async () => {
    if (!selectedDate) return;

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tripType: selectedTrip,
          partySize,
          tripDate: format(selectedDate, "yyyy-MM-dd"),
          customerName: formData.name,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          experienceLevel: formData.experience,
          specialRequests: formData.specialRequests,
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || "Failed to create checkout session");
      }
    } catch {
      setError("Something went wrong. Please try again or call us directly.");
    } finally {
      setIsLoading(false);
    }
  };

  const canProceed = () => {
    if (step === 1) return selectedTrip && partySize;
    if (step === 2) return selectedDate;
    if (step === 3) return formData.name && formData.email;
    return false;
  };

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-primary-900">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="/images/boat-1.jpg"
            alt="Drift boat on river"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10 container-custom text-center text-white px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="heading-1 max-w-3xl mx-auto mb-4">
              Book Your Trip
            </h1>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto">
              Reserve your Smith River fly fishing adventure in just a few steps
            </p>
          </motion.div>
        </div>
      </section>

      {/* Progress Steps */}
      <div className="bg-white border-b sticky top-16 z-40">
        <div className="container-custom py-4">
          <div className="flex items-center justify-center gap-4 md:gap-8">
            {[
              { num: 1, label: "Select Trip" },
              { num: 2, label: "Choose Date" },
              { num: 3, label: "Your Details" },
            ].map((s, idx) => (
              <div key={s.num} className="flex items-center">
                <button
                  onClick={() => s.num < step && setStep(s.num as Step)}
                  disabled={s.num > step}
                  className={cn(
                    "flex items-center gap-2 transition-colors",
                    s.num === step
                      ? "text-primary-600"
                      : s.num < step
                      ? "text-primary-500 cursor-pointer hover:text-primary-700"
                      : "text-gray-400"
                  )}
                >
                  <span
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold",
                      s.num === step
                        ? "bg-primary-600 text-white"
                        : s.num < step
                        ? "bg-primary-100 text-primary-600"
                        : "bg-gray-200 text-gray-500"
                    )}
                  >
                    {s.num < step ? <CheckCircle className="w-4 h-4" /> : s.num}
                  </span>
                  <span className="hidden sm:inline font-medium">{s.label}</span>
                </button>
                {idx < 2 && (
                  <ArrowRight className="w-4 h-4 mx-2 md:mx-4 text-gray-300" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form Area */}
            <div className="lg:col-span-2">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl p-6 md:p-8 shadow-sm"
              >
                {/* Step 1: Select Trip */}
                {step === 1 && (
                  <>
                    <h2 className="heading-3 text-gray-900 mb-6">
                      Choose Your Trip
                    </h2>
                    <div className="space-y-4 mb-8">
                      {trips.map((t) => (
                        <button
                          key={t.id}
                          onClick={() => setSelectedTrip(t.id)}
                          className={cn(
                            "w-full p-6 rounded-xl border-2 text-left transition-all",
                            selectedTrip === t.id
                              ? "border-primary-500 bg-primary-50"
                              : "border-gray-200 hover:border-gray-300"
                          )}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-gray-900">
                                  {t.name}
                                </h3>
                                {t.featured && (
                                  <span className="px-2 py-0.5 bg-primary-600 text-white text-xs rounded-full">
                                    Popular
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                                <Clock className="w-4 h-4" />
                                {t.duration}
                              </p>
                              <p className="text-sm text-gray-600 mt-2">
                                {t.description}
                              </p>
                            </div>
                            <div
                              className={cn(
                                "w-5 h-5 rounded-full border-2 flex-shrink-0",
                                selectedTrip === t.id
                                  ? "border-primary-500 bg-primary-500"
                                  : "border-gray-300"
                              )}
                            >
                              {selectedTrip === t.id && (
                                <CheckCircle className="w-4 h-4 text-white" />
                              )}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>

                    <h3 className="font-semibold text-gray-900 mb-4">
                      Party Size
                    </h3>
                    <div className="flex gap-4">
                      {[1, 2].map((size) => (
                        <button
                          key={size}
                          onClick={() => setPartySize(size as 1 | 2)}
                          className={cn(
                            "flex-1 p-4 rounded-xl border-2 transition-all",
                            partySize === size
                              ? "border-primary-500 bg-primary-50"
                              : "border-gray-200 hover:border-gray-300"
                          )}
                        >
                          <div className="flex items-center justify-center gap-2">
                            <Users className="w-5 h-5" />
                            <span className="font-medium">
                              {size} {size === 1 ? "Person" : "People"}
                            </span>
                          </div>
                          <p className="text-2xl font-bold text-center mt-2">
                            ${trip.prices[size as 1 | 2]}
                          </p>
                        </button>
                      ))}
                    </div>
                  </>
                )}

                {/* Step 2: Choose Date */}
                {step === 2 && (
                  <>
                    <h2 className="heading-3 text-gray-900 mb-6">
                      Select Your Date
                    </h2>
                    <div className="mb-4 flex items-center justify-between">
                      <button
                        onClick={() =>
                          setCurrentMonth(
                            new Date(
                              currentMonth.getFullYear(),
                              currentMonth.getMonth() - 1
                            )
                          )
                        }
                        className="p-2 hover:bg-gray-100 rounded-lg"
                      >
                        <ArrowLeft className="w-5 h-5" />
                      </button>
                      <h3 className="font-semibold text-lg">
                        {format(currentMonth, "MMMM yyyy")}
                      </h3>
                      <button
                        onClick={() =>
                          setCurrentMonth(
                            new Date(
                              currentMonth.getFullYear(),
                              currentMonth.getMonth() + 1
                            )
                          )
                        }
                        className="p-2 hover:bg-gray-100 rounded-lg"
                      >
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                        (day) => (
                          <div
                            key={day}
                            className="text-center text-sm font-medium text-gray-500 py-2"
                          >
                            {day}
                          </div>
                        )
                      )}
                    </div>

                    <div className="grid grid-cols-7 gap-1">
                      {generateCalendarDays().map((date, idx) => (
                        <div key={idx} className="aspect-square p-1">
                          {date && (
                            <button
                              onClick={() =>
                                !isDateDisabled(date) && setSelectedDate(date)
                              }
                              disabled={isDateDisabled(date)}
                              className={cn(
                                "w-full h-full rounded-lg flex items-center justify-center text-sm font-medium transition-colors",
                                isDateDisabled(date)
                                  ? "text-gray-300 cursor-not-allowed"
                                  : selectedDate &&
                                    format(date, "yyyy-MM-dd") ===
                                      format(selectedDate, "yyyy-MM-dd")
                                  ? "bg-primary-600 text-white"
                                  : "hover:bg-primary-100 text-gray-700"
                              )}
                            >
                              {date.getDate()}
                            </button>
                          )}
                        </div>
                      ))}
                    </div>

                    {selectedDate && (
                      <div className="mt-6 p-4 bg-primary-50 rounded-lg">
                        <p className="text-sm text-primary-800">
                          <Calendar className="w-4 h-4 inline mr-2" />
                          Selected:{" "}
                          <strong>
                            {format(selectedDate, "EEEE, MMMM d, yyyy")}
                          </strong>
                        </p>
                      </div>
                    )}

                    <p className="text-sm text-gray-500 mt-4">
                      * Trips must be booked at least 2 days in advance
                    </p>
                  </>
                )}

                {/* Step 3: Your Details */}
                {step === 3 && (
                  <>
                    <h2 className="heading-3 text-gray-900 mb-6">
                      Your Information
                    </h2>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            placeholder="John Smith"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({ ...formData, email: e.target.value })
                            }
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData({ ...formData, phone: e.target.value })
                            }
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            placeholder="(555) 123-4567"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Experience Level
                          </label>
                          <select
                            value={formData.experience}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                experience: e.target.value,
                              })
                            }
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          >
                            <option value="">Select level</option>
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Special Requests or Questions
                        </label>
                        <textarea
                          value={formData.specialRequests}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              specialRequests: e.target.value,
                            })
                          }
                          rows={3}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
                          placeholder="Any dietary restrictions, equipment needs, or questions..."
                        />
                      </div>
                    </div>

                    {error && (
                      <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        {error}
                      </div>
                    )}

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Shield className="w-4 h-4 text-primary-600" />
                        <span>Secure checkout powered by Stripe</span>
                      </div>
                    </div>
                  </>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t">
                  {step > 1 ? (
                    <button
                      onClick={() => setStep((step - 1) as Step)}
                      className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back
                    </button>
                  ) : (
                    <div />
                  )}

                  {step < 3 ? (
                    <button
                      onClick={() => setStep((step + 1) as Step)}
                      disabled={!canProceed()}
                      className={cn(
                        "btn-primary",
                        !canProceed() && "opacity-50 cursor-not-allowed"
                      )}
                    >
                      Continue
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      disabled={!canProceed() || isLoading}
                      className={cn(
                        "btn-primary",
                        (!canProceed() || isLoading) &&
                          "opacity-50 cursor-not-allowed"
                      )}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <CreditCard className="w-4 h-4 mr-2" />
                          Proceed to Payment
                        </>
                      )}
                    </button>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-36">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Booking Summary
                </h3>

                <div className="space-y-4 pb-4 border-b">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Trip</span>
                    <span className="font-medium">{trip.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-medium">{trip.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Party Size</span>
                    <span className="font-medium">
                      {partySize} {partySize === 1 ? "Person" : "People"}
                    </span>
                  </div>
                  {selectedDate && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date</span>
                      <span className="font-medium">
                        {format(selectedDate, "MMM d, yyyy")}
                      </span>
                    </div>
                  )}
                </div>

                <div className="py-4 border-b">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Includes:
                  </h4>
                  <ul className="space-y-1">
                    {trip.includes.map((item) => (
                      <li
                        key={item}
                        className="text-sm text-gray-600 flex items-center gap-2"
                      >
                        <CheckCircle className="w-3 h-3 text-primary-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-2xl font-bold text-primary-600">
                      ${price}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Payment due at checkout
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t">
                  <p className="text-sm text-gray-600 mb-2">Questions?</p>
                  <a
                    href="tel:+12767320517"
                    className="flex items-center gap-2 text-primary-600 font-medium hover:text-primary-700"
                  >
                    <Phone className="w-4 h-4" />
                    (276) 732-0517
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
